import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import {
  enhanceSummaryAI,
  enhanceBulletAI,
  suggestSkillsAI,
  generateDraftAI,
  analyzeResumeAI,
} from '../services/aiService.js';

// @desc    Enhance resume executive summary using Llama-3 AI
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

// @desc    Enhance experience bullet point text using Llama-3 AI
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

// @desc    Suggest technical and soft skills for a target role using Llama-3 AI
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

// @desc    Generate a structured resume starter draft using Llama-3 AI
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

// @desc    Analyze resume content & optional job description using Llama-3 AI (structured DB data)
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

// @desc    Analyze uploaded resume file (PDF or DOCX) with optional job description
// @route   POST /api/ai/analyze-resume-file
// @access  Private
export const analyzeResumeFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded. Please upload a PDF or DOCX file.' });
    }

    const { jobDescription } = req.body;
    const fileBuffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    const originalName = req.file.originalname || '';

    let extractedText = '';

    // Extract text based on file type
    if (mimetype === 'application/pdf' || originalName.toLowerCase().endsWith('.pdf')) {
      try {
        const parser = new PDFParse(new Uint8Array(fileBuffer));
        const pdfData = await parser.getText();
        extractedText = pdfData.text || '';
      } catch (pdfError) {
        return res.status(422).json({ success: false, message: 'Failed to parse PDF file. Ensure it is not password-protected.' });
      }
    } else if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword' ||
      originalName.toLowerCase().endsWith('.docx') ||
      originalName.toLowerCase().endsWith('.doc')
    ) {
      try {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        extractedText = result.value || '';
      } catch (docError) {
        return res.status(422).json({ success: false, message: 'Failed to parse DOCX file. Ensure it is a valid Word document.' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported file type. Please upload a PDF or DOCX file.' });
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(422).json({ success: false, message: 'Could not extract sufficient text from the file. Try a different format.' });
    }

    const result = await analyzeResumeAI(extractedText, jobDescription || '');
    res.json({
      success: true,
      data: result,
      extractedTextPreview: extractedText.substring(0, 200) + '...',
    });
  } catch (error) {
    next(error);
  }
};
