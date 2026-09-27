import express from 'express';
import multer from 'multer';
import {
  enhanceSummary,
  enhanceBullet,
  suggestSkills,
  generateDraft,
  analyzeResume,
  analyzeResumeFile,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const router = express.Router();

router.use(protect); // Protect all AI endpoints

router.post('/enhance-summary', enhanceSummary);
router.post('/enhance-bullet', enhanceBullet);
router.post('/suggest-skills', suggestSkills);
router.post('/generate-draft', generateDraft);
router.post('/analyze-resume', analyzeResume);
router.post('/analyze-resume-file', upload.single('resume'), analyzeResumeFile);

export default router;
