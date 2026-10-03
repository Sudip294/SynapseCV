// ============================================================================
// SynapseCV AI Engine powered by GROQ (GPT-OSS 20B via Groq)
// 100% Free, Extremely Fast, High Rate Limits
// Model: openai/gpt-oss-20b (reasoning model - handles thinking internally)
// ============================================================================

// You MUST add GROQ_API_KEY to your server/.env file
// Get it for free at: https://console.groq.com/keys

const GROQ_MODEL = 'openai/gpt-oss-120b';

// NOTE: gpt-oss-120b is a larger model that uses far fewer reasoning tokens for standard tasks.
// We still maintain a reasoning budget, but it won't crash randomly like gpt-oss-20b.
// Rule of thumb: reasoning_budget = 300 tokens, output = requested tokens → set max_tokens = 300 + output_tokens

const SYSTEM_INSTRUCTION = `You are SynapseCV, an elite professional resume consultant and ATS optimization expert.
CRITICAL RULES:
1. NEVER fabricate qualifications, companies, dates, achievements, or numbers not provided by the user.
2. Base ALL suggestions on the actual content provided — the user's specific role, industry, and seniority.
3. Tailor EVERY response precisely to the role/position stated.
   - Graphic Designer → Adobe Illustrator, Photoshop, Typography, Branding — NOT Node.js
   - Data Scientist → Python, ML, Statistics — NOT UX Design
   - Software Engineer → Programming languages, frameworks — NOT design tools
4. Output MUST be a valid, parseable JSON object only. Do NOT include markdown code fences, bullet symbols (•), or any commentary outside the JSON.`;

/**
 * Safely parse JSON from LLM output, handling markdown codeblocks or extra text.
 */
function extractJSON(text) {
  if (!text || text.trim() === '') {
    throw new Error('AI returned an empty response. Please try again.');
  }
  
  // Remove markdown fences
  let cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  
  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to extract JSON object from the text
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch (err) { }
    }
    console.error('❌ [JSON Parse Error]: AI response was not valid JSON:\n', text.substring(0, 300));
    throw new Error('AI output could not be parsed. Please try again.');
  }
}

/**
 * Call Groq API via standard HTTP fetch (OpenAI compatible endpoint)
 * @param {string} prompt - The user prompt
 * @param {number} outputTokens - Expected output tokens needed (reasoning budget added automatically)
 */
async function callGroqAI(prompt, outputTokens = 500) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('❌ [AI Service Error]: GROQ_API_KEY is missing from environment variables.');
    throw new Error('Groq API key not configured. Please set GROQ_API_KEY in server/.env file.');
  }

  // gpt-oss-20b is a reasoning model: it uses tokens for "thinking" before outputting.
  // We add an 800-token reasoning buffer ON TOP of the output we need.
  // Without this, the model exhausts the token limit thinking and returns empty content.
  const reasoningBuffer = 800;
  const totalMaxTokens = outputTokens + reasoningBuffer;

  console.log(`🤖 [Groq AI] Calling model: ${GROQ_MODEL} | output: ${outputTokens} | total_budget: ${totalMaxTokens}`);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: prompt }
        ],
        temperature: 0.35,
        max_tokens: totalMaxTokens
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const errMsg = data.error?.message || 'Failed to fetch from Groq API';
      console.error('❌ [Groq API Error]:', errMsg);
      throw new Error(errMsg);
    }

    const content = data.choices[0]?.message?.content;
    const reasoningTokens = data.usage?.completion_tokens_details?.reasoning_tokens || 0;
    const outputActual = (data.usage?.completion_tokens || 0) - reasoningTokens;
    
    console.log(`✅ [Groq AI] Total: ${data.usage?.total_tokens} | Reasoning: ${reasoningTokens} | Output: ${outputActual}`);
    
    if (!content || content.trim() === '') {
      console.error('❌ [Groq AI] Content is empty! Reasoning used all tokens. Need higher max_tokens.');
      throw new Error('AI ran out of tokens while thinking. Please try again with a slightly shorter input.');
    }
    
    return extractJSON(content);

  } catch (err) {
    if (err.message.includes('fetch')) {
      console.error('❌ [Network Error]:', err.message);
      throw new Error('Could not reach Groq AI service. Check your internet connection.');
    }
    console.error('❌ [Groq Error]:', err.message);
    throw err;
  }
}

/**
 * Enhance Executive Summary using Groq AI
 * Analyses the user's actual summary and improves it for the given role
 */
