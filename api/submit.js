import { kv } from '@vercel/kv';

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: '仅支持POST' });

  try {
    const { title, type, content, labels, attachment, contact } = req.body;
    const id = `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    
    await kv.set(id, JSON.stringify({
      id, title, type, content, labels, attachment, contact,
      status: '待处理',
      createdAt: new Date().toLocaleString()
    }));

    res.status(200).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};