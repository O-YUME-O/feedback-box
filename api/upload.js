import { put } from '@vercel/blob';

export default async (req, res) => {
  if '@req.body) return res.status(400).json({ error: '无文件' });

  try {
    const blob = await put(`feedback-attachments/${Date.now()}-${req.headers['x-vercel-filename']}`, req.body, {
      access: 'public'
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};