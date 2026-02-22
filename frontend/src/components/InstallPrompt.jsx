import React, { useState, useEffect } from 'react';
import './InstallPrompt.css';

/**
 * Shows a native "Add to Home Screen" banner when the browser
 * fires the `beforeinstallprompt` event (Chrome / Edge / Android).
 * On iOS Safari it shows a manual instruction instead.
 */
const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS (no beforeinstallprompt, manual share needed)
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
        const standalone = window.matchMedia('(display-mode: standalone)').matches;

        if (ios && !standalone) {
            setIsIOS(true);
            const dismissed = sessionStorage.getItem('pwa-ios-dismissed');
            if (!dismissed) setShowBanner(true);
        }

        // Chrome/Edge: listen for the deferred install prompt
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            const dismissed = sessionStorage.getItem('pwa-dismissed');
            if (!dismissed) setShowBanner(true);
        };
        window.addEventListener('beforeinstallprompt', handler);

        // Hide if already installed
        window.addEventListener('appinstalled', () => setShowBanner(false));

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') setShowBanner(false);
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowBanner(false);
        sessionStorage.setItem(isIOS ? 'pwa-ios-dismissed' : 'pwa-dismissed', 'true');
    };

    if (!showBanner) return null;

    return (
        <div className="install-banner" role="alert">
            <div className="install-banner-icon">
                <img src="/pwa-512.png" alt="Scoutrix" />
            </div>
            <div className="install-banner-text">
                <strong>Install Scoutrix</strong>
                {isIOS ? (
                    <span>Tap <b>Share</b> then <b>Add to Home Screen</b></span>
                ) : (
                    <span>Add to your home screen for the full app experience</span>
                )}
            </div>
            <div className="install-banner-actions">
                {!isIOS && (
                    <button className="install-btn" onClick={handleInstall}>Install</button>
                )}
                <button className="install-dismiss" onClick={handleDismiss} aria-label="Dismiss">✕</button>
            </div>
        </div>
    );
};

export default InstallPrompt;
