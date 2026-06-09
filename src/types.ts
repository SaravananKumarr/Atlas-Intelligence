/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  funding: string;
  founded: number;
  hq: string;
  employees: string;
  website: string;
  tags: string[];
  category: string;
  color: string; // Theme color for decoration
}

export type RemoteType = "Remote" | "Hybrid" | "On-site";
export type ExperienceTier = "Junior" | "Mid" | "Senior";

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  salary: number; // numerical value for sorting/filtering (e.g., 210000)
  salaryString: string; // e.g. "$190,000 - $240,000" or "$150,000+"
  location: string;
  remote: RemoteType;
  applyUrl: string;
  experienceRequired: number; // numerical value for exact filtrations
  experienceTier: ExperienceTier;
  description: string;
  tags: string[];
  postedAt: string;
  benefits: string[];
  isFeatured: boolean;
  department: string;
  weeklyHours?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  applicantName: string;
  applicantEmail: string;
  resumeText: string;
  coverLetter?: string;
  portfolioUrl?: string;
  status: "Applied" | "Under Review" | "Interviewing" | "Offered" | "Closed";
  appliedAt: string;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}


