import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, count } = req.query;
  const apiKey = process.env.VITE_BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    console.error('Missing VITE_BRAVE_SEARCH_API_KEY');
    return res.status(500).json({ error: 'Brave Search API key not configured' });
  }

  if (!q) {
    return res.status(400).json({ error: 'Missing search query parameter' });
  }

  try {
    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q as string)}&count=${count || 10}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errData = await response.text();
      console.error('Brave Search API error:', response.status, errData);
      return res.status(response.status).json({ 
        error: `Brave Search API error: ${response.status}`,
        details: errData 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Brave Search proxy error:', error);
    return res.status(500).json({ 
      error: 'Brave Search request failed',
      message: error.message 
    });
  }
}
