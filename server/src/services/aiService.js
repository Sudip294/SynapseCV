import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Working model name — updated to gemini-3.8-flash
const GEMINI_MODEL = 'gemini-3.8-flash';

// System instruction prompt to enforce zero hallucination
const SYSTEM_INSTRUCTION = `You are SynapseCV's elite AI Resume Optimizer. 
Rules you MUST strictly follow:
1. NEVER fabricate user qualifications, work history, companies, dates, education, or achievements not explicitly supplied by the user.
2. Focus on refining phrasing, applying strong action verbs, inserting relevant industry keywords, and quantifying impact using ONLY the facts provided.
3. Output MUST be valid, parseable JSON matching the requested structure. Do not include markdown ticks or additional commentary outside JSON.`;

/**
 * Enhance Executive Summary using Gemini AI
 */
export const enhanceSummaryAI = async (summary, targetRole) => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `${SYSTEM_INSTRUCTION}

Task: Enhance this resume executive summary for a target role of "${targetRole || 'Software Professional'}".
Original Summary: "${summary}"

Return JSON format:
{
  "enhancedSummary": "improved summary here"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Summary Enhancement Error:', error.message);
    throw new Error('AI summary enhancement failed: ' + error.message);
  }
};

/**
 * Enhance Work Experience Bullets using Gemini AI
 */
export const enhanceBulletAI = async (bulletText, position, targetRole) => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `${SYSTEM_INSTRUCTION}

Task: Transform the following raw work experience text into high-impact, ATS-optimized action bullets for a "${position || targetRole}" position. Do not fabricate fake metrics; rephrase existing bullet points using strong action verbs (e.g. Architected, Engineered, Spearheaded).

Raw Input:
"${bulletText}"

Return JSON format:
{
  "enhancedBullet": "bullet points separated by newlines"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Bullet Enhancement Error:', error.message);
    throw new Error('AI bullet enhancement failed: ' + error.message);
  }
};

/**
 * Suggest Relevant Skills based on Target Role & Current Stack
 */
export const suggestSkillsAI = async (targetRole, existingSkills = []) => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `${SYSTEM_INSTRUCTION}

Task: Suggest 8-10 high-value technical and domain skills for a candidate targeting the role "${targetRole || 'Software Engineer'}".
Excluding these already listed skills: ${JSON.stringify(existingSkills)}.

Return JSON format:
{
  "suggestedSkills": ["Skill 1", "Skill 2", "Skill 3"]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Skill Suggestion Error:', error.message);
    throw new Error('AI skill suggestion failed: ' + error.message);
  }
};

/**
 * Generate Draft Resume structure from role parameters
 */
export const generateDraftAI = async (targetRole, experienceLevel = 'Mid-Senior') => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `${SYSTEM_INSTRUCTION}

Task: Generate a starter summary and skill categories template for a "${experienceLevel}" level candidate seeking a "${targetRole}" role.

Return JSON format:
{
  "title": "${targetRole} Resume",
  "targetRole": "${targetRole}",
  "summary": "professional summary paragraph",
  "skills": [
    { "category": "Core Engineering", "items": ["Skill1", "Skill2"] }
  ]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Draft Generation Error:', error.message);
    throw new Error('AI draft generation failed: ' + error.message);
  }
};

/**
 * Comprehensive Resume ATS Analysis using Gemini AI
 * Accepts structured resumeData (from DB) or raw text extracted from PDF/DOCX
 */
