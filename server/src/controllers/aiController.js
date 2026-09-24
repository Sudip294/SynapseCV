import {
  enhanceSummaryAI,
  enhanceBulletAI,
  suggestSkillsAI,
  generateDraftAI,
  analyzeResumeAI,
} from '../services/aiService.js';

// @desc    Enhance resume executive summary using Gemini AI
// @route   POST /api/ai/enhance-summary
// @access  Private
export const enhanceSummary = async (req, res, next) => {
  try {
    const { summary, targetRole } = req.body;
    const result = await enhanceSummaryAI(summary, targetRole);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enhance experience bullet point text using Gemini AI
// @route   POST /api/ai/enhance-bullet
// @access  Private
export const enhanceBullet = async (req, res, next) => {
  try {
    const { bulletText, position, targetRole } = req.body;
    const result = await enhanceBulletAI(bulletText, position, targetRole);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Suggest technical and soft skills for a target role using Gemini AI
// @route   POST /api/ai/suggest-skills
// @access  Private
export const suggestSkills = async (req, res, next) => {
  try {
    const { targetRole, existingSkills } = req.body;
    const result = await suggestSkillsAI(targetRole, existingSkills);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate a structured resume starter draft using Gemini AI
// @route   POST /api/ai/generate-draft
// @access  Private
export const generateDraft = async (req, res, next) => {
  try {
    const { targetRole, experienceLevel } = req.body;
    const result = await generateDraftAI(targetRole, experienceLevel);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze resume content & optional job description using Gemini AI
// @route   POST /api/ai/analyze-resume
// @access  Private
export const analyzeResume = async (req, res, next) => {
  try {
    const { resumeData, jobDescription } = req.body;
    if (!resumeData) {
      return res.status(400).json({ success: false, message: 'Please provide resume data for analysis' });
    }
    const result = await analyzeResumeAI(resumeData, jobDescription);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
