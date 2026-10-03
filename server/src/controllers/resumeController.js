import { Resume } from '../models/Resume.js';

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res, next) => {
  try {
    const { title, targetRole, templateId, personalInfo } = req.body;

    // Default personalInfo from logged in user if available
    const initialPersonalInfo = {
      fullName: personalInfo?.fullName || req.user.name || '',
      email: personalInfo?.email || req.user.email || '',
      phone: personalInfo?.phone || req.user.phone || '',
      location: personalInfo?.location || req.user.location || '',
      title: personalInfo?.title || req.user.title || '',
      website: personalInfo?.website || req.user.socialLinks?.website || '',
      linkedin: personalInfo?.linkedin || req.user.socialLinks?.linkedin || '',
      github: personalInfo?.github || req.user.socialLinks?.github || '',
    };

    const resumeTitle = title || (targetRole ? `${targetRole} Resume` : 'Untitled Resume');

    const resume = await Resume.create({
      user: req.user._id,
      title: resumeTitle,
      targetRole: targetRole || '',
      templateId: templateId || 'executive',
      personalInfo: initialPersonalInfo,
      summary: req.user.bio || '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [
        { language: 'English', proficiency: 'Native / Fluent' }
      ],
      customLinks: [],
    });

    res.status(201).json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all resumes for logged in user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this resume' });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resume' });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      resume,
      message: 'Resume updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resume' });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate a resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
export const duplicateResume = async (req, res, next) => {
  try {
    const originalResume = await Resume.findById(req.params.id);

    if (!originalResume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (originalResume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to duplicate this resume' });
    }

    const resumeObject = originalResume.toObject();
    delete resumeObject._id;
    delete resumeObject.createdAt;
    delete resumeObject.updatedAt;

    resumeObject.title = `${originalResume.title} (Copy)`;

    const duplicatedResume = await Resume.create(resumeObject);

    res.status(201).json({
      success: true,
      resume: duplicatedResume,
      message: 'Resume duplicated successfully',
    });
  } catch (error) {
    next(error);
  }
};
