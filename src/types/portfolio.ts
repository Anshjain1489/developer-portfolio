export interface ProjectItem {
  id: string;
  name: string;
  shortDescription: string;
  technologies: string[];
  keyFeatures: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  architectureDiagram: {
    steps: {
      title: string;
      subtitle: string;
      tech: string;
    }[];
  };
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
  badgeTone: 'emerald' | 'cyan' | 'blue' | 'indigo' | 'amber' | 'violet' | 'slate';
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  verificationUrl?: string;
  hours?: string;
  topics?: string[];
  themeColor: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
  score?: string;
  isCurrent?: boolean;
}

export interface PortfolioData {
  personal: {
    name: string;
    roleTitle: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    portfolioDomain: string;
    statusBadge: string;
    heroHeadline: string;
    heroSupportingText: string;
    aboutSummary: string;
    primaryFocus: string;
    secondaryFocus: string;
    college: string;
    degree: string;
    expectedGraduation: string;
  };
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  buildSteps: {
    step: string;
    title: string;
    description: string;
  }[];
}
