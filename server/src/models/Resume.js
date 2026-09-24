import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }, // Bullet points or text
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  fieldOfStudy: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  gpa: { type: String, default: '' },
  description: { type: String, default: '' },
});

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, default: '' },
  items: [{ type: String }],
});

const projectSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  link: { type: String, default: '' },
  github: { type: String, default: '' },
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  issuer: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  expiryDate: { type: String, default: '' },
  credentialId: { type: String, default: '' },
  url: { type: String, default: '' },
});

const achievementSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  date: { type: String, default: '' },
});

const languageSchema = new mongoose.Schema({
  language: { type: String, default: '' },
  proficiency: { type: String, default: 'Native / Fluent' },
});

const linkSchema = new mongoose.Schema({
  label: { type: String, default: '' },
  url: { type: String, default: '' },
});

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'Untitled Resume',
      trim: true,
    },
    targetRole: {
      type: String,
      default: '',
    },
    templateId: {
      type: String,
      default: 'executive',
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      title: { type: String, default: '' },
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillCategorySchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    achievements: [achievementSchema],
    languages: [languageSchema],
    customLinks: [linkSchema],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model('Resume', resumeSchema);
