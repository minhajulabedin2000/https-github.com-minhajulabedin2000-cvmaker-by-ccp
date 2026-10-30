export type CvMode = 'professional' | 'matrimonial' | 'comprehensive';
export type DocumentLanguage = 'bn' | 'en';

export interface PersonalDetails {
  name: string;
  tagline: string;
  photoUrl: string;
  phone: string;
  email: string;
  socialMedia: string;
  facebook?: string;
  instagram?: string;
  currentAddress: string;
  permanentAddress: string;
  dateOfBirth?: string;
  age?: string;
  height?: string;
  weight?: string;
  complexion?: string;
  bloodGroup?: string;
  maritalStatus?: string;
  religion?: string;
  nationality?: string;
}

export interface BusinessVenture {
  id: string;
  name: string;
  role: string;
  details: string;
}

export interface ProfessionalProfile {
  profession: string;
  summary: string;
  businessVentures: BusinessVenture[];
}

export interface OrganizationalExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  details?: string;
}

export interface EducationalQualification {
  id: string;
  degree: string;
  sessionOrYear: string;
  institution: string;
  grade?: string;
  details?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category?: string;
  level?: number;
}

export interface FamilyBackground {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  positionInFamily: string;
  sistersMaritalStatus: string;
  brothersMaritalStatus?: string;
  additionalInfo?: string;
}

export interface MatrimonialDetails {
  partnerExpectations: {
    ageRange: string;
    height: string;
    education: string;
    district: string;
    religiousPractices: string;
    otherNotes: string;
  };
  religiousAndLifestyle: {
    prayers: string;
    purdahOrSunnah: string;
    quranRecitation: string;
    hobbies: string;
    healthStatus: string;
    selfDescription: string;
  };
  guardianContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  details?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface SectionTitles {
  personalInfo?: string;
  contact?: string;
  skills?: string;
  profile?: string;
  experience?: string;
  education?: string;
  family?: string;
  matrimonial?: string;
  languages?: string;
}

export interface SectionVisibility {
  photo: boolean;
  personalInfo: boolean;
  contact: boolean;
  skills: boolean;
  professionalProfile: boolean;
  organizationalExperience: boolean;
  education: boolean;
  familyBackground: boolean;
  matrimonialDetails: boolean;
  languages: boolean;
  customSections: boolean;
}

export type TemplateId =
  | 'minhaj-teal'
  | 'royal-gold'
  | 'executive-burgundy'
  | 'elite-sapphire'
  | 'corporate-navy'
  | 'modern-slate'
  | 'creative-emerald';

export interface ThemeConfig {
  template: TemplateId;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'bengali';
  fontSize: 'compact' | 'normal' | 'relaxed';
  spacing: 'compact' | 'normal' | 'spacious';
}

export interface ResumeData {
  cvMode: CvMode;
  documentLanguage: DocumentLanguage;
  personal: PersonalDetails;
  profile: ProfessionalProfile;
  experience: OrganizationalExperience[];
  education: EducationalQualification[];
  skills: SkillItem[];
  family: FamilyBackground;
  matrimonial: MatrimonialDetails;
  languages: LanguageItem[];
  customSections: CustomSection[];
  sectionTitles: SectionTitles;
  visibility: SectionVisibility;
  theme: ThemeConfig;
}
