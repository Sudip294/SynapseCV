import React from 'react';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CompactTemplate } from './CompactTemplate';
import { AcademicTemplate } from './AcademicTemplate';

export const TEMPLATES = [
  { id: 'executive', name: 'Executive Modern', tag: 'Most Popular', category: 'General / Tech' },
  { id: 'minimal', name: 'Minimalist Tech', tag: 'ATS Standard', category: 'Software & Data' },
  { id: 'corporate', name: 'Corporate Leader', tag: 'High-Impact', category: 'Management & PM' },
  { id: 'creative', name: 'Creative Innovator', tag: 'Clean Grid', category: 'Design & Product' },
  { id: 'compact', name: 'Modern Compact', tag: '1-Page Dense', category: 'Senior Engineers' },
  { id: 'academic', name: 'Academic Scholar', tag: 'Classic Serif', category: 'Research & Education' },
];

export const TemplateEngine = ({ resume, templateId = 'executive' }) => {
  const activeTemplate = templateId || resume?.templateId || 'executive';

  switch (activeTemplate) {
    case 'minimal':
      return <MinimalTemplate resume={resume} />;
    case 'corporate':
      return <CorporateTemplate resume={resume} />;
    case 'creative':
      return <CreativeTemplate resume={resume} />;
    case 'compact':
      return <CompactTemplate resume={resume} />;
    case 'academic':
      return <AcademicTemplate resume={resume} />;
    case 'executive':
    default:
      return <ExecutiveTemplate resume={resume} />;
  }
};
