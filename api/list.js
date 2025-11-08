import { kv } from '@vercel/kv';

export default async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: '仅支持GET' });

  try {
    const keys = await kv.keys('fb_*');
    const feedbacks = await Promise.all(
      keys.map(k => kv.get(k).then(d => JSON.parse(d)))
    );
    feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};