export const analyzeResumeAI = async (resumeData, jobDescription = '') => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    // Convert structured resume object to readable text if needed
    const resumeText = typeof resumeData === 'string'
      ? resumeData
      : buildResumeText(resumeData);

    const prompt = `${SYSTEM_INSTRUCTION}

Task: Perform an in-depth ATS Resume Evaluation and keyword match analysis.

Resume Content:
${resumeText}

Target Job Description (Optional):
"${jobDescription || 'General Software Engineering / Tech Role'}"

Analyze the resume thoroughly and return JSON format strictly (no markdown fences):
{
  "atsScore": 88,
  "matchPercentage": 82,
  "headline": "Short evaluation title",
  "detectedKeywords": ["Keyword1", "Keyword2"],
  "missingKeywords": ["Missing1", "Missing2"],
  "sectionAnalysis": {
    "summary": { "score": 90, "feedback": "feedback string" },
    "experience": { "score": 85, "feedback": "feedback string" },
    "skills": { "score": 92, "feedback": "feedback string" },
    "education": { "score": 88, "feedback": "feedback string" }
  },
  "issues": [
    { "severity": "high", "category": "Category", "description": "Issue description", "fix": "Recommended fix" }
  ],
  "actionableSuggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "disclaimer": "SynapseCV ATS score is an AI-based assessment designed for guidance and does not guarantee passing any specific employer's automated ATS filter."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Gemini Resume Analysis Error:', error.message);
    throw new Error('AI resume analysis failed: ' + error.message);
  }
};

/**
 * Convert structured resume DB object to readable text for Gemini
 */
function buildResumeText(resumeData) {
  if (!resumeData || typeof resumeData !== 'object') return String(resumeData);

  const lines = [];

  const p = resumeData.personalInfo || {};
  if (p.fullName) lines.push(`Name: ${p.fullName}`);
  if (p.email) lines.push(`Email: ${p.email}`);
  if (p.phone) lines.push(`Phone: ${p.phone}`);
  if (p.location) lines.push(`Location: ${p.location}`);
  if (p.title) lines.push(`Title: ${p.title}`);
  if (p.linkedin) lines.push(`LinkedIn: ${p.linkedin}`);
  if (p.github) lines.push(`GitHub: ${p.github}`);
  if (p.website) lines.push(`Website: ${p.website}`);

  if (resumeData.summary) {
    lines.push('\nPROFESSIONAL SUMMARY');
    lines.push(resumeData.summary);
  }

  if (resumeData.experience?.length > 0) {
    lines.push('\nWORK EXPERIENCE');
    resumeData.experience.forEach((exp) => {
      lines.push(`${exp.position || ''} at ${exp.company || ''} (${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''})`);
      if (exp.location) lines.push(`  Location: ${exp.location}`);
      if (exp.description) lines.push(`  ${exp.description}`);
    });
  }

  if (resumeData.education?.length > 0) {
    lines.push('\nEDUCATION');
    resumeData.education.forEach((edu) => {
      lines.push(`${edu.degree || ''} in ${edu.fieldOfStudy || ''} - ${edu.institution || ''} (${edu.startDate || ''} - ${edu.endDate || ''})`);
      if (edu.gpa) lines.push(`  GPA: ${edu.gpa}`);
    });
  }

  if (resumeData.skills?.length > 0) {
    lines.push('\nSKILLS');
    resumeData.skills.forEach((cat) => {
      lines.push(`${cat.category || 'Skills'}: ${(cat.items || []).join(', ')}`);
    });
  }

  if (resumeData.projects?.length > 0) {
    lines.push('\nPROJECTS');
    resumeData.projects.forEach((proj) => {
      lines.push(`${proj.title || ''}: ${proj.description || ''}`);
      if (proj.technologies?.length) lines.push(`  Tech: ${proj.technologies.join(', ')}`);
    });
  }

  if (resumeData.certifications?.length > 0) {
    lines.push('\nCERTIFICATIONS');
    resumeData.certifications.forEach((cert) => {
      lines.push(`${cert.name || ''} by ${cert.issuer || ''} (${cert.issueDate || ''})`);
    });
  }

  if (resumeData.languages?.length > 0) {
    lines.push('\nLANGUAGES');
    resumeData.languages.forEach((lang) => {
      lines.push(`${lang.language || ''}: ${lang.proficiency || ''}`);
    });
  }

  return lines.join('\n');
}