export const enhanceSummaryAI = async (summary, targetRole) => {
  if (!summary || summary.trim().length < 10) {
    throw new Error('Please write at least a brief summary before using AI enhancement.');
  }

  const role = targetRole?.trim() || 'Professional';

  const prompt = `You are rewriting a resume professional summary for a "${role}" candidate.

Original draft: "${summary}"

Write a NEW, complete, polished summary (2-3 sentences) that:
- Opens with the candidate's specialty/experience specific to "${role}" — DO NOT start with generic phrases like "Results-driven", "Dynamic", "Passionate", or "Proven"
- Includes specific skills, tools, or domains relevant to a "${role}"
- Maintains ONLY the factual content from the original draft
- Is written in first person, professional tone
- Reads as a complete, standalone paragraph

Return valid JSON only:
{"enhancedSummary": "complete new summary paragraph here"}`;

  // Summary output ~150 tokens + 800 reasoning buffer = 1000 total
  return await callGroqAI(prompt, 200);
};

/**
 * Enhance Work Experience Bullets using Groq AI
 */
export const enhanceBulletAI = async (bulletText, position, targetRole) => {
  if (!bulletText || bulletText.trim().length < 5) {
    throw new Error('Please write some experience description before using AI enhancement.');
  }

  const role = position?.trim() || targetRole?.trim() || 'Professional';

  const prompt = `You are rewriting work experience bullets for a "${role}" resume.

Original experience text: "${bulletText}"

Write exactly 3 achievement-oriented bullet points for a "${role}" resume:
- Each bullet must start with a DIFFERENT strong action verb suited to a "${role}"
- Do NOT start all bullets with the same verb
- Only use facts from the original text — do not invent metrics or company names
- Make each bullet sound like something a "${role}" would do on the job
- Plain text only, no bullet symbols (no •, -, *)

Return valid JSON only:
{"enhancedBullet": "First verb + achievement\\nSecond different verb + achievement\\nThird different verb + achievement"}`;

  // Bullets: output ~200 tokens + 800 reasoning buffer. Use 400 output target.
  return await callGroqAI(prompt, 400);
};

/**
 * Suggest Relevant Skills based on Target Role using Groq AI
 * Gives role-specific skills, NOT generic software engineering skills
 */
export const suggestSkillsAI = async (targetRole = '', existingSkills = []) => {
  const role = targetRole.trim() || 'Professional';
  const existingStr = existingSkills.length > 0 
    ? `\nAlready listed skills (DO NOT repeat these): ${JSON.stringify(existingSkills)}` 
    : '';

  const prompt = `The user is building a resume for the role: "${role}".${existingStr}

Task: Suggest exactly 8 skills that are HIGHLY relevant and in-demand for a "${role}".

CRITICAL: Skills MUST match the "${role}" domain. Examples:
- Graphic Designer → Adobe Photoshop, Adobe Illustrator, InDesign, Figma, Typography, Color Theory, Brand Identity, Print Production
- Software Engineer → JavaScript, React, Node.js, Python, SQL, Git, Docker, REST APIs
- Data Scientist → Python, Machine Learning, TensorFlow, SQL, Data Visualization, Statistics, Pandas, Jupyter
- Marketing Manager → Digital Marketing, SEO, Google Analytics, Social Media, Campaign Management, Content Strategy, Email Marketing, CRM
- HR Manager → Talent Acquisition, HRIS, Employee Relations, Onboarding, Performance Management, Labor Law, Benefits Administration, Recruiting
(Match the role accurately — a "${role}" should NEVER get skills from a different domain)

Return valid JSON:
{"suggestedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8"]}`;

  // Skills output ~80 tokens + 500 reasoning buffer = 580 total
  return await callGroqAI(prompt, 150);
};

/**
 * Generate Draft Resume structure using Groq AI
 */
export const generateDraftAI = async (targetRole, experienceLevel = 'Mid-Senior') => {
  const prompt = `Generate a starter professional summary and skill categories for a "${experienceLevel}" level "${targetRole}".

Return valid JSON:
{
  "title": "${targetRole} Resume",
  "targetRole": "${targetRole}",
  "summary": "Professional 2-3 sentence summary for a ${experienceLevel} ${targetRole}",
  "skills": [
    { "category": "relevant category for ${targetRole}", "items": ["skill1", "skill2", "skill3"] },
    { "category": "another category for ${targetRole}", "items": ["skill4", "skill5", "skill6"] }
  ]
}`;

  return await callGroqAI(prompt, 350);
};

/**
 * Comprehensive Resume ATS Analysis using Groq AI
 */
