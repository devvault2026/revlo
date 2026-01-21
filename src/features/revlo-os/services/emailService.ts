
export interface EmailPayload {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';
const API_KEY = import.meta.env.VITE_SENDGRID_API_KEY || '';
const SENDER_EMAIL = import.meta.env.VITE_SENDGRID_SENDER_EMAIL || 'admin@revlo.agency';

/**
 * SendGrid Web API Integration
 * Note: Browser-side calls to SendGrid API will typically result in CORS errors 
 * unless a proxy is used. In a production environment, this should be handled 
 * by a backend relay.
 */
export const sendEmail = async (payload: EmailPayload): Promise<{ success: boolean; error?: string }> => {
    if (!API_KEY) {
        console.warn('SendGrid API Key missing. Skipping transmission.');
        return { success: false, error: 'API Key missing' };
    }

    const body = {
        personalizations: [
            {
                to: [{ email: payload.to }],
                subject: payload.subject,
            },
        ],
        from: { email: SENDER_EMAIL, name: 'Revlo OS' },
        content: [
            {
                type: 'text/plain',
                value: payload.text || '',
            },
            {
                type: 'text/html',
                value: payload.html || payload.text || '',
            },
        ],
    };

    try {
        const response = await fetch(SENDGRID_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const errorData = await response.json();
            console.error('SendGrid Error:', errorData);
            return { success: false, error: errorData.message || 'Transmission failed' };
        }
    } catch (error) {
        console.error('Network Error:', error);
        return { success: false, error: 'Network communication failure' };
    }
};
