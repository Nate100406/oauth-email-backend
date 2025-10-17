import { Router } from 'express';
import EmailJob from '../models/EmailJob.js';

const router = Router();

router.get('/jobs/:userId', async (req, res) => {
  const { userId } = req.params;
  const { limit = 50 } = req.query;
  const jobs = await EmailJob.find({ userId }).sort({ createdAt: -1 }).limit(Number(limit));
  res.json({ ok: true, jobs });
});

export default router;
