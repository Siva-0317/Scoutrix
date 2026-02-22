const SARVAM_API_URL = 'https://api.sarvam.ai/translate';

/**
 * Proxy controller for the Sarvam Translate API.
 * The browser cannot call Sarvam directly due to CORS, so we relay
 * the request through our own Express server.
 */
exports.translate = async (req, res) => {
    const { input, source_language_code = 'en-IN', target_language_code } = req.body;

    if (!input || !target_language_code) {
        return res.status(400).json({ error: 'input and target_language_code are required' });
    }

    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
        console.error('[Translate] SARVAM_API_KEY is not set in backend .env');
        return res.status(500).json({ error: 'Translation service not configured' });
    }

    try {
        const response = await fetch(SARVAM_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-subscription-key': apiKey
            },
            body: JSON.stringify({
                input,
                source_language_code,
                target_language_code,
                speaker_gender: 'Male',
                mode: 'formal',
                model: 'mayura:v1'  // mayura is the standard text translation model
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[Translate] Sarvam API error:', data);
            return res.status(response.status).json({ error: data });
        }

        return res.json({ translated_text: data.translated_text });
    } catch (error) {
        console.error('[Translate] Fetch error:', error.message);
        return res.status(500).json({ error: 'Failed to reach Sarvam API' });
    }
};
