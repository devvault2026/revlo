import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model, messages, temperature, max_tokens, stream } = req.body;
  const apiKey = process.env.VITE_DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('Missing VITE_DEEPSEEK_API_KEY');
    return res.status(500).json({ error: 'Deepseek API key not configured' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages,
        temperature: temperature || 0.3,
        max_tokens: max_tokens || 4096,
        stream: stream || false,
      }),
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error('Deepseek API error:', response.status, errData);
      return res.status(response.status).json({ 
        error: `Deepseek API error: ${response.status}`,
        details: errData 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Deepseek proxy error:', error);
    return res.status(500).json({ 
      error: 'Deepseek request failed',
      message: error.message 
    });
  }
}