export const analyzeResumeAI = async (resumeData, jobDescription = '') => {
  const resumeText = typeof resumeData === 'string' ? resumeData : buildResumeText(resumeData);

  if (!resumeText || resumeText.trim().length < 30) {
    throw new Error('Resume content is too short for analysis. Please add more details to your resume.');
  }

  const jdSection = jobDescription && jobDescription.trim().length > 10
    ? `TARGET JOB DESCRIPTION:\n${jobDescription.trim()}`
    : 'No specific job description provided — perform general ATS readiness analysis.';

  const prompt = `You are conducting a professional ATS (Applicant Tracking System) resume audit.

RESUME CONTENT:
${resumeText}

${jdSection}

ANALYSIS RULES:
- Analyze ONLY the actual resume content above — base ALL scores on what is actually written
- NEVER invent, assume, or hallucinate content not present in the resume
- If a section is absent or very thin, score it low (0-30) and explain why
- Identify keywords that are LITERALLY present in the resume text
- Identify missing keywords that would be expected for the candidate's target role

Return valid JSON (all fields required):
{
  "atsScore": <integer 0-100 based on actual resume quality>,
  "matchPercentage": <integer 0-100, job match % if JD provided, otherwise overall readiness %>,
  "headline": "<one-sentence evaluation of this specific resume>",
  "detectedKeywords": ["<keyword actually found in the resume text>"],
  "missingKeywords": ["<important keyword missing from this resume for the role>"],
  "sectionAnalysis": {
    "summary": { "score": <0-100>, "feedback": "<specific feedback about this resume's summary>" },
    "experience": { "score": <0-100>, "feedback": "<specific feedback about this resume's experience section>" },
    "skills": { "score": <0-100>, "feedback": "<specific feedback about this resume's skills section>" },
    "education": { "score": <0-100>, "feedback": "<specific feedback about this resume's education section>" }
  },
  "issues": [
    { "severity": "<high|medium|low>", "category": "<issue category>", "description": "<specific issue found in this resume>", "fix": "<actionable recommendation>" }
  ],
  "actionableSuggestions": [
    "<specific suggestion based on this resume's actual content>",
    "<another specific suggestion>"
  ],
  "disclaimer": "SynapseCV ATS score is an AI-based assessment for guidance only and does not guarantee passing any specific employer ATS filter."
}`;

  // ATS output ~1000 tokens + 1500 reasoning buffer = 2500 total
  return await callGroqAI(prompt, 1500);
};

/**
 * Convert structured resume DB object to readable text for AI analysis
 */
function buildResumeText(resumeData) {
  if (!resumeData || typeof resumeData !== 'object') return String(resumeData);

  const lines = [];
  const p = resumeData.personalInfo || {};
  if (p.fullName) lines.push(`Name: ${p.fullName}`);
  if (p.email) lines.push(`Email: ${p.email}`);
  if (p.title) lines.push(`Title/Role: ${p.title}`);
  if (p.location) lines.push(`Location: ${p.location}`);

  if (resumeData.targetRole) lines.push(`Target Role: ${resumeData.targetRole}`);
  if (resumeData.summary) lines.push(`\nPROFESSIONAL SUMMARY\n${resumeData.summary}`);

  if (resumeData.experience?.length > 0) {
    lines.push('\nWORK EXPERIENCE');
    resumeData.experience.forEach(exp => {
      const dates = exp.startDate ? `${exp.startDate} - ${exp.current ? 'Present' : (exp.endDate || '')}` : '';
      lines.push(`${exp.position || 'Role'} at ${exp.company || 'Company'} (${dates})`);
      if (exp.location) lines.push(`  Location: ${exp.location}`);
      if (exp.description) lines.push(`  ${exp.description}`);
    });
  }

  if (resumeData.skills?.length > 0) {
    lines.push('\nSKILLS');
    resumeData.skills.forEach(cat => {
      lines.push(`${cat.category || 'Skills'}: ${(cat.items || []).join(', ')}`);
    });
  }

  if (resumeData.education?.length > 0) {
    lines.push('\nEDUCATION');
    resumeData.education.forEach(edu => {
      lines.push(`${edu.degree || ''} in ${edu.fieldOfStudy || ''} from ${edu.institution || ''}`);
      if (edu.graduationYear) lines.push(`  Year: ${edu.graduationYear}`);
      if (edu.gpa) lines.push(`  GPA: ${edu.gpa}`);
    });
  }

  if (resumeData.projects?.length > 0) {
    lines.push('\nPROJECTS');
    resumeData.projects.forEach(proj => {
      lines.push(`${proj.title || ''}: ${proj.description || ''}`);
      if (proj.technologies?.length > 0) lines.push(`  Technologies: ${proj.technologies.join(', ')}`);
    });
  }

  if (resumeData.certifications?.length > 0) {
    lines.push('\nCERTIFICATIONS');
    resumeData.certifications.forEach(cert => {
      lines.push(`${cert.name || ''} from ${cert.issuer || ''}`);
    });
  }

  // Handle raw text input (from paste text mode)
  if (resumeData.rawText) {
    lines.push('\nRESUME TEXT:\n' + resumeData.rawText);
  }

  return lines.join('\n');
}
