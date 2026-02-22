import { useEffect, useRef } from 'react';
import { translateText } from '../utils/sarvamApi';

// In-memory cache to prevent re-calling the API for the same string
const translationCache = {};

/** Process an array in sequential chunks of `size` */
async function processInBatches(arr, size, fn) {
    for (let i = 0; i < arr.length; i += size) {
        await Promise.allSettled(arr.slice(i, i + size).map(fn));
    }
}

/** Collect all translatable text nodes from the document body */
function collectTextNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        const text = node.nodeValue?.trim() ?? '';
        if (
            text.length > 2 &&
            // skip pure numbers / symbols / whitespace
            !/^[\d\s\W_]+$/.test(text) &&
            node.parentNode &&
            !['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(node.parentNode.nodeName) &&
            !node._sarvamTranslated
        ) {
            nodes.push(node);
        }
    }
    return nodes;
}

export const useAutoTranslate = (targetLanguage) => {
    const observerRef = useRef(null);
    const isTranslatingRef = useRef(false);

    useEffect(() => {
        // Reload to restore originals when switching back to English
        if (!targetLanguage || targetLanguage === 'en-IN') {
            if (document.body.getAttribute('data-translated') === 'true') {
                window.location.reload();
            }
            return;
        }

        const translatePage = async () => {
            if (isTranslatingRef.current) return;
            isTranslatingRef.current = true;
            document.body.setAttribute('data-translating', 'true');

            const nodes = collectTextNodes();
            if (nodes.length === 0) {
                isTranslatingRef.current = false;
                document.body.removeAttribute('data-translating');
                return;
            }

            document.body.setAttribute('data-translated', 'true');

            // Process 5 nodes at a time to avoid rate-limiting the API
            await processInBatches(nodes, 5, async (node) => {
                const original = node.nodeValue?.trim();
                if (!original) return;

                const cacheKey = `${targetLanguage}::${original}`;
                try {
                    let translated;
                    if (translationCache[cacheKey]) {
                        translated = translationCache[cacheKey];
                    } else {
                        translated = await translateText(original, targetLanguage);
                        if (translated && translated !== original) {
                            translationCache[cacheKey] = translated;
                        }
                    }
                    if (translated && translated !== original) {
                        node.nodeValue = node.nodeValue.replace(original, translated);
                    }
                } catch (_) {
                    // ignore – keep original text
                } finally {
                    node._sarvamTranslated = true;
                }
            });

            isTranslatingRef.current = false;
            document.body.removeAttribute('data-translating');
        };

        // Initial translation pass
        translatePage();

        // Watch for new DOM content (React route changes, modal opens, etc.)
        observerRef.current = new MutationObserver((mutations) => {
            const hasNew = mutations.some(
                (m) => m.type === 'childList' && m.addedNodes.length > 0
            );
            if (hasNew && !isTranslatingRef.current) {
                observerRef.current?.disconnect();
                translatePage().finally(() => {
                    observerRef.current?.observe(document.body, { childList: true, subtree: true });
                });
            }
        });

        observerRef.current.observe(document.body, { childList: true, subtree: true });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [targetLanguage]);
};
