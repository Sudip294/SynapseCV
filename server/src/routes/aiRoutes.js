import express from 'express';
import {
  enhanceSummary,
  enhanceBullet,
  suggestSkills,
  generateDraft,
  analyzeResume,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all AI endpoints

router.post('/enhance-summary', enhanceSummary);
router.post('/enhance-bullet', enhanceBullet);
router.post('/suggest-skills', suggestSkills);
router.post('/generate-draft', generateDraft);
router.post('/analyze-resume', analyzeResume);

export default router;
