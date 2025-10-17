import { Router } from 'express';
import User from '../models/User.js';
import EmailJob from '../models/EmailJob.js';
import { scheduleEmailForUser } from '../queue/index.js';

const router = Router();

router.post('/send-email', async (req, res) => {
  try {
    const { userId, to, subject, body } = req.body || {};
    if (!userId || !to || !subject || !body) return res.status(400).json({ error: 'missing_fields' });

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'user_not_found' });

    const jobDoc = await EmailJob.create({ userId, to, subject, body, status: 'queued' });
    await scheduleEmailForUser(user, jobDoc);
    res.json({ ok: true, jobId: jobDoc._id.toString(), scheduledAt: jobDoc.scheduledAt });
  } catch (e) {
    res.status(500).json({ error: 'enqueue_failed', detail: e?.message || String(e) });
  }
});

export default router;
