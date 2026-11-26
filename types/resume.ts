
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  percentage: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  technologies: string[];
  description: string;
}

export interface Resume {
  _id: string;
  title: string;
  user?: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ResumeFormData {
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: string[];
}

export const emptyResume: ResumeFormData = {
  title: "My Professional Resume",

  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    summary: ""
  },

  education: [],

  experience: [],

  skills: [],

  projects: [],

  certifications: []
};
