/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Globe,
  Calendar,
  ArrowUpRight,
  Heart,
  Bookmark,
  Plus,
  Send,
  CheckCircle2,
  Building2,
  Users,
  Award,
  Cpu,
  Layers,
  Lock,
  X,
  Menu,
  ChevronRight,
  Filter,
  TrendingUp,
  Newspaper,
  FileText,
  Sparkles,
  Upload,
  ExternalLink,
  GraduationCap,
  SlidersHorizontal,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Job, Company, JobApplication, RemoteType, ExperienceTier } from "./types";
import { SEED_COMPANIES, SEED_JOBS, STATISTICS, formatCurrencyINR, convertTextToINR } from "./data";
import { TOP_100_AI_STARTUPS_DOC, STATE_OF_AI_FUNDING_DOC, AI_AGENTS_LANDSCAPE_DOC, AI_CODING_IDES_DOC } from "./researchData";
import { AT_LAS_FOUNDERS, AIFounder, calculateComputeEstimate } from "./foundersData";

// Beautiful generic & brand-authentic company logo vectors mapped by companyId
export function CompanyLogo({ companyId, companyName, className = "w-10 h-10" }: { companyId: string; companyName: string; className?: string }) {
  const normalizedId = companyId.toLowerCase();
  
  if (normalizedId === "openai") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#0F172A] text-[#10a37f] border border-gray-100 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M12,4 a3,3 0 0,0 -3,3 c0,0.8 0.3,1.5 0.8,2 M12,4 a3,3 0 0,1 3,3 c0,0.8 -0.3,1.5 -0.8,2 M9.8,9 c-1,0.5 -1.8,1.6 -1.8,3 c0,1.7 1.3,3 3,3 M14.2,9 c1,0.5 1.8,1.6 1.8,3 c0,1.7 -1.3,3 -3,3 M11,15 c0,1.7 1.3,3 3,3 M13,15 c0,1.7 -1.3,3 -10-4" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="none" opacity="0.1"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "anthropic") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#FBF0E6] text-[#382F2D] border border-orange-100 shadow-3xs p-1.5 shrink-0 select-none ${className}`}>
        <span className="font-serif font-extrabold text-sm tracking-tighter">▲</span>
      </div>
    );
  }
  
  if (normalizedId === "perplexity") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#191A1D] text-[#39C3D2] border border-teal-950/20 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M6.3 17.7L17.7 6.3" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2.5" fill="#191A1D" stroke="currentColor"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "cursor") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-black text-lime-400 border border-gray-900 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M7 3l11 11h-5l5 7h-2.5l-5-7h-3.5z"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "elevenlabs") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#09090B] text-[#E5C384] border border-[#27272A] shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
          <path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 8v8" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "pinecone") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#0D2A1C] text-[#24C27E] border border-[#16432F] shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M12 3l6 7h-4v6h4v5H6v-5h4v-6H6l6-7z" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "cohere") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#DFF0E6] text-[#0A2215] border border-[#BCE2CD] shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <circle cx="12" cy="12" r="7" strokeDasharray="3 2" />
          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor"/>
        </svg>
      </div>
    );
  }
  
  if (normalizedId === "mistral") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#FF4500] text-white border border-orange-200 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <span className="font-mono font-extrabold text-xs">M</span>
      </div>
    );
  }

  if (normalizedId === "scale" || normalizedId === "scaleai") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-black text-white border border-gray-800 shadow-3xs p-1 shrink-0 font-display font-semibold ${className}`}>
        <span className="text-[11px] tracking-tighter">S.</span>
      </div>
    );
  }

  if (normalizedId === "databricks") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FF3621] to-[#E02F50] text-[#FFFFFF] border border-orange-100 shadow-3xs p-0.5 shrink-0 font-display font-black leading-none flex-col justify-center ${className}`}>
        <span className="text-[10px]">DB</span>
      </div>
    );
  }

  if (normalizedId === "midjourney") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#03001C] text-indigo-200 border border-indigo-950 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M5 19s4-1 7-1 7 1 7 1v-2H5v2zM12 3v13M12 5l-6 6h6m0-7l6 6h-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (normalizedId === "vercel") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-black text-white border border-gray-900 shadow-3xs p-1.5 shrink-0 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      </div>
    );
  }

  if (normalizedId === "huggingface") {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-[#FFFDF0] text-[#D97706] border border-[#FDE047] shadow-3xs p-1 shrink-0 font-bold select-none text-sm leading-none ${className}`}>
        🤗
      </div>
    );
  }

  // Beautiful fallback high-contrast initial badge
  const initial = companyName ? companyName.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-red-50 text-red-600 border-red-100",
    "bg-blue-50 text-blue-600 border-blue-100",
    "bg-emerald-50 text-emerald-600 border-emerald-100",
    "bg-amber-50 text-amber-600 border-amber-100",
    "bg-indigo-50 text-indigo-600 border-indigo-100",
    "bg-purple-50 text-purple-600 border-purple-100",
    "bg-pink-50 text-pink-600 border-pink-100",
    "bg-rose-50 text-rose-600 border-rose-100",
  ];
  const colorIndex = (companyName || "A").charCodeAt(0) % colors.length;
  const pickedColor = colors[colorIndex];

  return (
    <div className={`flex items-center justify-center rounded-xl font-display font-medium select-none border text-xs ${pickedColor} ${className}`}>
      {initial}
    </div>
  );
}

export default function App() {
  // Navigation & Workspace State
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("discover");
  const [selectedSubPill, setSelectedSubPill] = useState<string>("discover");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [timeFilter, setTimeFilter] = useState<"all" | "24h" | "7d" | "30d">("all");

  // Founders Page Interactive Hooks
  const [customFounders, setCustomFounders] = useState<AIFounder[]>([]);
  const [selectedFounder, setSelectedFounder] = useState<AIFounder | null>(null);
  const [founderSearchText, setFounderSearchText] = useState<string>("");
  const [showApplyFounderModal, setShowApplyFounderModal] = useState<boolean>(false);
  
  // Apply Founder Form Fields
  const [newFounderName, setNewFounderName] = useState<string>("");
  const [newFounderCompany, setNewFounderCompany] = useState<string>("");
  const [newFounderBio, setNewFounderBio] = useState<string>("");
  const [newFounderFocus, setNewFounderFocus] = useState<string>("");
  const [newFounderCapital, setNewFounderCapital] = useState<string>("$2M - Seed");
  const [newFounderStack, setNewFounderStack] = useState<string>("");
  const [newFounderQuote, setNewFounderQuote] = useState<string>("");

  // Interactive Compute Budget Estimator
  const [estParamsBillion, setEstParamsBillion] = useState<number>(70);
  const [estTokensTrillion, setEstTokensTrillion] = useState<number>(2.5);
  const [estHardware, setEstHardware] = useState<"H105" | "H200" | "Blackwell" | string>("H200");
  const [estGpus, setEstGpus] = useState<number>(2048);
  const [estMfu, setEstMfu] = useState<number>(45);

  // Core Reactive Data Lists (backed by localStorage)
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem("atlas_jobs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If we don't have Groq or Pinecone in cached jobs, or if we haven't upgraded currency, force upgrade to Rupees list
        const hasNewStartups = parsed.some((j: Job) => j.companyId === "groq" || j.companyId === "pinecone");
        const hasRupees = parsed.some((j: Job) => j.salaryString && j.salaryString.includes("₹"));
        if (parsed.length < 500 || !hasNewStartups || !hasRupees) {
          return SEED_JOBS;
        }
        return parsed;
      } catch (e) {
        return SEED_JOBS;
      }
    }
    return SEED_JOBS;
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("atlas_saved_job_ids");
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem("atlas_applications");
    return saved ? JSON.parse(saved) : [
      {
        id: "mock-app-1",
        jobId: "openai-rlhf-researcher",
        jobTitle: "Staff RLHF Research Engineer",
        companyName: "OpenAI",
        companyLogo: "⚡",
        applicantName: "Saravanan Kumar",
        applicantEmail: "kumarsaravanan2005@gmail.com",
        resumeText: "Saravanan_Kumar_AI_Resume.pdf",
        coverLetter: "Highly motivated artificial intelligence researcher focused on aligning massive multi-modal transformers using robust reinforcement learning methodologies.",
        portfolioUrl: "https://github.com/kumarsaravanan2005",
        status: "Interviewing",
        appliedAt: "2026-06-08T14:32:00Z"
      }
    ];
  });

  // Sync to local storage on adjustments
  useEffect(() => {
    localStorage.setItem("atlas_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("atlas_saved_job_ids", JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem("atlas_applications", JSON.stringify(applications));
  }, [applications]);

  // Interactivity Overlays State
  const [selectedJob, setSelectedJob] = useState<Job | null>(SEED_JOBS[0]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showPostJobModal, setShowPostJobModal] = useState<boolean>(false);
  const [showApplyModal, setShowApplyModal] = useState<Job | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Extended Interactive Journey States
  const [applyStep, setApplyStep] = useState<number>(1);
  const [isParsingResume, setIsParsingResume] = useState<boolean>(false);
  const [parsingProgress, setParsingProgress] = useState<number>(0);
  const [resumeMatchScore, setResumeMatchScore] = useState<number | null>(null);
  const [isGeneratingCover, setIsGeneratingCover] = useState<boolean>(false);

  // Recruiter Chatbot
  const [activeInterviewAppId, setActiveInterviewAppId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string; timestamp: string }>>([]);
  const [isRecruiterTyping, setIsRecruiterTyping] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [currentChatQuestionIdx, setCurrentChatQuestionIdx] = useState<number>(0);

  // Coding Sandbox Challenge
  const [activeSandboxAppId, setActiveSandboxAppId] = useState<string | null>(null);
  const [sandboxCode, setSandboxCode] = useState<string>(`// Optimize Atlas layer matching algorithm
function findOptimalWeights(coordinates: number[], dimensions: number): number {
  // TODO: Fast Dot Product & cosine distance optimization
  let sum = 0;
  for(let i = 0; i < coordinates.length; i++) {
    sum += coordinates[i];
  }
  return sum / dimensions;
}`);
  const [sandboxConsole, setSandboxConsole] = useState<string[]>([]);
  const [isCompilingSandbox, setIsCompilingSandbox] = useState<boolean>(false);
  const [sandboxSuccess, setSandboxSuccess] = useState<boolean>(false);

  // Founders Portal Verification
  const [isFounderVerified, setIsFounderVerified] = useState<boolean>((() => {
    return localStorage.getItem("atlas_founder_verified") === "true";
  })());
  const [showFounderAuthModal, setShowFounderAuthModal] = useState<boolean>(false);
  const [founderAuthToken, setFounderAuthToken] = useState<string>("");
  const [isVerifyingFounder, setIsVerifyingFounder] = useState<boolean>(false);
  
  // Custom Ventures Pitch Details
  const [selectedVCPartner, setSelectedVCPartner] = useState<any | null>(null);
  const [showPitchScheduler, setShowPitchScheduler] = useState<boolean>(false);
  const [pitchDate, setPitchDate] = useState<string>("2026-06-11");
  const [pitchTime, setPitchTime] = useState<string>("11:00 AM");
  const [pitchBrief, setPitchBrief] = useState<string>("");

  // Search, Hierarchy, and Filtering States
  const [textSearch, setTextSearch] = useState<string>("");
  const [submitSearch, setSubmitSearch] = useState<string>("");
  const [filterRemote, setFilterRemote] = useState<RemoteType | "All">("All");
  const [filterExperience, setFilterExperience] = useState<ExperienceTier | "All">("All");
  const [minSalarySlider, setMinSalarySlider] = useState<number>(0);
  const [filterLocation, setFilterLocation] = useState<string>("All");

  // Post a Job Form State
  const [newJob, setNewJob] = useState({
    title: "",
    companyId: "openai",
    salary: 14000000,
    salaryMin: 12000000,
    salaryMax: 16000000,
    location: "San Francisco, CA",
    remote: "Hybrid" as RemoteType,
    applyUrl: "",
    experienceRequired: 3,
    experienceTier: "Mid" as ExperienceTier,
    description: "",
    tags: "React, TypeScript, AI, UI, Product",
    benefits: "Full healthcare, Gourmet lunch, 401k match, Learning allowance",
    department: "Engineering"
  });

  // Apply Form State
  const [applicantForm, setApplicantForm] = useState({
    name: "Saravanan Kumar",
    email: "kumarsaravanan2005@gmail.com",
    resumeName: "",
    resumeRawText: "",
    coverLetter: "",
    portfolioUrl: ""
  });

  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast notifier helper
  const triggerToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 4500);
  };

  const triggerTXAndScrollToDirectory = () => {
    setActiveSidebarTab("jobs");
    setTimeout(() => {
      const el = document.getElementById("job-board-directory-anchor");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const downloadResearchPaper = (title: string) => {
    let content = "";
    let filename = "archive-document.md";

    const normalizedTitle = title.toLowerCase();

    if (normalizedTitle.includes("top 100") || normalizedTitle.includes("startups index")) {
      content = TOP_100_AI_STARTUPS_DOC;
      filename = "top_100_ai_startups_index_2026.md";
    } else if (normalizedTitle.includes("funding") || normalizedTitle.includes("financial")) {
      content = STATE_OF_AI_FUNDING_DOC;
      filename = "state_of_ai_funding_q1_2026.md";
    } else if (normalizedTitle.includes("agents") || normalizedTitle.includes("interpretability")) {
      content = AI_AGENTS_LANDSCAPE_DOC;
      filename = "ai_agents_mechanistic_interpretability_2026.md";
    } else if (normalizedTitle.includes("coding ides") || normalizedTitle.includes("autocompression") || normalizedTitle.includes("benchmark")) {
      content = AI_CODING_IDES_DOC;
      filename = "ai_coding_ides_autocompression_benchmarks_2026.md";
    } else {
      content = `# ${title}\n\n*Atlas Intelligence Shared Document Archive*\n\nGenerated on ${new Date().toISOString()}`;
      filename = `${normalizedTitle.replace(/[^a-z0-9]+/g, "_")}_2026.md`;
    }

    try {
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast(`📥 File download initiated: ${filename}`);
    } catch (error) {
      console.error("Failed to initiate file download inside browser sandboxed frame:", error);
      triggerToast("⚠️ Sandbox restricted action. Download blocked by sandbox context.");
    }
  };

  // Toggle saving a job
  const toggleSaveJob = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedJobIds.includes(id)) {
      setSavedJobIds(prev => prev.filter(item => item !== id));
      triggerToast("Job removed from saved bookmark list.");
    } else {
      setSavedJobIds(prev => [...prev, id]);
      triggerToast("Job successfully saved to your bookmarks.");
    }
  };

  // Handle Form Post Job
  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.applyUrl || !newJob.description) {
      alert("Please fill in all necessary fields.");
      return;
    }

    const matchedComp = SEED_COMPANIES.find(c => c.id === newJob.companyId) || SEED_COMPANIES[0];

    const preparedId = `job-${Date.now()}`;
    const newlyCreatedJob: Job = {
      id: preparedId,
      title: newJob.title,
      companyId: matchedComp.id,
      companyName: matchedComp.name,
      companyLogo: matchedComp.logo,
      salary: Number(newJob.salary),
      salaryString: `${formatCurrencyINR(Number(newJob.salaryMin))} - ${formatCurrencyINR(Number(newJob.salaryMax))}+`,
      location: newJob.location,
      remote: newJob.remote,
      applyUrl: newJob.applyUrl,
      experienceRequired: Number(newJob.experienceRequired),
      experienceTier: newJob.experienceTier,
      description: newJob.description,
      tags: newJob.tags.split(",").map(item => item.trim()).filter(Boolean),
      benefits: newJob.benefits.split(",").map(item => item.trim()).filter(Boolean),
      isFeatured: true,
      postedAt: "Just now",
      department: newJob.department
    };

    setJobs(prev => [newlyCreatedJob, ...prev]);
    setShowPostJobModal(false);
    setSelectedJob(newlyCreatedJob);
    triggerToast(`"${newJob.title}" has been posted successfully to Atlas!`);

    // Reset Form
    setNewJob({
      title: "",
      companyId: "openai",
      salary: 14000000,
      salaryMin: 12000000,
      salaryMax: 16000000,
      location: "San Francisco, CA",
      remote: "Hybrid",
      applyUrl: "",
      experienceRequired: 3,
      experienceTier: "Mid",
      description: "",
      tags: "React, TypeScript, AI, UI",
      benefits: "Full healthcare, Flexible work model",
      department: "Engineering"
    });
  };

  // Custom automatic Cover Letter generator matching job specifications
  const generateAICoverLetterText = (job: Job) => {
    return `Subject: Expressing high alignment for ${job.title} at ${job.companyName}

Dear Hiring Managers at ${job.companyName},

I am writing to express my strong intent for the ${job.title} position listed on your secure Atlas channel. As an AI-focused builder with high commitment, I have been actively designing robust architectures centered around ${job.tags.slice(0, 3).join(", ") || "transformational components"}.

Your work at ${job.companyName} aligns perfectly with my professional goals, particularly your innovations in ${job.department}. My background includes deploying highly reliable React/TypeScript/Python systems, and I am eager to apply my technical stances directly to your objectives.

Thank you very much for your time and indexing consideration.

Sincerely,
Saravanan Kumar`;
  };

  // Simulated AI PDF Resume Parser
  const triggerResumeSimulationParsing = (fileName: string) => {
    setIsParsingResume(true);
    setParsingProgress(0);
    setResumeMatchScore(null);
    let prog = 0;
    const intervalId = setInterval(() => {
      prog += 10;
      setParsingProgress(prog);
      if (prog >= 100) {
        clearInterval(intervalId);
        setTimeout(() => {
          setIsParsingResume(false);
          const score = Math.floor(Math.random() * 8) + 90; // Generate dynamic match score: 90 - 97%
          setResumeMatchScore(score);
          triggerToast(`Resume indexing parsed. Standard match score evaluated at ${score}%!`);
          // Automatically advance to Step 3 (Cover letter step / review) if parsing takes place
          setApplyStep(3);
        }, 300);
      }
    }, 120);
  };

  // Handle Drag & Drop events (USABILITY PATTERNS COMPLIANT)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setApplicantForm(prev => ({
        ...prev,
        resumeName: file.name,
        resumeRawText: `Content extracted from simulated parsing of local document: ${file.name} (${Math.round(file.size / 1024)} KB)`
      }));
      triggerResumeSimulationParsing(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setApplicantForm(prev => ({
        ...prev,
        resumeName: file.name,
        resumeRawText: `Content extracted from simulated parsing of local document: ${file.name} (${Math.round(file.size / 1024)} KB)`
      }));
      triggerResumeSimulationParsing(file.name);
    }
  };

  // Cover Letter AI Auto-Writer Handler
  const handleAutoBuildCoverLetter = () => {
    if (!showApplyModal) return;
    setIsGeneratingCover(true);
    setTimeout(() => {
      setIsGeneratingCover(false);
      const customLetter = generateAICoverLetterText(showApplyModal);
      setApplicantForm(prev => ({
        ...prev,
        coverLetter: customLetter
      }));
      triggerToast("Cover letter custom-written via Atlas Intelligence!");
    }, 1100);
  };

  // Handle Apply Submission Journey
  const handleApplyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal) return;

    if (!applicantForm.name || !applicantForm.email || !applicantForm.resumeName) {
      alert("Please enter your name, email and upload your resume PDF to proceed.");
      return;
    }

    const applicationRecord: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: showApplyModal.id,
      jobTitle: showApplyModal.title,
      companyName: showApplyModal.companyName,
      companyLogo: showApplyModal.companyLogo,
      applicantName: applicantForm.name,
      applicantEmail: applicantForm.email,
      resumeText: applicantForm.resumeName,
      coverLetter: applicantForm.coverLetter,
      portfolioUrl: applicantForm.portfolioUrl,
      status: "Applied",
      appliedAt: new Date().toISOString()
    };

    setApplications(prev => [applicationRecord, ...prev]);
    // Transit to success onboarding step rather than closing
    setApplyStep(4);
    triggerToast(`Created submittal record to ${showApplyModal.companyName} in active tracking index.`);
  };

  // Interactive Screening Recruiter Chatbot Handlers
  const startRecruiterInterviewChat = (appId: string, jobTitle: string, companyName: string) => {
    setActiveInterviewAppId(appId);
    setCurrentChatQuestionIdx(0);
    setIsRecruiterTyping(true);
    setChatMessages([]);
    
    setTimeout(() => {
      const greetText = `Greetings, ${applicantForm.name}! I am Atlas Recruit Bot 🤖, your automated pre-screening AI companion for the ${jobTitle} opening at ${companyName}.\n\nLet's run a brief, high-fidelity technical alignment chat. \n\n**To start: What specific engineering principles or robust architectural design choices do you feel are most vital for building reliable software platforms?**`;
      setChatMessages([
        {
          sender: "bot",
          text: greetText,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setIsRecruiterTyping(false);
    }, 1000);
  };

  const submitInterviewMessage = () => {
    if (!chatInput.trim() || !activeInterviewAppId) return;

    const userMsg = {
      sender: "user" as const,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsRecruiterTyping(true);

    // Dynamic state evaluation response
    setTimeout(() => {
      let responseText = "";
      if (currentChatQuestionIdx === 0) {
        responseText = `Excellent evaluation! Focusing on low-latency microservices and robust clean typing creates high infrastructural durability.\n\n**Next query: Web platforms frequently face real-time data spikes. How do you construct caching strategies or use responsive visual hooks (like useEffect cleanup and memoization) to keep UI experiences fluid and prevent infinite renders?**`;
        setCurrentChatQuestionIdx(1);
        setIsRecruiterTyping(false);
        setChatMessages(prev => [...prev, {
          sender: "bot",
          text: responseText,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } else {
        responseText = `Splendid answer! Your conceptual alignment coefficients are off the charts. High modularity, TypeScript safety, and proper state structures indicate senior developer patterns.\n\n**INTERVIEW RATING:** Passed with **94% Alignment Index**! \n\nI have successfully upgraded your application status from **"Applied"** to **"Interviewing"** and unlocked your automated **Technical Sandbox Code Challenge**! Good luck!`;
        
        // Update applications database
        setApplications(prev => prev.map(a => {
          if (a.id === activeInterviewAppId) {
            return {
              ...a,
              status: "Interviewing"
            };
          }
          return a;
        }));

        setIsRecruiterTyping(false);
        setChatMessages(prev => [...prev, {
          sender: "bot",
          text: responseText,
          timestamp: new Date().toLocaleTimeString()
        }]);
        triggerToast("Upgrade: Application advanced to Intercom Screen Phase!");
      }
    }, 1400);
  };

  // Compile & run simulated unit tests inside code playground sandbox
  const handleRunSandboxTests = () => {
    setIsCompilingSandbox(true);
    setSandboxConsole([
      "> tsc --noEmit",
      "> tsc compiled successfully. Launching unit tests..."
    ]);

    setTimeout(() => {
      setSandboxConsole(prev => [...prev, "[RUN] test_weights_correctness_scaling: PASSED (1.1ms)"]);
    }, 450);

    setTimeout(() => {
      setSandboxConsole(prev => [...prev, "[RUN] test_dimension_bounds_checking: PASSED (0.9ms)"]);
    }, 900);

    setTimeout(() => {
      setSandboxConsole(prev => [
        ...prev,
        "[RUN] test_high_concurrency_load_100k: PASSED (14.2ms)",
        "✔ STATUS: 3 of 3 unit tests matched absolute precision criteria!",
        "Perfect layer alignment score verified."
      ]);
      setIsCompilingSandbox(false);
      setSandboxSuccess(true);
      triggerToast("Sandbox system tests completed successfully!");

      if (activeSandboxAppId) {
        setApplications(prev => prev.map(a => {
          if (a.id === activeSandboxAppId) {
            return {
              ...a,
              status: "Offered"
            };
          }
          return a;
        }));
        triggerToast("🎉 CONGRATULATIONS: Employer Offer Letter unlocked!");
      }
    }, 1600);
  };

  // Handles Founders Sandbox Authentication
  const handleFoundersAuthenticate = (token: string) => {
    setIsVerifyingFounder(true);
    setTimeout(() => {
      setIsVerifyingFounder(false);
      setIsFounderVerified(true);
      localStorage.setItem("atlas_founder_verified", "true");
      setShowFounderAuthModal(false);
      triggerToast("Atlas Founders Network Auth verified! Welcome back, partner.");
    }, 1200);
  };

  // Submit Strategic Pitch Message simulation
  const handleSendStrategicPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchBrief.trim() || !selectedVCPartner) return;
    
    triggerToast(`Strategic Brief successfully securely routed to investment committee at ${selectedVCPartner.name}...`);
    setPitchBrief("");
    setTimeout(() => {
      triggerToast(`Response received from ${selectedVCPartner.name}: "We love this vector pipeline description. Let's schedule a video screening brief!"`);
    }, 3200);
  };

  // Helper to categorize AI jobs into exact human-readable roles automatically
  const getJobCategory = (job: any): string => {
    const title = job.title.toLowerCase();
    
    if (title.includes("research") || title.includes("scientist") || title.includes("rlhf") || title.includes("alignment") || title.includes("mechanistic") || title.includes("interpretability")) {
      return "AI Researchers";
    }
    if (title.includes("infrastructure") || title.includes("mlops") || title.includes("hardware") || title.includes("lpu") || title.includes("network") || title.includes("systems") || title.includes("database") || title.includes("compiler") || title.includes("cloud") || title.includes("ops")) {
      return "AI Infrastructure";
    }
    if (title.includes("security") || title.includes("safety") || title.includes("trust") || title.includes("red team") || title.includes("jailbreak") || title.includes("compliance")) {
      return "AI Security";
    }
    if (title.includes("audio") || title.includes("voice") || title.includes("sound") || title.includes("synthesis") || title.includes("tts") || title.includes("video") || title.includes("diffusion") || title.includes("media") || title.includes("avatar")) {
      return "AI Voice & Media";
    }
    if (title.includes("product manager") || title.includes(" pm") || title.includes("pm ") || title.includes("product lead") || title.includes("product strategy") || title.includes("product owner")) {
      return "AI Product Managers";
    }
    // Default fallback to Software Developers
    return "Software Developers";
  };

  // Process filters
  const filteredJobs = jobs.filter(job => {
    const query = submitSearch.toLowerCase().trim() || textSearch.toLowerCase().trim();
    const matchesQuery = !query ||
      job.title.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query));

    const matchesRemote = filterRemote === "All" || job.remote === filterRemote;
    const matchesExperience = filterExperience === "All" || job.experienceTier === filterExperience;
    const matchesMinSalary = job.salary >= minSalarySlider;

    let matchesLocation = true;
    if (filterLocation !== "All") {
      if (filterLocation === "Remote_Jobs") {
        matchesLocation = job.remote === "Remote";
      } else if (filterLocation === "San_Francisco") {
        matchesLocation = job.location.includes("San Francisco") || job.location.includes("SF");
      } else if (filterLocation === "London") {
        matchesLocation = job.location.includes("London");
      } else if (filterLocation === "Europe") {
        matchesLocation = job.location.includes("Paris") || job.location.includes("London") || job.location.includes("France") || job.location.includes("Europe");
      }
    }

    // Category Filter
    let matchesCategory = true;
    if (activeCategory !== "All") {
      matchesCategory = (getJobCategory(job) === activeCategory);
    }

    // Time Filter (Last 24 hrs, last 7 days, last 30 days)
    let matchesTime = true;
    if (timeFilter !== "all") {
      const post = job.postedAt.toLowerCase();
      const isWithin24h = post.includes("h ago") || post.includes("now") || post.includes("1h");
      
      if (timeFilter === "24h") {
        matchesTime = isWithin24h;
      } else if (timeFilter === "7d") {
        if (isWithin24h) {
          matchesTime = true;
        } else if (post.includes("d ago")) {
          const daysNum = parseInt(post.replace(/[^0-9]/g, ""));
          matchesTime = !isNaN(daysNum) && daysNum <= 7;
        } else {
          matchesTime = false;
        }
      } else if (timeFilter === "30d") {
        if (isWithin24h) {
          matchesTime = true;
        } else if (post.includes("d ago")) {
          const daysNum = parseInt(post.replace(/[^0-9]/g, ""));
          matchesTime = !isNaN(daysNum) && daysNum <= 30;
        } else {
          matchesTime = false;
        }
      }
    }

    return matchesQuery && matchesRemote && matchesExperience && matchesMinSalary && matchesLocation && matchesCategory && matchesTime;
  });

  // Calculate unique locations in list for filter dropdown helpers
  const savedAndFilteredJobs = jobs.filter(job => savedJobIds.includes(job.id));

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 font-sans flex antialiased relative overflow-x-hidden md:overflow-x-visible">
      
      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-20 md:hidden animate-fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* 1. Left Sidebar Navigation Panel */}
      <aside className={`w-80 bg-white border-r border-gray-100 flex flex-col shrink-0 h-screen select-none z-30 transition-transform duration-300 fixed md:sticky top-0 left-0 md:translate-x-0 ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 pb-4 flex items-center justify-between">
          {/* Logo with matching vector element */}
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-brand shrink-0" fill="currentColor">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" className="text-brand/10"/>
              <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
            <div>
              <span className="font-display text-base font-extrabold text-gray-950 tracking-tight block uppercase leading-none">Atlas</span>
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-semibold mt-0.5">Intelligence</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-brand text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              v3.6
            </span>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-950 hover:bg-gray-105 rounded-lg md:hidden transition"
              title="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Row Items */}
        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
            The Intelligence Hub
          </div>

          {[
            { id: "discover", label: "Discover", icon: Cpu, badge: "NEW" },
            { id: "startups", label: "Startups", icon: Building2 },
            { id: "founders", label: "Founders", icon: Users },
            { id: "jobs", label: "Jobs Directory", icon: Briefcase, count: jobs.length },
            { id: "funding", label: "Funding & Financials", icon: DollarSign },
            { id: "research", label: "Research Insight", icon: FileText }
          ].map((item) => {
            const IconComponent = item.icon;
            const isTabActive = activeSidebarTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => {
                  setActiveSidebarTab(item.id);
                  setIsMobileSidebarOpen(false);
                  if (item.id === "jobs" || item.id === "discover") {
                    setSelectedSubPill(item.id);
                  } else {
                    setSelectedSubPill("all");
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isTabActive
                    ? "bg-[#ff385c]/8 text-brand font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 transition-colors ${
                    isTabActive ? "text-brand" : "text-gray-400 group-hover:text-gray-700"
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold bg-[#ff385c]/15 text-brand px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span className="text-xs bg-gray-100 text-gray-500 font-mono px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3 mb-2 text-[11px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
            Personal Space
          </div>

          <button
            id="sidebar-tab-saved"
            onClick={() => {
              setActiveSidebarTab("saved");
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeSidebarTab === "saved"
                ? "bg-[#ff385c]/8 text-brand font-semibold"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className={`w-4 h-4 ${activeSidebarTab === "saved" ? "text-brand" : "text-gray-400"}`} />
              <span>Saved Jobs</span>
            </div>
            <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {savedJobIds.length}
            </span>
          </button>

          <button
            id="sidebar-tab-applications"
            onClick={() => {
              setActiveSidebarTab("applications");
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeSidebarTab === "applications"
                ? "bg-[#ff385c]/8 text-brand font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className={`w-4 h-4 ${activeSidebarTab === "applications" ? "text-brand" : "text-gray-400"}`} />
              <span>My Applications</span>
            </div>
            <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {applications.length}
            </span>
          </button>
        </nav>

        {/* Sign In & Account Controls matching screenshot footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold">
              SK
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-gray-900 block truncate">Saravanan Kumar</span>
              <span className="text-[10px] text-gray-500 block truncate">kumarsaravanan2005@gmail.com</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => triggerToast("Session synchronization is managed automatically.")}
              className="flex-1 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Sign out
            </button>
            <button
              onClick={() => setShowPostJobModal(true)}
              className="flex-1 py-2 text-xs font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition flex items-center justify-center gap-1.5 shadow-sm shadow-[#ff385c]/20"
            >
              <Plus className="w-3.5 h-3.5" />
              Post Job
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-gray-400 text-xs px-2">
            <span className="text-[10px] font-mono">UTC: 2026-06-09</span>
            <div className="flex gap-2">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-brand transition">𝕏</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand transition">in</a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-brand transition">👾</a>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Center-Right Panel Stage */}
      <main className="flex-1 flex flex-col bg-[#fafbfc] min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 bg-white/80 backdrop-filter backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {/* Hamburger helper for mobile support */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 hover:bg-gray-100 text-gray-600 rounded-lg md:hidden transition shrink-0"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 md:gap-2 text-xs font-medium text-gray-500 overflow-hidden">
              <span className="hover:text-gray-900 cursor-pointer hidden sm:inline">Atlas Intelligence</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:inline" />
              <span className="text-gray-900 capitalize font-semibold truncate">{activeSidebarTab} Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Live stats pill */}
            <div className="hidden sm:flex items-center gap-6 bg-gray-55 px-4 py-1.5 rounded-full border border-gray-100 text-xs font-mono text-gray-600">
              <div>
                <span className="text-gray-400">Total Jobs: </span>
                <span className="text-gray-900 font-semibold">{STATISTICS.totalJobs}</span>
              </div>
              <div className="h-3 w-px bg-gray-200"></div>
              <div>
                <span className="text-gray-400">Quarter Funding: </span>
                <span className="text-brand font-semibold">{STATISTICS.fundingThisQuarter}</span>
              </div>
            </div>

            <button
              onClick={() => triggerToast("Sync complete. Real-time index is fully operational.")}
              className="p-2 h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center transition"
              title="Refresh Index"
            >
              🔄
            </button>
          </div>
        </header>

        {/* Inner Content Area */}
        <div className="p-3 sm:p-6 max-w-7xl mx-auto w-full space-y-5 flex-1">
          {/* Modern Space-Reduced Hero Section matching Aditi's design */}
          {activeSidebarTab !== "discover" && (
            <>
              <div className="relative pt-2 pb-1">
                {/* Soft pink gradient glow mimicking screenshot mesh */}
                <div className="absolute right-0 top-0 h-48 w-48 sm:h-64 sm:w-64 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-rose-150/40 via-transparent to-transparent pointer-events-none rounded-full blur-2xl z-0"></div>
                
                <div className="space-y-1.5 relative z-10 text-left">
                  <h1 className="text-2xl sm:text-3.5xl lg:text-4.5xl font-display font-extrabold text-[#0F172A] tracking-tight leading-snug">
                    Discover <span className="text-brand">AI Careers</span> <br className="hidden sm:inline" />
                    Shaping the Future
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
                    The most comprehensive notice board on AI companies, research roles, and developer positions. Find actual opportunities at world-leading organizations; links redirect you straight to canonical company career sites.
                  </p>
                </div>
              </div>

              {/* New Optimized Search Bar with relative time filters option */}
              <section className="space-y-3 relative z-10">
                <div className="bg-white p-2 rounded-2xl border border-gray-105 shadow-3xs flex flex-col md:flex-row gap-2 relative">
                  <div className="flex-1 flex items-center gap-2 px-2">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search jobs by role title, company, stack, key skills..."
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSubmitSearch(textSearch);
                      }}
                      className="w-full py-1.5 bg-transparent text-xs sm:text-sm focus:outline-none placeholder-gray-400 font-medium text-gray-900 border-none outline-none ring-0 appearance-none"
                    />
                  </div>

                  {/* Precise Time Filters Indicator */}
                  <div className="flex items-center gap-2 px-2.5 py-1 sm:py-0 border-t sm:border-t-0 md:border-l border-gray-100">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500">Post Date:</span>
                    <select
                      value={timeFilter}
                      onChange={(e) => {
                        setTimeFilter(e.target.value as any);
                        triggerToast(`Time filter adjusted: ${e.target.value === "all" ? "All Postings" : e.target.value === "24h" ? "Last 24 Hours" : e.target.value === "7d" ? "Last 7 Days" : "Last 30 Days"}`);
                      }}
                      className="bg-transparent text-[10px] sm:text-xs font-bold text-brand focus:outline-none cursor-pointer border-none outline-none appearance-none"
                    >
                      <option value="all">All Days</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>

                  <div className="flex gap-1.5 shrink-0 justify-end">
                    {(textSearch || submitSearch || filterRemote !== "All" || filterExperience !== "All" || minSalarySlider > 0 || filterLocation !== "All" || timeFilter !== "all" || activeCategory !== "All") && (
                      <button
                        onClick={() => {
                          setTextSearch("");
                          setSubmitSearch("");
                          setFilterRemote("All");
                          setFilterExperience("All");
                          setMinSalarySlider(0);
                          setFilterLocation("All");
                          setTimeFilter("all");
                          setActiveCategory("All");
                          triggerToast("Filter parameters initialized to defaults.");
                        }}
                        className="px-3.5 py-2 text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
                      >
                        Reset
                      </button>
                    )}
                    <button
                      onClick={() => setSubmitSearch(textSearch)}
                      className="px-5 py-2 bg-brand text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-brand-hover tracking-wide transition shadow-sm shadow-[#ff385c]/10"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick sub-pill posting time triggers */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mr-1">Time posting:</span>
                  {[
                    { id: "all", label: "All Postings" },
                    { id: "24h", label: "Last 24 Hours" },
                    { id: "7d", label: "Last 7 Days" },
                    { id: "30d", label: "Last 30 Days" }
                  ].map((pill) => {
                    const isPillActive = timeFilter === pill.id;
                    return (
                      <button
                        key={pill.id}
                        onClick={() => {
                          setTimeFilter(pill.id as any);
                          triggerToast(`Filtered listings posted in ${pill.label}`);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-150 ${
                          isPillActive
                            ? "bg-[#ff385c]/8 text-brand border border-[#ff385c]/15"
                            : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                        }`}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Explore by Category direct filters mirroring screenshot */}
              <section className="space-y-2.5 relative z-10 pt-1">
                <div className="flex items-center justify-between border-b border-gray-100/50 pb-2">
                  <div>
                    <h2 className="text-xs sm:text-sm font-extrabold text-gray-950 uppercase tracking-wider font-display">Explore by Category</h2>
                    <p className="text-[9px] text-gray-400 font-medium">Click on any role sector to immediately focus listings</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveCategory("All");
                      triggerTXAndScrollToDirectory();
                    }}
                    className="text-[10px] text-brand hover:underline font-bold"
                  >
                    Clear Category Filter →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {[
                    { id: "AI Researchers", label: "AI Researchers", desc: "RLHF, alignment, mechanistic interpretability", icon: "🔬" },
                    { id: "Software Developers", label: "Software Developers", desc: "LLM agents, autocomplete compilers, frontend Tools", icon: "💻" },
                    { id: "AI Product Managers", label: "AI Product Managers", desc: "Interfaces, prompts, release delivery, strategy", icon: "🎯" },
                    { id: "AI Infrastructure", label: "AI Infrastructure", desc: "Compute clusters, LPUs, custom hardware grids", icon: "🌐" },
                    { id: "AI Security", label: "AI Security", desc: "Red teaming, guardrails, abuse monitoring, safety", icon: "🛡️" },
                    { id: "AI Voice & Media", label: "AI Voice & Media", desc: "Text-to-speech, sound wave, generative video, diffusion", icon: "🔊" }
                  ].map((cat) => {
                    const isCatActive = activeCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          triggerTXAndScrollToDirectory();
                        }}
                        className={`p-3 bg-white rounded-xl border relative flex flex-col justify-between hover:border-brand/40 hover:shadow-xs transition cursor-pointer select-none group ${
                          isCatActive 
                            ? "border-brand ring-1 ring-brand/25 bg-rose-50/5" 
                            : "border-gray-105"
                        }`}
                      >
                        <div>
                          <div className="w-8 h-8 rounded-lg bg-[#ff385c]/5 text-brand flex items-center justify-center text-sm font-bold border border-brand/10">
                            {cat.icon}
                          </div>
                          <h3 className="text-[11px] sm:text-xs font-bold text-gray-950 mt-2 leading-tight group-hover:text-brand transition">
                            {cat.label}
                          </h3>
                          <p className="text-[9px] text-gray-400 mt-1 block leading-normal line-clamp-2">
                            {cat.desc}
                          </p>
                        </div>
                        
                        <div className="flex justify-end mt-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] transition ${
                            isCatActive ? "bg-brand text-white border-brand" : "bg-rose-50/30 text-brand border-brand/10"
                          }`}>
                            →
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Trending AI Startups horizontal loop */}
              <section className="space-y-2.5 relative z-10 pt-1">
                <div className="flex items-center justify-between border-b border-gray-100/50 pb-2">
                  <div>
                    <h2 className="text-xs sm:text-sm font-extrabold text-gray-150 uppercase tracking-wider font-display">Trending AI Startups</h2>
                    <p className="text-[9px] text-gray-400 font-medium">Organized sequentially matching your provided layout specification</p>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono font-bold uppercase py-0.5 px-2 bg-rose-50 text-brand rounded">Hot Teams</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    { rank: 1, id: "openai", name: "OpenAI", field: "Foundation Models", loc: "SF, USA" },
                    { rank: 2, id: "anthropic", name: "Anthropic", field: "AI Safety Research", loc: "SF, USA" },
                    { rank: 3, id: "perplexity", name: "Perplexity", field: "AI Search Retrieval", loc: "SF, USA" },
                    { rank: 4, id: "cursor", name: "Cursor Editor", field: "AI Assist Coding", loc: "SF, USA" },
                    { rank: 5, id: "elevenlabs", name: "ElevenLabs", field: "Voice Synth & Audio", loc: "London, UK" }
                  ].map((startup) => (
                    <div
                      key={startup.id}
                      onClick={() => {
                        setTextSearch(startup.name);
                        setSubmitSearch(startup.name);
                        triggerTXAndScrollToDirectory();
                      }}
                      className="p-3 bg-white rounded-xl border border-gray-105 relative hover:border-brand/40 hover:shadow-2xs transition cursor-pointer group flex flex-col justify-between"
                    >
                      <span className="absolute top-2.5 right-2.5 text-[8px] sm:text-[9px] font-bold bg-brand text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                        {startup.rank}
                      </span>

                      <div className="space-y-2 pb-1">
                        <CompanyLogo companyId={startup.id} companyName={startup.name} className="w-9 h-9" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-950 group-hover:text-brand transition truncate">{startup.name}</h4>
                          <p className="text-[9px] text-gray-400 line-clamp-1 truncate">{startup.field}</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-50 pt-1.5 mt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] text-slate-500 font-bold leading-none">
                        <span className="bg-[#ff385c]/5 text-[#ff385c] px-1.5 py-0.5 rounded-sm">Hiring</span>
                        <span className="text-gray-400 select-none">{startup.loc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Companies Grid with custom stats */}
              <section className="space-y-2.5 relative z-10 pt-1">
                <div className="flex items-center justify-between border-b border-gray-100/50 pb-2">
                  <div>
                    <h2 className="text-xs sm:text-sm font-extrabold text-gray-150 uppercase tracking-wider font-display">Featured Enterprises</h2>
                    <p className="text-[9px] text-gray-400 font-medium">Pinnacle organizations supporting advanced neural computation</p>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono">Indices Verified</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { id: "openai", name: "OpenAI", hq: "San Francisco, CA", raised: "$17.8B", founded: 2015 },
                    { id: "databricks", name: "Databricks", hq: "San Francisco, CA", raised: "$6.2B", founded: 2013 },
                    { id: "scale", name: "Scale AI", hq: "San Francisco, CA", raised: "$1.6B", founded: 2016 },
                    { id: "midjourney", name: "Midjourney", hq: "San Francisco, CA", raised: "$200M", founded: 2022 }
                  ].map((co) => (
                    <div
                      key={co.id}
                      onClick={() => {
                        setTextSearch(co.name);
                        setSubmitSearch(co.name);
                        triggerTXAndScrollToDirectory();
                      }}
                      className="p-3 bg-white rounded-xl border border-gray-105 hover:border-brand/40 hover:shadow-2xs transition cursor-pointer relative overflow-hidden group flex flex-col justify-between h-28"
                    >
                      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-brand/5 via-transparent to-transparent pointer-events-none"></div>

                      <div className="flex items-start gap-2 relative z-10">
                        <CompanyLogo companyId={co.id} companyName={co.name} className="w-9 h-9" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-gray-950 group-hover:text-brand transition truncate">{co.name}</h4>
                          <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5 truncate leading-none">{co.hq}</p>
                          <span className="inline-block mt-1 text-[8px] bg-slate-50 text-slate-500 font-mono font-bold px-1.5 py-0.5 rounded leading-none">
                            Active Index
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1 border-t border-gray-50 pt-1.5 text-[9px] relative z-10 bg-white/95 mt-1.5">
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase font-semibold leading-none">Capital Raised</span>
                          <span className="text-gray-950 font-bold font-mono leading-none">{co.raised}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase font-semibold leading-none">Founded Year</span>
                          <span className="text-gray-950 font-bold font-mono leading-none">{co.founded}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Toast Notification display */}
          <AnimatePresence>
            {feedbackToast && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 fixed bottom-6 right-6 border border-gray-800"
              >
                <div className="bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none">
                  ✓
                </div>
                <p className="text-xs font-semibold leading-tight">{feedbackToast}</p>
                <button 
                  onClick={() => setFeedbackToast(null)} 
                  className="text-gray-400 hover:text-white ml-2 text-sm focus:outline-none"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple scroll trigger anchor node */}
          <div id="job-board-directory-anchor"></div>

          {/* 3. CORE ROUTER WORKSPACE (DYNAMIC BASED ON SIDEBAR SELECTION) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT / PRIMARY GRID PORTION */}
            <div className={`col-span-1 lg:col-span-12 ${((activeSidebarTab === "jobs" || activeSidebarTab === "saved") && selectedJob) ? "lg:col-span-7" : ""} space-y-6`}>
              
              {/* JOBS TAB AND DIRECTORY */}
              {activeSidebarTab === "jobs" && (
                <div className="space-y-6">
                  {/* Detailed Filters row inside directory */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4.5 h-4.5 text-brand" />
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Advanced Directory Modulations</h3>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Matching results: <b>{filteredJobs.length} listed</b></span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Filter 1: Remote Tier */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Remote Model</label>
                        <select
                          value={filterRemote}
                          onChange={(e) => setFilterRemote(e.target.value as any)}
                          className="w-full bg-gray-50 text-xs font-semibold text-gray-700 px-3 py-2 rounded-xl focus:outline-none border border-transparent hover:border-gray-200 transition"
                        >
                          <option value="All">All Formats</option>
                          <option value="Remote">100% Remote</option>
                          <option value="Hybrid">Hybrid Office</option>
                          <option value="On-site">On-site Campus</option>
                        </select>
                      </div>

                      {/* Filter 2: Experience Tier */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Experience Requirement</label>
                        <select
                          value={filterExperience}
                          onChange={(e) => setFilterExperience(e.target.value as any)}
                          className="w-full bg-gray-50 text-xs font-semibold text-gray-700 px-3 py-2 rounded-xl focus:outline-none border border-transparent hover:border-gray-200 transition"
                        >
                          <option value="All">All Years</option>
                          <option value="Junior">Junior (0 - 2 yrs)</option>
                          <option value="Mid">Mid Level (3 - 5 yrs)</option>
                          <option value="Senior">Senior Lead (6+ yrs)</option>
                        </select>
                      </div>

                      {/* Filter 3: Quick Region Select */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Global Region</label>
                        <select
                          value={filterLocation}
                          onChange={(e) => setFilterLocation(e.target.value)}
                          className="w-full bg-gray-50 text-xs font-semibold text-gray-700 px-3 py-2 rounded-xl focus:outline-none border border-transparent hover:border-gray-200 transition"
                        >
                          <option value="All">Global Locations</option>
                          <option value="San_Francisco">San Francisco Bay Area</option>
                          <option value="London">London Metropolitan</option>
                          <option value="Europe">Europe Continental</option>
                          <option value="Remote_Jobs">Remote Distribution Only</option>
                        </select>
                      </div>

                      {/* Filter 4: Minimum Salary Filter */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Alt Minimum Salary</label>
                          <span className="text-[11px] font-mono text-brand font-bold">{minSalarySlider > 0 ? formatCurrencyINR(minSalarySlider) : "Any"}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={25000000}
                          step={1000000}
                          value={minSalarySlider}
                          onChange={(e) => setMinSalarySlider(Number(e.target.value))}
                          className="w-full accent-brand lg:mt-3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Listings matching filters with dynamic presentation modalities */}
                  <div className="space-y-6">
                    {filteredJobs.length === 0 ? (
                      <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl space-y-4 mt-4">
                        <div className="text-4xl text-gray-300">🕵️‍♀️</div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">No Match Found in Active Index</h3>
                          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                            No careers correspond to your chosen search or boundaries. Try modifying sliders or search parameters!
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setTextSearch("");
                            setSubmitSearch("");
                            setFilterRemote("All");
                            setFilterExperience("All");
                            setMinSalarySlider(0);
                            setFilterLocation("All");
                          }}
                          className="px-4 py-2 bg-brand/10 text-brand rounded-xl text-xs font-semibold hover:bg-brand/15 transition"
                        >
                          Reset filters to base
                        </button>
                      </div>
                    ) : (
                      filteredJobs.map((job) => {
                        const isJobSelected = selectedJob?.id === job.id;
                        const isJobSaved = savedJobIds.includes(job.id);
                        return (
                          <div
                            key={job.id}
                            id={`job-card-${job.id}`}
                            onClick={() => setSelectedJob(job)}
                            className={`p-6 bg-white rounded-2xl border transition-all duration-300 cursor-pointer relative group flex flex-col sm:flex-row items-start justify-between gap-4 ${
                              isJobSelected
                                ? "border-[#ff385c]/30 shadow-md ring-1 ring-[#ff385c]/25 bg-rose-50/5"
                                : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                            }`}
                          >
                            {/* Left part: logo & header specs */}
                            <div className="flex gap-4 items-start">
                              <CompanyLogo companyId={job.companyId} companyName={job.companyName} className="w-13 h-13 shrink-0 group-hover:scale-105 transition" />
                              <div className="space-y-1.5">
                                <div className="flex items-center flex-wrap gap-2">
                                  <span 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const mappedComp = SEED_COMPANIES.find(c => c.id === job.companyId);
                                      if (mappedComp) setSelectedCompany(mappedComp);
                                    }}
                                    className="text-xs text-slate-500 font-bold hover:text-brand tracking-wide hover:underline cursor-pointer"
                                  >
                                    {job.companyName}
                                  </span>
                                  {job.isFeatured && (
                                    <span className="bg-[#ff385c]/8 text-brand text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded tracking-wide">
                                      High Funding
                                    </span>
                                  )}
                                  <span className="text-[10px] font-mono text-gray-400">
                                    {job.department}
                                  </span>
                                </div>

                                <h2 className="text-base font-bold text-gray-900 leading-tight group-hover:text-brand transition">
                                  {job.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-medium text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    {job.remote}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span className="font-mono font-semibold text-gray-700">{job.salaryString}</span>
                                  </span>
                                </div>

                                {/* Experience tags */}
                                <div className="flex flex-wrap gap-1 pt-1.5">
                                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    {job.experienceRequired}+ Yrs Exp ({job.experienceTier})
                                  </span>
                                  {job.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-100">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right part: Action controls */}
                            <div className="w-full sm:w-auto flex sm:flex-col justify-between items-end gap-3 shrink-0 self-stretch sm:self-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                              <span className="text-[10px] font-mono text-gray-400 self-center sm:self-auto uppercase tracking-wider">
                                Posted {job.postedAt}
                              </span>

                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                  id={`job-save-btn-${job.id}`}
                                  onClick={(e) => toggleSaveJob(job.id, e)}
                                  className={`p-2.5 rounded-xl border transition ${
                                    isJobSaved
                                      ? "bg-[#ff385c]/10 border-[#ff385c]/20 text-brand"
                                      : "bg-white border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300"
                                  }`}
                                  title={isJobSaved ? "Unsave career Listing" : "Save career Listing"}
                                >
                                  <Bookmark className="w-4 h-4 fill-current text-current" />
                                </button>
                                <button
                                  id={`job-quick-apply-${job.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowApplyModal(job);
                                  }}
                                  className="flex-1 sm:flex-none px-4 py-2.5 bg-brand text-white text-xs font-semibold rounded-xl hover:bg-brand-hover tracking-wider transition shadow-sm"
                                >
                                  Instant Setup
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* SAVED BOOKMARKS HUB */}
              {activeSidebarTab === "saved" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                      <Bookmark className="w-5 h-5 text-brand" />
                      Saved Opportunities Index
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      You have bookmarked these {savedAndFilteredJobs.length} roles to review. Toggle bookmark elements to sync.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {savedAndFilteredJobs.length === 0 ? (
                      <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl space-y-3">
                        <div className="text-4xl text-gray-300">🔖</div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">No Saved Bookmarks Detected</h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Save jobs from the main directory list by tapping their bookmark icons.
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveSidebarTab("jobs")}
                          className="px-4 py-2 bg-brand text-white text-xs font-semibold rounded-xl hover:bg-brand-hover transition"
                        >
                          Explore Jobs Directory
                        </button>
                      </div>
                    ) : (
                      savedAndFilteredJobs.map((job) => {
                        const isJobSelected = selectedJob?.id === job.id;
                        return (
                          <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className={`p-5 bg-white rounded-2xl border cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-4 transition ${
                              isJobSelected
                                ? "border-[#ff385c]/30 shadow-md bg-rose-50/5"
                                : "border-gray-100 hover:border-gray-200"
                            }`}
                          >
                            <div className="flex gap-4">
                              <CompanyLogo companyId={job.companyId} companyName={job.companyName} className="w-12 h-12 shrink-0" />
                              <div className="space-y-1">
                                <span className="text-xs text-gray-400 font-semibold uppercase">{job.companyName}</span>
                                <h3 className="text-base font-bold text-gray-900 leading-tight">{job.title}</h3>
                                <p className="text-xs text-gray-500 font-mono font-semibold">{job.salaryString} • {job.location}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                              <button
                                onClick={(e) => toggleSaveJob(job.id, e)}
                                className="p-2 bg-rose-50 text-brand rounded-lg border border-[#ff385c]/10 text-xs hover:bg-red-50 transition"
                              >
                                Remove
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowApplyModal(job);
                                }}
                                className="px-3.5 py-2 bg-brand text-white text-xs font-semibold rounded-lg hover:bg-brand-hover transition"
                              >
                                Instant Apply
                              </button>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

              {activeSidebarTab === "applications" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Job Application Trackers
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Monitor and supervise active submissions, interviews, and offers in one comprehensive, automated workspace.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {applications.length === 0 ? (
                      <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl space-y-3">
                        <div className="text-4xl text-gray-300">📬</div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">No Applications Made Yet</h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Once you apply to roles, your submissions appear here automatically.
                          </p>
                        </div>
                      </div>
                    ) : (
                      applications.map((app) => (
                        <div key={app.id} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition space-y-4 text-left">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex gap-4">
                              <CompanyLogo companyId={app.companyId || "openai"} companyName={app.companyName} className="w-12 h-12 shrink-0" />
                              <div className="space-y-1">
                                <span className="text-xs text-slate-500 font-bold">{app.companyName}</span>
                                <h3 className="text-base font-bold text-slate-900 leading-tight">{app.jobTitle}</h3>
                                <p className="text-xs text-gray-400 font-mono">
                                  Applied on {new Date(app.appliedAt).toLocaleDateString()} at {new Date(app.appliedAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                                app.status === "Applied"
                                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                                  : app.status === "Interviewing"
                                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                                  : app.status === "Offered"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : "bg-red-50 text-red-600 border border-red-100"
                              }`}>
                                ● {app.status}
                              </span>
                            </div>
                          </div>

                          {/* Quick specs breakdown */}
                          <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-gray-400 font-medium">Applicant Email:</span>
                              <span className="text-gray-800 font-bold font-mono">{app.applicantEmail}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-gray-400 font-medium">Resume File:</span>
                              <span className="text-brand font-bold flex items-center gap-1">
                                <FileText className="w-3.5 h-3.5" />
                                {app.resumeText}
                              </span>
                            </div>
                            {app.portfolioUrl && (
                              <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium">GitHub/Portfolio URL:</span>
                                <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-500 font-medium hover:underline flex items-center gap-1">
                                  {app.portfolioUrl}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                            {app.coverLetter && (
                              <div className="space-y-1 pt-1 border-b border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium block">Cover Letter Brief:</span>
                                <p className="text-gray-600 bg-white p-2.5 rounded border border-gray-100 italic leading-relaxed text-[11px]">
                                  "{app.coverLetter}"
                                </p>
                              </div>
                            )}

                            {/* DYNAMIC PIPELINE JOURNEY (CTA ADVANCED STEPS) */}
                            <div className="pt-3 space-y-3">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-mono">Verified Recruitment Pipeline Progress</span>
                              
                              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                                {/* Stage 1: Document Upload */}
                                <div className="relative flex items-start gap-3">
                                  <span className="absolute -left-[23px] top-0.5 w-[14px] h-[14px] bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center"></span>
                                  <div>
                                    <h4 className="font-semibold text-gray-800">Stage 1: Credentials Registered</h4>
                                    <p className="text-[10px] text-gray-400">PDF Document successfully indexed in local storage sandbox.</p>
                                  </div>
                                </div>

                                {/* Stage 2: AI Compatibility parsing score */}
                                <div className="relative flex items-start gap-3">
                                  <span className="absolute -left-[23px] top-0.5 w-[14px] h-[14px] bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center"></span>
                                  <div>
                                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                      <span>Stage 2: AI Compatibility Coefficient evaluated</span>
                                      <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.2 text-[9px] font-bold rounded">94% MATCH</span>
                                    </h4>
                                    <p className="text-[10px] text-gray-400">Core metrics align with the stated job descriptions.</p>
                                  </div>
                                </div>

                                {/* Stage 3: Chatbot Screening Interview */}
                                <div className="relative flex items-start gap-3">
                                  <span className={`absolute -left-[23px] top-0.5 w-[14px] h-[14px] rounded-full border-4 border-white flex items-center justify-center ${
                                    app.status !== "Applied" ? "bg-emerald-500" : "bg-brand animate-ping"
                                  }`}></span>
                                  <div className="space-y-1.5 w-full">
                                    <h4 className="font-semibold text-gray-800">Stage 3: Cognitive Pre-screening Chatbot</h4>
                                    {app.status === "Applied" ? (
                                      <div className="bg-[#ff385c]/5 p-3 rounded-xl border border-[#ff385c]/10 space-y-2">
                                        <p className="text-[10px] text-gray-500">Your screening evaluation is currently pending. Participate in a quick conversational chat with our recruitment model to advance.</p>
                                        <button
                                          type="button"
                                          onClick={() => startRecruiterInterviewChat(app.id, app.jobTitle, app.companyName)}
                                          className="px-3.5 py-2 bg-brand text-white text-[11px] font-bold rounded-lg hover:bg-brand-hover transition flex items-center gap-1 shadow-sm font-sans"
                                        >
                                          <span>💬 Conduct 10-Sec Pre-Screening Interview</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <p className="text-[10px] text-emerald-600 font-semibold">✓ Pre-screening transcript graded with elite performance (94% Compatibility coefficient).</p>
                                    )}
                                  </div>
                                </div>

                                {/* Stage 4: Unit Test Coding assessment Sandbox */}
                                <div className="relative flex items-start gap-3">
                                  <span className={`absolute -left-[23px] top-0.5 w-[14px] h-[14px] rounded-full border-4 border-white flex items-center justify-center ${
                                    app.status === "Offered" ? "bg-emerald-500" : app.status === "Interviewing" ? "bg-amber-400 animate-pulse" : "bg-slate-300"
                                  }`}></span>
                                  <div className="space-y-1.5 w-full">
                                    <h4 className="font-semibold text-gray-800">Stage 4: Algorithmic Coding Challenge Sandbox</h4>
                                    {app.status === "Applied" ? (
                                      <p className="text-[10px] text-gray-400 italic">🔒 Completed Stage 3 screening first to unlock coding playground.</p>
                                    ) : app.status === "Interviewing" ? (
                                      <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/50 space-y-2">
                                        <p className="text-[10px] text-slate-500">Run our compiled regression test matrix of the alignment functions to prove your software stack craftsmanship.</p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setActiveSandboxAppId(app.id);
                                            setSandboxSuccess(false);
                                            setSandboxConsole([]);
                                          }}
                                          className="px-3.5 py-2 bg-amber-500 text-white text-[11px] font-bold rounded-lg hover:bg-amber-600 transition flex items-center gap-1 shadow-sm font-sans"
                                        >
                                          <span>🧠 Launch Interactive Sandbox Challenge</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <p className="text-[10px] text-emerald-600 font-semibold">✓ Systems validated. 3 of 3 unit tests compilation passed successfully.</p>
                                    )}
                                  </div>
                                </div>

                                {/* Stage 5: Strategic Partner Review & Contract */}
                                <div className="relative flex items-start gap-3">
                                  <span className={`absolute -left-[23px] top-0.5 w-[14px] h-[14px] rounded-full border-4 border-white flex items-center justify-center ${
                                    app.status === "Offered" ? "bg-emerald-500" : "bg-slate-200"
                                  }`}></span>
                                  <div className="w-full">
                                    <h4 className="font-semibold text-gray-800">Stage 5: Strategic Partner Review & Sealed Offer</h4>
                                    {app.status === "Offered" ? (
                                      <div className="mt-2 bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center space-y-3 text-xs">
                                        <div className="text-2xl">🎉</div>
                                        <div>
                                          <h5 className="font-bold text-gray-900">Employment Contract Generation Released!</h5>
                                          <p className="text-[10px] text-gray-400 mt-0.5">The hiring board at {app.companyName} has issued your official sealed offer.</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl shadow-sm border border-emerald-100/50 text-left space-y-2 text-[11px] text-gray-600">
                                          <div className="flex justify-between">
                                            <span>Standard Base Salary:</span>
                                            <span className="font-bold text-gray-800 font-mono">₹1.48 Crores / Yr</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Signing Bonus Option:</span>
                                            <span className="font-bold text-gray-800 font-mono">₹25 Lakhs upfront</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Startup Equity Grant:</span>
                                            <span className="font-bold text-gray-800 font-mono">0.12% Stock Options</span>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => triggerToast(`Offer aligned and signed successfully! Welcome to the premium elite team of ${app.companyName}.`)}
                                          className="w-full py-2 bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 rounded-lg transition font-sans"
                                        >
                                          ✓ Virtually Align & Sign This Contract
                                        </button>
                                      </div>
                                    ) : (
                                      <p className="text-[10px] text-gray-400 italic">🔒 Locked until all interview milestones are completely validated.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* DISCOVER HUB / PULSE NEWS */}
              {activeSidebarTab === "discover" && (
                <div className="space-y-6">
                  {/* Majestic Rich Intro Hero Card replicating user's dashboard image precisely */}
                  <div className="rounded-3xl bg-[#09090b] text-white overflow-hidden border border-zinc-900 shadow-2xl relative select-none">
                    {/* Elegant technical grid line matrix overlay background to match screenshot */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80 z-0"></div>
                    
                    {/* Soft red gradient glow mimicking screenshot mesh exactly */}
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[350px] w-[350px] bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl z-0"></div>
                    
                    <div className="p-6 sm:p-8 lg:p-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Left Part: Title & Details & Dynamic Search */}
                      <div className="lg:col-span-8 space-y-6 text-left">
                        {/* Live active status pill */}
                        <div className="inline-flex items-center gap-2 bg-[#ff385c]/10 border border-[#ff385c]/20 text-[#ff385c] px-3.5 py-1 rounded-full text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] animate-pulse"></span>
                          <span>LIVE • 12,418 OPEN ROLES UPDATED NOW</span>
                        </div>
                        
                        {/* Beautiful Display Typography Headings */}
                        <div className="space-y-1.5">
                          <h1 className="text-3xl sm:text-4.5xl lg:text-5xl font-display font-black text-white tracking-tight leading-none">
                            The intelligence layer <br className="hidden sm:inline" />
                            for the <span className="text-[#ff385c] inline-block relative bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">AI ecosystem</span>
                          </h1>
                        </div>
                        
                        {/* Interactive Premium Search block */}
                        <div className="bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl shadow-xl shadow-black/80">
                          <div className="flex-1 flex items-center gap-2.5 px-3 w-full">
                            <Search className="w-4.5 h-4.5 text-zinc-500 shrink-0" />
                            <input
                              type="text"
                              placeholder="Search startups, founders, investors, jobs..."
                              value={textSearch}
                              onChange={(e) => setTextSearch(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  setSubmitSearch(textSearch);
                                  triggerTXAndScrollToDirectory();
                                }
                              }}
                              className="w-full py-2 bg-transparent text-sm focus:outline-none placeholder-zinc-500 text-white font-medium border-none outline-none ring-0 select-text"
                            />
                          </div>
                          
                          {/* Worldwide Indicator and Divider */}
                          <div className="h-6 w-px bg-zinc-800 hidden sm:block"></div>
                          <div className="flex items-center gap-2 px-3 shrink-0 text-zinc-400 text-xs font-semibold hidden sm:flex">
                            <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                            <span>Worldwide</span>
                          </div>
                          
                          {/* Search Button styled precisely in crimson color */}
                          <button
                            onClick={() => {
                              setSubmitSearch(textSearch);
                              triggerTXAndScrollToDirectory();
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#ff385c] hover:bg-[#e02e50] text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md shrink-0 active:scale-95"
                          >
                            Search
                          </button>
                        </div>
                        
                        {/* Sub-pills triggers */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {[
                            { label: "Job seekers", icon: "💼" },
                            { label: "Founders", icon: "👥" },
                            { label: "Investors", icon: "✨" },
                            { label: "Recruiters", icon: "🤝" },
                            { label: "Researchers", icon: "🔬" }
                          ].map((pill) => (
                            <button
                              key={pill.label}
                              onClick={() => {
                                if (pill.label === "Job seekers") {
                                  setActiveSidebarTab("jobs");
                                } else if (pill.label === "Researchers") {
                                  setActiveSidebarTab("jobs");
                                  setActiveCategory("AI Researchers");
                                  triggerToast("Filtered to highlight custom Research roles.");
                                } else if (pill.label === "Founders") {
                                  setActiveSidebarTab("founders");
                                } else if (pill.label === "Investors") {
                                  setActiveSidebarTab("funding");
                                } else {
                                  triggerToast(`Active Directory filtered for: ${pill.label}`);
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-xs text-zinc-300 hover:text-white transition-all duration-150 flex items-center gap-1.5 font-semibold"
                            >
                              <span>{pill.icon}</span>
                              <span className="text-[11px]">{pill.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        {/* Description label of global connect */}
                        <p className="text-[11px] md:text-sm text-zinc-500 font-medium leading-relaxed font-sans">
                          25,000+ startups · 100,000+ founders · 8,400+ investors — all connected in one seamless live knowledge graph.
                        </p>
                      </div>
                      
                      {/* Right Part: Column matching "Just Posted" */}
                      <div className="lg:col-span-4 bg-zinc-950/60 p-4 rounded-3xl border border-zinc-900 space-y-4 relative overflow-hidden backdrop-blur-xs">
                        <div className="flex items-center justify-between border-b border-zinc-905 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[#ff385c] text-xs">✨</span>
                            <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Just posted</h2>
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] animate-pulse"></span>
                        </div>
                        
                        <div className="space-y-2.5">
                          {[
                            { companyId: "anthropic", companyName: "Anthropic", title: "Research Engineer, Alignment", tag: "AI Safety", pay: "$240k–$340k" },
                            { companyId: "openai", companyName: "OpenAI", title: "Staff ML Engineer", tag: "Infrastructure", pay: "$280k–$380k" },
                            { companyId: "xai", companyName: "xAI", title: "Senior AI Research Engineer", tag: "Language Models", pay: "$260k–$360k" },
                          ].map((jp, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setTextSearch(jp.companyName);
                                setSubmitSearch(jp.companyName);
                                setActiveSidebarTab("jobs");
                                if (jp.title.includes("Research")) {
                                  setActiveCategory("AI Researchers");
                                } else {
                                  setActiveCategory("AI Infrastructure");
                                }
                                triggerToast(`Focused listings for ${jp.companyName}`);
                              }}
                              className="p-3.5 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900/60 hover:border-zinc-800 transition duration-150 cursor-pointer flex items-center justify-between gap-3 text-left group"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <CompanyLogo companyId={jp.companyId} companyName={jp.companyName} className="w-8.5 h-8.5 shrink-0 rounded-xl bg-zinc-950 border border-zinc-800/40 p-1" />
                                <div className="overflow-hidden">
                                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block leading-none">{jp.companyName}</span>
                                  <h4 className="text-[11px] font-bold text-zinc-200 mt-1 leading-snug group-hover:text-[#ff385c] transition duration-150 truncate">{jp.title}</h4>
                                  <span className="inline-block mt-1 text-[8px] bg-red-500/10 text-[#ff385c] px-2 py-0.5 rounded-md font-bold tracking-wide">
                                    {jp.tag}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right shrink-0">
                                <span className="text-[10px] font-mono font-bold text-emerald-400 block">{jp.pay}</span>
                                <span className="text-[8px] text-zinc-600 block mt-0.5 font-medium leading-none">Instant apply</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* Metrics bottom row */}
                    <div className="border-t border-zinc-900 bg-zinc-950/80 px-6 py-4 sm:px-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-left relative z-10">
                      {[
                        { label: "AI startups tracked", value: "25,000+" },
                        { label: "Founder profiles", value: "100k+" },
                        { label: "Active investors", value: "8,400+" },
                        { label: "Open roles", value: "12,418" },
                        { label: "Funding tracked (2026)", value: "$48.2B" }
                      ].map((col, idx) => (
                        <div key={idx} className={`space-y-0.5 ${idx !== 0 ? "md:border-l md:border-zinc-850 md:pl-5" : ""}`}>
                          <span className="text-xl sm:text-2xl font-extrabold text-white block tracking-tight font-display">{col.value}</span>
                          <span className="text-[9px] text-zinc-500 uppercase font-semibold tracking-wider block">{col.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore Roles by Category direct filters on the hub page */}
                  <section className="space-y-3.5 relative z-10 pt-1 text-left">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div>
                        <h2 className="text-xs sm:text-sm font-extrabold text-gray-950 uppercase tracking-wider font-display">Explore Roles by Category</h2>
                        <p className="text-[9px] text-gray-400 font-medium">Click on any role sector to immediately focus listings in the active index</p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveCategory("All");
                          setActiveSidebarTab("jobs");
                          triggerToast("Category filter cleared. Showing all opportunities.");
                        }}
                        className="text-[10px] text-brand hover:underline font-bold"
                      >
                        Clear Category Filter →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                      {[
                        { id: "AI Researchers", label: "AI Researchers", desc: "RLHF, alignment, mechanistic interpretability", icon: "🔬" },
                        { id: "Software Developers", label: "Software Developers", desc: "LLM agents, autocomplete compilers, frontend Tools", icon: "💻" },
                        { id: "AI Product Managers", label: "AI Product Managers", desc: "Interfaces, prompts, release delivery, strategy", icon: "🎯" },
                        { id: "AI Infrastructure", label: "AI Infrastructure", desc: "Compute clusters, LPUs, custom hardware grids", icon: "🌐" },
                        { id: "AI Security", label: "AI Security", desc: "Red teaming, guardrails, abuse monitoring, safety", icon: "🛡️" },
                        { id: "AI Voice & Media", label: "AI Voice & Media", desc: "Text-to-speech, sound wave, generative video, diffusion", icon: "🔊" }
                      ].map((cat) => {
                        const isCatActive = activeCategory === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => {
                              setActiveCategory(cat.id);
                              setActiveSidebarTab("jobs");
                              triggerToast(`Navigated to active listings matching matches: ${cat.label}`);
                            }}
                            className={`p-3 bg-white rounded-xl border relative flex flex-col justify-between hover:border-brand/40 hover:shadow-2xs transition cursor-pointer select-none group ${
                              isCatActive 
                                ? "border-brand ring-1 ring-brand/25 bg-rose-50/5" 
                                : "border-gray-105"
                            }`}
                          >
                            <div>
                              <div className="w-8 h-8 rounded-lg bg-[#ff385c]/5 text-[#ff385c] flex items-center justify-center text-sm font-bold border border-brand/10">
                                {cat.icon}
                              </div>
                              <h3 className="text-[11px] sm:text-xs font-bold text-gray-950 mt-2 leading-tight group-hover:text-brand transition">
                                {cat.label}
                              </h3>
                              <p className="text-[9px] text-gray-400 mt-1 block leading-normal line-clamp-2">
                                {cat.desc}
                              </p>
                            </div>
                            
                            <div className="flex justify-end mt-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] transition ${
                                isCatActive ? "bg-brand text-white border-brand" : "bg-rose-50/30 text-brand border-brand/10"
                              }`}>
                                →
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  
                  {/* Horizontal Category Cards representing categories beautifully */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                    {[
                      { label: "Startups", count: "25,000+", icon: "🚀", tab: "startups", desc: "Foundational builder profiles" },
                      { label: "Founders", count: "100,000+", icon: "👥", tab: "founders", desc: "Expert technical alignment rosters" },
                      { label: "Investors", count: "8,400+", icon: "💵", tab: "funding", desc: "Venture partner indices" },
                      { label: "Products", count: "42,000+", icon: "📦", tab: "discover", desc: "Shipped software products" },
                      { label: "Funding rounds", count: "18,600+", icon: "📊", tab: "funding", desc: "Aggregated financial indices" }
                    ].map((cat, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setActiveSidebarTab(cat.tab);
                          triggerToast(`Navigated to the ${cat.label} workspace index.`);
                        }}
                        className="py-3 px-4 bg-white rounded-2xl border border-gray-105 hover:border-brand/35 hover:shadow-2xs transition duration-150 cursor-pointer text-left flex items-center gap-3 group relative overflow-hidden"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#ff385c]/5 text-brand flex items-center justify-center text-lg font-bold border border-brand/5">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-900 group-hover:text-brand transition tracking-tight leading-none">
                            {cat.label}
                          </h3>
                          <span className="text-[10px] text-gray-400 font-bold block mt-1">{cat.count}</span>
                          <span className="text-[8px] text-gray-400 block mt-0.5 leading-none font-medium truncate max-w-[100px]">{cat.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Pulse Column */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Section: AI Pulse list */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-brand" />
                          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">AI Pulse Loop</h2>
                        </div>
                        <span className="text-[10px] bg-red-50 text-brand px-2 py-0.5 rounded font-mono font-bold">LIVE UPDATE</span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { time: "2h ago", title: "OpenAI launches GPT-4.5 with advanced RL reasoning capabilities", comments: 128 },
                          { time: "4h ago", title: "Anthropic releases Claude Enterprise for deep organizational memory", comments: 96 },
                          { time: "6h ago", title: "Perplexity raises $250M Series C at $2.5B valuation", comments: 74 },
                          { time: "8h ago", title: "Cursor reaches 2M developers and ships direct agent edits", comments: 64 },
                          { time: "10h ago", title: "Mistral AI expands local weights and launches Codestral EMEA", comments: 52 }
                        ].map((pulse, idx) => (
                          <div key={idx} className="p-3.5 hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-100 space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-gray-400">
                              <span>{pulse.time} • PRODUCT LAUNCH</span>
                              <span className="flex items-center gap-1 font-semibold">💬 {pulse.comments} reviews</span>
                            </div>
                            <h4 className="text-xs font-bold text-gray-800 leading-snug line-clamp-2">
                              {pulse.title}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Section: Trending discussions */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-brand" />
                          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Trending Discussions</h2>
                        </div>
                        <span className="text-xs text-gray-400 hover:underline hover:text-gray-900 cursor-pointer">View all →</span>
                      </div>

                      <div className="space-y-4">
                        {[
                          { votes: 342, title: "Why AI engineering roles are growing faster than classic software SaaS roles", author: "sarah_lee" },
                          { votes: 215, title: "Can agents fully replace traditional codebase review systems by 2027?", author: "indie_hacker" },
                          { votes: 189, title: "The GPU neural architecture race centering low-latency search layers", author: "venture_view" },
                          { votes: 164, title: "Open weights alignment methodologies vs deep corporate custom boundaries", author: "ai_researcher" }
                        ].map((disc, idx) => (
                          <div key={idx} className="flex gap-3 items-start p-3.5 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-100">
                            <div className="bg-white px-2 py-1 rounded-lg border border-gray-100 text-center shrink-0">
                              <span className="text-brand text-[10px] font-bold block">▲</span>
                              <span className="text-xs font-bold text-gray-800 tracking-tighter block">{disc.votes}</span>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-gray-800 leading-relaxed leading-normal">
                                {disc.title}
                              </h4>
                              <p className="text-[10px] text-gray-400">posted by <span className="font-semibold text-brand">@{disc.author}</span> • today</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured AI Startups Slider panel */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-brand" />
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Featured AI Builders</h2>
                      </div>
                      <span className="text-xs text-[#ff385c] font-semibold hover:underline cursor-pointer">View all startups ({SEED_COMPANIES.length}) →</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {SEED_COMPANIES.map((company) => (
                        <div
                          key={company.id}
                          onClick={() => setSelectedCompany(company)}
                          className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-[#ff385c]/30 hover:shadow-md transition duration-300 cursor-pointer text-left space-y-4 group flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-display text-2xl group-hover:scale-105 transition duration-200 shadow-sm">
                                {company.logo}
                              </div>
                              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                {company.category}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-base font-bold text-gray-900 flex items-center gap-1 group-hover:text-brand transition">
                                {company.name}
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                              </h4>
                              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                {company.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-1 pt-3 border-t border-gray-50 text-[10px] font-medium text-gray-500">
                            <div className="space-y-0.5">
                              <span className="text-gray-400 block uppercase font-bold tracking-wider">Funding</span>
                              <span className="text-gray-800 font-bold font-mono">{company.funding}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-gray-400 block uppercase font-bold tracking-wider">Founded</span>
                              <span className="text-gray-800 font-bold font-mono">{company.founded}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-gray-400 block uppercase font-bold tracking-wider">HQ</span>
                              <span className="text-gray-800 font-bold block truncate">{company.hq.split(",")[0]}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STARTUPS TAB VIEW */}
              {activeSidebarTab === "startups" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#ff385c]" />
                      Verified AI Ecosystem Organizations
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Explore detailed architectural information, funding, products, and tech stacks for top AI projects.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SEED_COMPANIES.map((company) => {
                      const compJobs = jobs.filter(j => j.companyId === company.id);
                      return (
                        <div
                          key={company.id}
                          className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 hover:shadow-md transition"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-3">
                              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center font-display text-3xl">
                                {company.logo}
                              </div>
                              <div className="space-y-0.5">
                                <h3 className="text-lg font-bold text-slate-900 hover:text-brand cursor-pointer" onClick={() => setSelectedCompany(company)}>{company.name}</h3>
                                <span className="bg-red-50 text-[#ff385c] text-[10px] font-bold uppercase py-0.5 px-2 rounded-full font-mono">
                                  {company.category}
                                </span>
                              </div>
                            </div>

                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-gray-400 hover:text-brand transition p-2 border border-gray-100 rounded-lg bg-gray-50"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">
                            {company.description}
                          </p>

                          <div className="bg-slate-50 p-4 rounded-xl grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                            <div className="flex justify-between border-b border-gray-100 pb-1">
                              <span className="text-gray-400 font-medium">Headquarters:</span>
                              <span className="text-gray-800 font-bold">{company.hq}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-1">
                              <span className="text-gray-400 font-medium">Funding Pool:</span>
                              <span className="text-gray-800 font-bold font-mono">{company.funding}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#eceff1] pb-1">
                              <span className="text-gray-400 font-medium">Active Careers:</span>
                              <span className="text-brand font-bold font-mono">{compJobs.length} Positions</span>
                            </div>
                            <div className="flex justify-between border-b border-[#eceff1] pb-1">
                              <span className="text-gray-400 font-medium">Founded Year:</span>
                              <span className="text-gray-800 font-bold font-mono">{company.founded}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {company.tags.map((tag, idx) => (
                              <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-gray-100">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => {
                                setSelectedCompany(company);
                              }}
                              className="w-full py-2 bg-gray-50 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-100 border border-gray-100 transition"
                            >
                              Explore Active Opportunities
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* FOUNDERS TAB VIEW */}
              {activeSidebarTab === "founders" && (
                <div className="space-y-8 select-none">
                  
                  {/* Top Majestic Slate Banner */}
                  <div className="rounded-3xl bg-[#09090b] text-white overflow-hidden border border-zinc-900 shadow-2xl relative">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-80 z-0"></div>
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-[300px] w-[300px] bg-[radial-gradient(circle,rgba(239,68,68,0.1)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl z-0"></div>
                    
                    <div className="p-6 sm:p-8 lg:p-10 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 text-left space-y-4">
                        <div className="inline-flex items-center gap-2 bg-[#ff385c]/15 border border-[#ff385c]/25 text-[#ff385c] px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c] animate-pulse"></span>
                          <span>AT_LAS REGISTRY SYSTEM ACTIVE</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4.5xl font-display font-black text-white tracking-tight leading-none">
                          Founders Intelligence &amp; <br className="hidden sm:inline" />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-pink-500">Model Deployment Roster</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-xl">
                          Direct canonical data channels for verified artificial systems builders. Connect compute allocations, tracking benchmarks, and open active hires from top-tier research leads.
                        </p>
                        
                        <div className="flex gap-3 pt-1">
                          <button
                            onClick={() => setShowApplyFounderModal(true)}
                            className="px-5 py-2.5 bg-[#ff385c] hover:bg-[#e02e50] text-[#fff] text-xs font-bold rounded-xl transition shadow-md active:scale-97 flex items-center gap-1.5"
                          >
                            <span>🚀</span> Submit Builder Profile
                          </button>
                          <button
                            onClick={() => {
                              // Scroll to the estimator smoothly
                              const el = document.getElementById("compute-cost-estimator-panel");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                              triggerToast("Scrolled to Compute budget cost calculator.");
                            }}
                            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-xl transition border border-zinc-800"
                          >
                            🛠️ Compute Estimator
                          </button>
                        </div>
                      </div>
                      
                      <div className="md:col-span-4 bg-zinc-950/40 p-5 rounded-2xl border border-zinc-900 text-left space-y-3 shrink-0 backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                          <span className="text-[10px] font-mono text-[#ff385c] font-black uppercase tracking-wider">Spotlight quote</span>
                          <span className="text-[9px] text-zinc-600 font-bold">Q2 Release</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 italic leading-snug">
                          "Clean reinforcement data is the absolute catalyst that turns raw base models into active agents."
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">📐</div>
                          <div>
                            <span className="text-[10px] font-bold text-white block leading-none">Alexandr Wang</span>
                            <span className="text-[8px] text-zinc-500 block">Scale AI Founder</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom stats rail */}
                    <div className="border-t border-zinc-900 bg-zinc-950/60 px-6 py-3 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                      {[
                        { label: "Verified Technical Leaders", value: "100,000+" },
                        { label: "Compute Cluster Indexes", value: "1,250 Aggregated" },
                        { label: "Pre-training Runs Tracked", value: "320+ Logs" },
                        { label: "Sovereign AI hubs", value: "14 Global" }
                      ].map((item, id) => (
                        <div key={id} className="space-y-0.5">
                          <span className="text-sm font-black text-white block leading-none">{item.value}</span>
                          <span className="text-[8px] text-zinc-500 uppercase font-extrabold tracking-wider">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TWO COLUMN GRID: Left column (Estimator & Submissions), Right column (Directories) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN (Lg:col-span-5) - Estimator & Tools */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* INTERACTIVE COMPUTE BUDGET ESTIMATOR CARD */}
                      <div id="compute-cost-estimator-panel" className="bg-white p-5 rounded-3xl border border-gray-105 shadow-3xs space-y-5 text-left relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-rose-50/20 via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#ff385c]/5 text-[#ff385c] flex items-center justify-center font-bold border border-brand/5">🧮</div>
                            <div>
                              <h2 className="text-xs sm:text-sm font-extrabold text-gray-950 uppercase tracking-wider font-display">Compute &amp; Training Estimator</h2>
                              <p className="text-[9px] text-gray-400 font-medium">Empirical training cost modeled on Chinchilla Scaling laws</p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-[#ff385c]/10 text-[#ff385c] px-2 py-0.5 rounded-md font-mono font-bold uppercase">v3.5 Live</span>
                        </div>

                        <div className="space-y-4">
                          {/* Slider 1: Parameter Size */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold">Model Size (Parameters):</span>
                              <span className="font-mono font-black text-brand bg-rose-50 px-2 py-0.5 rounded-md text-[11px]">{estParamsBillion}B Params</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="405"
                              value={estParamsBillion}
                              onChange={(e) => setEstParamsBillion(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ff385c]"
                            />
                            <div className="flex justify-between text-[8px] text-gray-400 font-medium font-mono">
                              <span>1B (Edge)</span>
                              <span>70B (Llama-3 Standard)</span>
                              <span>405B (Frontier Heavy)</span>
                            </div>
                          </div>

                          {/* Slider 2: Pretraining Tokens */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold">Pre-training Tokens:</span>
                              <span className="font-mono font-black text-brand bg-[#ff385c]/5 px-2 py-0.5 rounded-md text-[11px]">{(estTokensTrillion).toFixed(1)} Trillion</span>
                            </div>
                            <input
                              type="range"
                              min="0.5"
                              max="20"
                              step="0.5"
                              value={estTokensTrillion}
                              onChange={(e) => setEstTokensTrillion(parseFloat(e.target.value))}
                              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ff385c]"
                            />
                            <div className="flex justify-between text-[8px] text-gray-400 font-medium font-mono">
                              <span>500B (Small)</span>
                              <span>2.5T (Mistral Medium)</span>
                              <span>20T (Dense Frontier)</span>
                            </div>
                          </div>

                          {/* Slider 3: Cluster size (GPUs count) */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold">Target Cluster Size (GPUs):</span>
                              <span className="font-mono font-black text-brand bg-[#ff385c]/5 px-2 py-0.5 rounded-md text-[11px]">{estGpus} H100s/H200s</span>
                            </div>
                            <input
                              type="range"
                              min="128"
                              max="32768"
                              step="128"
                              value={estGpus}
                              onChange={(e) => setEstGpus(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#ff385c]"
                            />
                            <div className="flex justify-between text-[8px] text-gray-400 font-medium font-mono">
                              <span>128 H100s</span>
                              <span>2,048 (Power-user)</span>
                              <span>32.7k (Supercomputer)</span>
                            </div>
                          </div>

                          {/* Horizontal Segmented selector: GPU Hardware */}
                          <div className="space-y-1.5">
                            <span className="text-xs text-gray-500 font-bold">Deployment GPU Hardware Type:</span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {[
                                { id: "H105", label: "H200 SXM (Dense)", desc: "$2.45/hr rental" },
                                { id: "H200", label: "H200 141GB (SXM5)", desc: "$3.25/hr rental" },
                                { id: "Blackwell", label: "B200 Blackwell", desc: "$4.80/hr rental" }
                              ].map((hw) => (
                                <button
                                  key={hw.id}
                                  onClick={() => setEstHardware(hw.id)}
                                  className={`p-2 rounded-xl text-center border transition-all ${
                                    estHardware === hw.id
                                      ? "border-brand bg-rose-50 text-brand scale-98 active:scale-95"
                                      : "border-gray-100 hover:border-gray-200 bg-white text-gray-600"
                                  }`}
                                >
                                  <span className="text-[10px] font-bold block leading-tight">{hw.label}</span>
                                  <span className="text-[8px] text-gray-400 block mt-0.5 font-mono">{hw.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Efficiency Slider (MFU) */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold">Model FLOPS Utilization (MFU):</span>
                              <span className="font-mono font-bold text-gray-600">{estMfu}% Eff.</span>
                            </div>
                            <input
                              type="range"
                              min="20"
                              max="60"
                              value={estMfu}
                              onChange={(e) => setEstMfu(parseInt(e.target.value))}
                              className="w-full h-1"
                              style={{ accentColor: "#ff385c" }}
                            />
                            <p className="text-[8px] text-gray-400 leading-none">Standard industry pretraining runs yield between 35% and 52% MFU.</p>
                          </div>
                        </div>

                        {/* RESULTS PANEL */}
                        {(() => {
                          const results = calculateComputeEstimate(
                            estParamsBillion,
                            estTokensTrillion,
                            estHardware === "H105" ? "H105" : estHardware === "H200" ? "H200" : "Blackwell",
                            estGpus,
                            estMfu
                          );
                          return (
                            <div className="bg-slate-50/80 rounded-2xl border border-gray-100 p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Compute metrics estimate:</span>
                                <span className="text-[9px] text-[#ff385c] font-mono leading-none">{results.recommendedHardware}</span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-3xs space-y-0.5">
                                  <span className="text-[8px] uppercase text-gray-400 font-bold block leading-none">Total compute</span>
                                  <span className="text-xs sm:text-sm font-black text-gray-800 block font-mono tracking-tight">{results.flops}</span>
                                </div>
                                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-3xs space-y-0.5">
                                  <span className="text-[8px] uppercase text-gray-400 font-bold block leading-none">Training Days</span>
                                  <span className="text-xs sm:text-sm font-black text-gray-800 block font-mono tracking-tight">{results.gpuDays} Days</span>
                                </div>
                                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-3xs space-y-0.5">
                                  <span className="text-[8px] uppercase text-[#ff385c] font-bold block leading-none">Cost allocation</span>
                                  <span className="text-xs sm:text-sm font-black text-[#ff385c] block font-mono tracking-tight">{results.costEstimate}</span>
                                </div>
                              </div>
                              
                              <p className="text-[8px] text-gray-400 italic text-center leading-normal">
                                Mathematical reference: FLOPS = 6 * Parameters * Tokens. Actual values fluctuate based on checkpoint frequencies and server network latency.
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* QUICK SUBMISSION DIRECTORY GUIDE */}
                      <div className="bg-[#ff385c]/5 p-4.5 rounded-3xl border border-[#ff385c]/10 text-left space-y-2">
                        <span className="text-[#ff385c] text-xs">💡</span>
                        <h4 className="text-xs font-bold text-gray-900 leading-none uppercase tracking-wide">Looking to raise compute funding?</h4>
                        <p className="text-[11px] text-gray-500 leading-normal font-medium">
                          Our active investment indexing matches AI-native builders with top tier VC firms (Sequoia, a16z, Lightspeed, Accel) as well as tier-1 compute aggregators. Register your profile to be discovered.
                        </p>
                      </div>

                    </div>

                    {/* RIGHT COLUMN (Lg:col-span-7) - Filterable Founder Cards */}
                    <div className="lg:col-span-7 space-y-5">
                      
                      {/* Search and filter toolbar */}
                      <div className="bg-white p-3 rounded-2xl border border-gray-105 shadow-3xs flex flex-col sm:flex-row gap-3 items-center justify-between text-left">
                        <div className="flex-1 flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-xl border border-gray-100 w-full">
                          <Search className="w-4 h-4 text-gray-400 shrink-0" />
                          <input
                            type="text"
                            placeholder="Filter builders by name, company, stack, focus..."
                            value={founderSearchText}
                            onChange={(e) => setFounderSearchText(e.target.value)}
                            className="w-full py-1.5 bg-transparent text-xs focus:outline-none placeholder-gray-400 font-medium text-gray-900 border-none outline-none ring-0 select-text"
                          />
                          {founderSearchText && (
                            <button
                              onClick={() => setFounderSearchText("")}
                              className="text-xs font-bold text-gray-400 hover:text-gray-600 px-1"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">Source:</span>
                          <span className="text-xs font-bold px-3 py-1 bg-rose-50 text-brand rounded-full border border-brand/5 leading-none">
                            Active Atlas Network
                          </span>
                        </div>
                      </div>

                      {/* FOUNDERS HUB GRID */}
                      <div className="space-y-4">
                        {(() => {
                          const combined = [...customFounders, ...AT_LAS_FOUNDERS];
                          const filtered = combined.filter((f) => {
                            const query = founderSearchText.toLowerCase();
                            return (
                              f.name.toLowerCase().includes(query) ||
                              f.company.toLowerCase().includes(query) ||
                              f.focus.toLowerCase().includes(query) ||
                              f.techStack.some((s) => s.toLowerCase().includes(query))
                            );
                          });

                          if (filtered.length === 0) {
                            return (
                              <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 text-slate-400 space-y-2">
                                <span className="text-3xl">📭</span>
                                <h3 className="text-sm font-bold text-gray-800">No matching founders found</h3>
                                <p className="text-xs text-gray-400 max-w-sm mx-auto">Try refining your search terms or submit your personal technical profile to list instantly.</p>
                              </div>
                            );
                          }

                          return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {filtered.map((founder) => (
                                <div
                                  key={founder.id}
                                  onClick={() => setSelectedFounder(founder)}
                                  className="bg-white rounded-2xl border border-gray-105 hover:border-brand/40 hover:shadow-xs transition duration-200 cursor-pointer text-left flex flex-col justify-between group overflow-hidden"
                                >
                                  {/* Visual top highlight bar matching highlightColor */}
                                  <div className="h-1 w-full" style={{ backgroundColor: founder.highlightColor || "#ff385c" }}></div>
                                  
                                  <div className="p-4 sm:p-5 space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold border ${founder.avatarBg}`}>
                                          {founder.avatar}
                                        </div>
                                        <div>
                                          <h3 className="text-sm font-bold text-gray-950 group-hover:text-brand transition tracking-tight leading-none">
                                            {founder.name}
                                          </h3>
                                          <span className="text-[10px] text-gray-400 font-bold block mt-1 tracking-wide uppercase font-mono">
                                            {founder.company}
                                          </span>
                                        </div>
                                      </div>
                                      
                                      {/* Capital Raised Badge */}
                                      <span className="text-[9px] font-mono font-bold bg-[#ff385c]/5 text-[#ff385c] px-2.5 py-1 rounded-md">
                                        {founder.capitalRaised} Raised
                                      </span>
                                    </div>
                                    
                                    <p className="text-xs text-slate-500 leading-snug line-clamp-3 min-h-[50px] font-medium">
                                      {founder.bio}
                                    </p>
                                    
                                    {/* Metrics strip */}
                                    <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-50/80 py-2">
                                      {founder.metrics.slice(0, 3).map((metric, idx) => (
                                        <div key={idx} className="space-y-0.5">
                                          <span className="text-[8px] uppercase font-bold text-gray-400 block leading-none truncate max-w-[80px]">{metric.label}</span>
                                          <span className="text-[10px] font-black text-gray-700 block font-mono leading-none">{metric.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    {/* Tech Keys Stack */}
                                    <div className="flex flex-wrap gap-1">
                                      {founder.techStack.map((stack) => (
                                        <span key={stack} className="text-[9px] text-gray-500 font-bold bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md leading-none">
                                          {stack}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Card bottom action trigger */}
                                  <div className="bg-gray-50/70 border-t border-gray-50 p-3 flex justify-between items-center text-[10px] font-bold text-[#ff385c] group-hover:bg-[#ff385c]/2 transition-all">
                                    <span>View System Briefcase &amp; Quote Request</span>
                                    <div className="w-5 h-5 rounded-full bg-[#ff385c]/5 text-[#ff385c] border border-brand/5 flex items-center justify-center text-[9px]">
                                      →
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                    
                  </div>

                  {/* ACTIVE SELECTED FOUNDER PROFILE DETAIL COLLAPSIBLE MODAL */}
                  <AnimatePresence>
                    {selectedFounder && (
                      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-40" onClick={() => setSelectedFounder(null)}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-gray-100 shadow-2xl relative select-none"
                        >
                          <div className="h-2 w-full" style={{ backgroundColor: selectedFounder.highlightColor || "#ff385c" }}></div>
                          
                          <div className="p-6 sm:p-8 space-y-6 text-left">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3.5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-bold border ${selectedFounder.avatarBg}`}>
                                  {selectedFounder.avatar}
                                </div>
                                <div>
                                  <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 tracking-tight leading-none">{selectedFounder.name}</h2>
                                  <span className="text-[11px] sm:text-xs font-mono font-bold text-gray-400 block mt-1 uppercase tracking-wider">{selectedFounder.company}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedFounder(null)}
                                className="w-8 h-8 rounded-full hover:bg-slate-55 flex items-center justify-center text-gray-400 hover:text-slate-900 border border-gray-100 shadow-3xs transition cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">Operational Focus Field</span>
                                <span className="text-xs font-black text-[#ff385c] bg-rose-50/50 border border-brand/10 px-2.5 py-1 rounded-md inline-block">
                                  {selectedFounder.focus}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                <h4 className="text-xs font-bold text-slate-800">Builder biography &amp; Vision</h4>
                                <p className="text-xs leading-relaxed text-gray-500 font-medium">
                                  {selectedFounder.bio}
                                </p>
                              </div>

                              {/* Highlighted Quote Box */}
                              <div className="bg-[#ff385c]/5 border-l-3 border-[#ff385c] p-4 rounded-r-2xl italic text-[11px] text-gray-700 font-medium leading-relaxed">
                                "{selectedFounder.quote}"
                              </div>

                              {/* Performance Metrics Block */}
                              <div className="grid grid-cols-3 gap-3 bg-slate-50/50 border border-gray-110 p-3.5 rounded-2xl">
                                {selectedFounder.metrics.map((metric, idx) => (
                                  <div key={idx} className="space-y-0.5">
                                    <span className="text-[8px] uppercase font-semibold text-slate-400 block truncate">{metric.label}</span>
                                    <span className="text-xs font-black text-gray-800 block font-mono">{metric.value}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Core tech stack used */}
                              <div className="space-y-1.5">
                                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block">Primary technical Stack</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {selectedFounder.techStack.map((tech) => (
                                    <span key={tech} className="px-2.5 py-1 rounded-lg text-xs bg-white text-gray-600 font-bold border border-gray-100 shadow-3xs">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Modal CTA actions */}
                            <div className="pt-4 border-t border-gray-50 flex gap-2.5">
                              <button
                                onClick={() => {
                                  setSelectedFounder(null);
                                  setTextSearch(selectedFounder.company);
                                  setSubmitSearch(selectedFounder.company);
                                  setActiveSidebarTab("jobs");
                                  triggerToast(`Navigated to active index opportunities at: ${selectedFounder.company}`);
                                }}
                                className="flex-1 py-2.5 bg-brand hover:bg-brand-hover text-[#fff] text-xs font-bold rounded-xl transition"
                              >
                                View {selectedFounder.company} Careers ({selectedFounder.openRoles})
                              </button>
                              <button
                                onClick={() => {
                                  triggerToast(`Authored secure handshake ping for verification to ${selectedFounder.name}.`);
                                }}
                                className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl transition border border-gray-100"
                              >
                                Direct ping
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* SUBMIT PROFILE WIZARD MODAL DIALOG */}
                  <AnimatePresence>
                    {showApplyFounderModal && (
                      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-40" onClick={() => setShowApplyFounderModal(false)}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white rounded-3xl max-w-md w-full overflow-hidden border border-gray-105 shadow-2xl relative text-left select-none"
                        >
                          <div className="h-1.5 w-full bg-[#ff385c]"></div>
                          
                          <div className="p-6 space-y-5">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[#ff385c] text-lg">🚀</span>
                                <div>
                                  <h3 className="text-sm font-extrabold text-gray-950 uppercase tracking-wider font-display">Submit Builder Profile</h3>
                                  <p className="text-[9px] text-gray-400 font-medium font-sans">Self-publish your technical roadmap profile instantly</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setShowApplyFounderModal(false)}
                                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-slate-400 border border-gray-50 transition cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="space-y-3">
                              {/* Inputs */}
                              <div className="space-y-1">
                                <label className="text-[9px] uppercase font-bold text-gray-400">Founder full name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Aditi Sharma"
                                  value={newFounderName}
                                  onChange={(e) => setNewFounderName(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] uppercase font-bold text-gray-400">Company Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Neural Agent Labs"
                                  value={newFounderCompany}
                                  onChange={(e) => setNewFounderCompany(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1 font-sans">
                                  <label className="text-[9px] uppercase font-bold text-gray-400">Capital Raised</label>
                                  <select
                                    value={newFounderCapital}
                                    onChange={(e) => setNewFounderCapital(e.target.value)}
                                    className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl font-bold text-gray-600 focus:outline-none"
                                  >
                                    <option>$400k - Pre-Seed</option>
                                    <option>$1.5M - Seed</option>
                                    <option>$5.0M - Series A</option>
                                    <option>Bootstrapped</option>
                                  </select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] uppercase font-bold text-gray-400">Focus Sector</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Agentic RAG"
                                    value={newFounderFocus}
                                    onChange={(e) => setNewFounderFocus(e.target.value)}
                                    className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] uppercase font-bold text-gray-400">Biography / Product pitch</label>
                                <textarea
                                  placeholder="What AGI, systems, or tools are you currently shipping in-market?"
                                  value={newFounderBio}
                                  onChange={(e) => setNewFounderBio(e.target.value)}
                                  rows={2}
                                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] uppercase font-bold text-gray-400">Stack (comma separated)</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Python, PyTorch, Ray"
                                  value={newFounderStack}
                                  onChange={(e) => setNewFounderStack(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] uppercase font-bold text-gray-400">Primary Founder Quote</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Let's make computers feel human again."
                                  value={newFounderQuote}
                                  onChange={(e) => setNewFounderQuote(e.target.value)}
                                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-100 rounded-xl focus:outline-none focus:bg-white text-gray-800"
                                />
                              </div>
                            </div>

                            <div className="pt-3 border-t border-gray-50 flex gap-2 justify-end">
                              <button
                                onClick={() => setShowApplyFounderModal(false)}
                                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-gray-500 hover:text-slate-900 font-bold rounded-xl text-xs transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  if (!newFounderName || !newFounderCompany || !newFounderBio) {
                                    triggerToast("⚠️ Mandatory name, company and bio values must be submitted.");
                                    return;
                                  }
                                  
                                  const customRec: AIFounder = {
                                    id: `custom-founder-${Date.now()}`,
                                    name: newFounderName,
                                    company: newFounderCompany,
                                    avatar: "🌱",
                                    avatarBg: "bg-rose-50 text-[#ff385c] border-brand/10",
                                    bio: newFounderBio,
                                    focus: newFounderFocus || "General Artificial Intelligence",
                                    techStack: newFounderStack ? newFounderStack.split(",").map(i => i.trim()) : ["Python", "Transformers"],
                                    capitalRaised: newFounderCapital,
                                    metrics: [
                                      { label: "Community Rank", value: "Verified Active" },
                                      { label: "Date Submitted", value: "Today" },
                                      { label: "Status Badge", value: "Live" }
                                    ],
                                    quote: newFounderQuote || "We compute for what matters.",
                                    openRoles: 0,
                                    highlightColor: "#ff385c"
                                  };

                                  setCustomFounders([customRec, ...customFounders]);
                                  setShowApplyFounderModal(false);
                                  
                                  // Reset form states
                                  setNewFounderName("");
                                  setNewFounderCompany("");
                                  setNewFounderBio("");
                                  setNewFounderFocus("");
                                  setNewFounderStack("");
                                  setNewFounderQuote("");

                                  triggerToast("🎉 Builder profile successfully published to the live registry!");
                                }}
                                className="px-5 py-2 bg-brand text-white font-bold rounded-xl text-xs hover:bg-brand-hover shadow-sm transition"
                              >
                                Self-Publish profile
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>

                </div>
              )}

              {/* FUNDING HUB */}
              {activeSidebarTab === "funding" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
                    <h2 className="text-xl font-display font-bold text-gray-900">Funding & Capital intelligence</h2>
                    <p className="text-xs text-slate-500">Live directory of active seed rounds, Series allocations, and strategic investments.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { company: "Perplexity", amount: "₹2,075 Crores", series: "Series C", investor: "Sequoia Capital", time: "2h ago", logo: "🔍" },
                      { company: "Thinking Machines Lab", amount: "₹16,600 Crores", series: "Series A", investor: "Andreessen Horowitz", time: "1d ago", logo: "🤖" },
                      { company: "Mistral AI", amount: "₹4,980 Crores", series: "Series C", investor: "Lightspeed", time: "2d ago", logo: "❄️" }
                    ].map((fund, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gray-400 uppercase">{fund.time}</span>
                          <span className="bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold px-2 py-0.5 rounded">SUCCESS</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{fund.logo}</span>
                          <div>
                            <h4 className="text-base font-bold text-gray-950">{fund.company}</h4>
                            <span className="text-xs text-gray-400 font-medium">Allocating {fund.series}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg text-xs flex justify-between items-center">
                          <span className="text-gray-400 font-medium">Volume:</span>
                          <span className="font-mono font-black text-gray-800 text-sm">{fund.amount}</span>
                        </div>

                        <div className="text-[11px] text-gray-400 flex justify-between pt-1">
                          <span>Lead Investor:</span>
                          <span className="font-bold text-gray-700">{fund.investor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RESEARCH TAB VIEW */}
              {activeSidebarTab === "research" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-display font-bold text-gray-900">AI Safety & Capability Research Archives</h2>
                    <p className="text-slate-500 text-xs mt-1">Deep analysis files parsing algorithmic frontiers, telemetry metrics, and market momentum of state-of-the-art weights.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Top 100 AI Startups index (2026)", type: "Market Report", pages: "48 pages", color: "from-rose-500 to-pink-600" },
                      { title: "State of AI Funding Q1 2026 Core Trends", type: "Financial Audit", pages: "32 pages", color: "from-teal-500 to-emerald-600" },
                      { title: "AI Agents Landscape: Mechanistic Interpretability metrics", type: "Technical paper", pages: "64 pages", color: "from-blue-500 to-cyan-600" },
                      { title: "AI Coding IDEs & Autocompression benchmark values", type: "Performance Bench", pages: "18 pages", color: "from-purple-500 to-indigo-600" }
                    ].map((paper, i) => (
                      <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:border-brand/35 transition space-y-4">
                        <div className="space-y-2">
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {paper.type}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 font-display leading-tight">
                            {paper.title}
                          </h4>
                        </div>

                        <div className="flex justify-between items-center pt-2 text-xs border-t border-gray-50">
                          <span className="text-gray-400 font-mono font-semibold">{paper.pages} PDF</span>
                          <button
                            onClick={() => downloadResearchPaper(paper.title)}
                            className="text-brand font-bold text-xs hover:underline flex items-center gap-1"
                          >
                            Download paper →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR / DETAILS WORKSPACE (DYNAMIC AND STICKY ON JOBS TAB) */}
            {((activeSidebarTab === "jobs" || activeSidebarTab === "saved") && selectedJob) && (
              <div className="fixed inset-0 lg:static bg-slate-950/40 lg:bg-transparent z-40 lg:z-auto flex items-end lg:items-start justify-end lg:justify-start col-span-1 lg:col-span-5 p-0 sm:p-4 lg:p-0">
                {/* Backdrop dismiss overlay */}
                <div 
                  className="absolute inset-0 lg:hidden" 
                  onClick={() => setSelectedJob(null)}
                />
                
                <div className="bg-white w-full max-h-[85vh] lg:max-h-none rounded-t-3xl lg:rounded-3xl border-t lg:border border-gray-200 lg:border-gray-100 p-6 sticky lg:top-24 shadow-2xl lg:shadow-sm space-y-6 overflow-y-auto lg:overflow-y-visible z-10 lg:z-auto relative max-w-xl mx-auto lg:max-w-none">
                  
                  {/* Detailed Job Header & controls */}
                  <div className="flex items-start justify-between border-b border-gray-50 pb-4">
                    <div className="flex gap-3">
                      <CompanyLogo companyId={selectedJob.companyId} companyName={selectedJob.companyName} className="w-12 h-12 shrink-0" />
                      <div>
                        <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">{selectedJob.companyName}</h4>
                        <h3 className="text-base font-bold text-gray-950 leading-tight">
                          {selectedJob.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition"
                      title="Fold detail panel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Core specifications pills in given style */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-[#ff385c]/8 text-brand font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        {selectedJob.salaryString}
                      </span>
                      <span className="bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {selectedJob.location}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs border border-gray-50 p-3 rounded-2xl bg-gray-50/30">
                      <div>
                        <span className="text-gray-400 block font-medium">Work Format:</span>
                        <span className="text-gray-800 font-bold font-sans flex items-center gap-1.5 mt-0.5">
                          <Globe className="w-3.5 h-3.5 text-[#ff385c]" />
                          {selectedJob.remote}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Experience Tier:</span>
                        <span className="text-gray-800 font-bold flex items-center gap-1.5 mt-0.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#ff385c]" />
                          {selectedJob.experienceRequired}+ Yrs ({selectedJob.experienceTier})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Role Narrative</span>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* core technology and tags list */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Ideal Tech Stack & Stances</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.tags.map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits checklist */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Core Company Benefits</span>
                    <div className="space-y-1.5">
                      {selectedJob.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                          <span className="text-emerald-500 shrink-0 font-bold">✓</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* actions alignment form */}
                  <div className="space-y-3 pt-4 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={(e) => toggleSaveJob(selectedJob.id, e)}
                      className={`px-4 py-3 rounded-2xl border transition flex items-center justify-center ${
                        savedJobIds.includes(selectedJob.id)
                          ? "bg-rose-50 text-brand border-brand/20"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Bookmark className="w-5 h-5 fill-current" />
                    </button>

                    <button
                      onClick={() => setShowApplyModal(selectedJob)}
                      className="flex-1 py-3 bg-brand text-white font-bold text-sm tracking-wide rounded-2xl hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] transition shadow-md shadow-[#ff385c]/20 flex items-center justify-center gap-2"
                    >
                      <span>Instant Secure Apply</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* External target safety link */}
                  <div className="text-center">
                    <a
                      href={selectedJob.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-gray-400 hover:text-brand font-medium inline-flex items-center gap-1.5"
                    >
                      <span>Review canonical posting on {selectedJob.companyName} portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 1. APPLY CAREER FORM MODAL (INTERACTIVE MULTI-STEP ONBOARDING WIZARD) */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 bg-gray-905/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-905">
                  <CompanyLogo companyId={showApplyModal.companyId} companyName={showApplyModal.companyName} className="w-10 h-10 shrink-0 border border-slate-750" />
                  <div className="text-left">
                    <span className="text-[9px] text-[#ff385c] font-bold uppercase tracking-widest block font-mono">Stage Onboarding: Step {applyStep} of 4</span>
                    <h3 className="text-sm font-bold text-slate-100">
                      Apply: {showApplyModal.title} @ {showApplyModal.companyName}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step Indicators pipeline bar */}
              <div className="bg-slate-50 px-6 py-3 border-b border-gray-150 flex items-center justify-between text-[11px] font-semibold text-gray-500 font-mono">
                <span className={applyStep === 1 ? "text-[#ff385c] font-extrabold" : "text-gray-400"}>1. Profile</span>
                <span className="text-gray-300">→</span>
                <span className={applyStep === 2 ? "text-[#ff385c] font-extrabold" : "text-gray-400"}>2. Resume Alignment</span>
                <span className="text-gray-300">→</span>
                <span className={applyStep === 3 ? "text-[#ff385c] font-extrabold" : "text-gray-400"}>3. Briefing Narrative</span>
                <span className="text-gray-300">→</span>
                <span className={applyStep === 4 ? "text-emerald-500 font-extrabold" : "text-gray-400"}>4. Success Onboarding</span>
              </div>

              {/* Form panel body */}
              <div className="p-6 overflow-y-auto space-y-4">
                
                {applyStep === 1 && (
                  <div className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={applicantForm.name}
                          onChange={(e) => setApplicantForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Saravanan Kumar"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Your Email ID *</label>
                        <input
                          type="email"
                          required
                          value={applicantForm.email}
                          onChange={(e) => setApplicantForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="kumarsaravanan2005@gmail.com"
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition font-mono"
                        />
                      </div>
                    </div>

                    {/* Portfolio URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">GitHub / Personal Portfolio URL</label>
                      <input
                        type="url"
                        value={applicantForm.portfolioUrl}
                        onChange={(e) => setApplicantForm(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                        placeholder="https://github.com/kumarsaravanan2005"
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition font-mono"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setApplyStep(2)}
                        disabled={!applicantForm.name || !applicantForm.email}
                        className="px-5 py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-brand-hover transition disabled:opacity-50"
                      >
                        Proceed to AI Resume indexing →
                      </button>
                    </div>
                  </div>
                )}

                {applyStep === 2 && (
                  <div className="space-y-4 text-left">
                    {/* Resume Upload Drag and Drop box (USABILITY PATTERNS COMPLIANT) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Attach CV / Resume (PDF / Word) *</label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${
                          isDraggingFile
                            ? "border-brand bg-red-50/20"
                            : applicantForm.resumeName
                            ? "border-emerald-300 bg-emerald-50/10"
                            : "border-gray-200 hover:border-gray-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />

                        <div className="space-y-2">
                          <div className="flex justify-center">
                            <Upload className={`w-8 h-8 ${applicantForm.resumeName ? "text-emerald-500" : "text-gray-400"}`} />
                          </div>
                          
                          {applicantForm.resumeName ? (
                            <div>
                              <p className="text-xs font-bold text-gray-800">
                                Selected: <span className="text-emerald-600">{applicantForm.resumeName}</span>
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">Tap box area or drag over to replace doc file</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-xs font-semibold text-gray-700">
                                Drag & drop your PDF resume here, or <span className="text-brand font-bold underline">browse files</span>
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">Allowed formats: PDF, DOC, DOCX up to 10MB</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Parser loading animations */}
                    {isParsingResume && (
                      <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-2">
                        <div className="flex justify-between text-[11px] font-mono text-slate-500">
                          <span>Retrieving semantic embeddings & blocks...</span>
                          <span>{parsingProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-brand h-full transition-all duration-100" style={{ width: `${parsingProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {resumeMatchScore !== null && (
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between animate-fade-in">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-emerald-950">Structural Vector Compatibility Matched!</h4>
                          <p className="text-[10px] text-emerald-600 font-medium">Your resume exhibits deep compatibility coefficients and correct keywords.</p>
                        </div>
                        <span className="font-mono font-extrabold text-emerald-700 text-lg bg-white border border-emerald-200 rounded-xl px-3 py-1 bg-opacity-80">
                          {resumeMatchScore}%
                        </span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setApplyStep(1)}
                        className="py-3 text-xs font-semibold text-gray-500 rounded-xl hover:text-gray-900 border border-gray-200 bg-white transition hover:bg-gray-50 flex-1"
                      >
                        ← Back to Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplyStep(3)}
                        disabled={!applicantForm.resumeName}
                        className="py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-brand-hover transition disabled:opacity-50 flex-1"
                      >
                        Proceed to Cover Letter →
                      </button>
                    </div>
                  </div>
                )}

                {applyStep === 3 && (
                  <form onSubmit={handleApplyFormSubmit} className="space-y-4 text-left">
                    {/* Cover Letter text field */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Cover Letter Narrative Brief</label>
                        <button
                          type="button"
                          onClick={() => handleAutoBuildCoverLetter()}
                          disabled={isGeneratingCover}
                          className="text-[10.5px] text-brand hover:text-brand-hover font-bold flex items-center gap-1 bg-rose-50 border border-[#ff385c]/10 px-2.5 py-1 rounded-lg transition"
                        >
                          <span>{isGeneratingCover ? "Synthesizing Brief..." : "🪄 Auto-Write Tailored Letter"}</span>
                        </button>
                      </div>
                      <textarea
                        rows={6}
                        value={applicantForm.coverLetter}
                        onChange={(e) => setApplicantForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                        placeholder="Briefly describe what sparks your passion, what models you've deployed, or why you are an ideal fit for this role."
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl p-3.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition resize-none leading-relaxed font-sans"
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setApplyStep(2)}
                        className="py-3 text-xs font-semibold text-gray-[#4b5563] rounded-xl hover:text-gray-900 border border-gray-200 bg-white transition hover:bg-gray-50 flex-1"
                      >
                        ← Back to Resume
                      </button>
                      <button
                        type="submit"
                        className="py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-brand-hover transition shadow-md shadow-[#ff385c]/20 flex-1"
                      >
                        🚀 Finalize Submission
                      </button>
                    </div>
                  </form>
                )}

                {applyStep === 4 && (
                  <div className="space-y-5 text-center py-6">
                    <div className="mx-auto w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-3xl animate-bounce">
                      🎉
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-950">Application Synthesized & Indexed!</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Hiring managers at <span className="font-bold text-slate-800">{showApplyModal.companyName}</span> have successfully received your credentials in their secure inbox pipeline.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 text-left max-w-md mx-auto space-y-1.5">
                      <span className="text-[10px] text-brand font-bold uppercase tracking-wider block font-mono">atlas onboarding advantage</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Because of your elite compatibility match coefficient, you have been fast-tracked! Run your pre-screening interview checkpoint chat to promote your application profile instantly.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                      <button
                        type="button"
                        onClick={() => {
                          const lastCreatedAppId = `app-${Date.now()}`;
                          const jobTitle = showApplyModal.title;
                          const compName = showApplyModal.companyName;
                          
                          setShowApplyModal(null);
                          setActiveSidebarTab("applications");
                          
                          // Launch chatbot for the latest app
                          setTimeout(() => {
                            startRecruiterInterviewChat(lastCreatedAppId, jobTitle, compName);
                          }, 500);
                        }}
                        className="py-3 bg-brand text-white font-bold text-xs rounded-xl hover:bg-brand-hover transition shadow-md shadow-[#ff385c]/20 flex items-center justify-center gap-1 font-sans"
                      >
                        💬 Start Screening Chat Bot
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowApplyModal(null);
                          setActiveSidebarTab("applications");
                        }}
                        className="py-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-1 font-sans"
                      >
                        📅 Review Submittals Tab
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CREATE / POST A JOB FORM MODAL */}
      <AnimatePresence>
        {showPostJobModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="p-6 bg-brand text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold">Advertise AI Opportunity</h3>
                  <p className="text-xs text-white/80 mt-0.5">Reach elite talent by specifying precise compensation and technical criteria.</p>
                </div>
                <button
                  onClick={() => setShowPostJobModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostJobSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Senior Diffusion Model Engineer"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>

                  {/* Company select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Hiring Organization *</label>
                    <select
                      value={newJob.companyId}
                      onChange={(e) => setNewJob(prev => ({ ...prev, companyId: e.target.value }))}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand focus:bg-white transition font-medium"
                    >
                      {SEED_COMPANIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Remote format */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Location Format *</label>
                    <select
                      value={newJob.remote}
                      onChange={(e) => setNewJob(prev => ({ ...prev, remote: e.target.value as RemoteType }))}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand focus:bg-white transition font-medium"
                    >
                      <option value="Remote">100% Remote</option>
                      <option value="Hybrid">Hybrid Office</option>
                      <option value="On-site">On-site Campus</option>
                    </select>
                  </div>

                  {/* Exact Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Stationed Location *</label>
                    <input
                      type="text"
                      required
                      value={newJob.location}
                      onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Department *</label>
                    <input
                      type="text"
                      required
                      value={newJob.department}
                      onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="e.g. R&D Research"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Salary minimum */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Salary Min (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={newJob.salaryMin}
                      onChange={(e) => setNewJob(prev => ({ ...prev, salaryMin: Number(e.target.value) }))}
                      placeholder="12000000"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>

                  {/* Salary maximum */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Salary Max (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={newJob.salaryMax}
                      onChange={(e) => setNewJob(prev => ({ ...prev, salaryMax: Number(e.target.value) }))}
                      placeholder="16000000"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>

                  {/* Median for filtering */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Median Filter Index (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newJob.salary}
                      onChange={(e) => setNewJob(prev => ({ ...prev, salary: Number(e.target.value) }))}
                      placeholder="14000000"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Experience in years */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Experience Required (Years) *</label>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      required
                      value={newJob.experienceRequired}
                      onChange={(e) => setNewJob(prev => ({ ...prev, experienceRequired: Number(e.target.value) }))}
                      placeholder="4"
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                    />
                  </div>

                  {/* Experience tier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 block">Experience Tier *</label>
                    <select
                      value={newJob.experienceTier}
                      onChange={(e) => setNewJob(prev => ({ ...prev, experienceTier: e.target.value as ExperienceTier }))}
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand focus:bg-white transition font-medium"
                    >
                      <option value="Junior">Junior Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior font-semibold">Senior & Leadership</option>
                    </select>
                  </div>
                </div>

                {/* Apply URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">Canonical Application Hub URL *</label>
                  <input
                    type="url"
                    required
                    value={newJob.applyUrl}
                    onChange={(e) => setNewJob(prev => ({ ...prev, applyUrl: e.target.value }))}
                    placeholder="https://openai.com/careers/role-path-details"
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">Tech Stack & Tags (Comma delimited)</label>
                  <input
                    type="text"
                    value={newJob.tags}
                    onChange={(e) => setNewJob(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Python, PyTorch, RLHF, CUDA"
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block">Organizational Benefits (Comma delimited)</label>
                  <input
                    type="text"
                    value={newJob.benefits}
                    onChange={(e) => setNewJob(prev => ({ ...prev, benefits: e.target.value }))}
                    placeholder="Full Healthcare, Top Pension Match, Gourmet Chef"
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition"
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 block font-medium">Detailed Role Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={newJob.description}
                    onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide a comprehensive breakdown of objectives, key stacks, expected tasks, day-to-day work patterns, and baseline specifications..."
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:border-brand focus:bg-white transition resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostJobModal(false)}
                    className="flex-1 py-3 text-xs font-semibold text-gray-500 rounded-xl hover:text-gray-900 border border-gray-200 bg-white transition hover:bg-gray-50"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-brand-hover transition shadow-md shadow-[#ff385c]/25"
                  >
                    📢 Broadcast to Atlas Index
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. DETAILED STARTUP COMPANY DIALOG MODEL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="p-6 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-3xl font-display shadow-sm">
                    {selectedCompany.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 block">{selectedCompany.name} Details</h3>
                    <span className="text-[10px] text-brand font-bold uppercase tracking-wider block font-mono">Verified partner</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-widest font-mono">Company Briefing</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedCompany.description}
                  </p>
                </div>

                {/* Company stats list in Atlas look */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-gray-50 grid grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Estimated Funding</span>
                    <span className="text-slate-900 font-bold font-mono text-sm block mt-0.5">{selectedCompany.funding}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider font-mono">Founding Year</span>
                    <span className="text-slate-900 font-bold block mt-0.5">{selectedCompany.founded}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Global Headquarters</span>
                    <span className="text-slate-900 font-bold block truncate mt-0.5">{selectedCompany.hq}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Employee headcount</span>
                    <span className="text-slate-900 font-bold block font-mono mt-0.5">{selectedCompany.employees}</span>
                  </div>
                </div>

                {/* Active index items count */}
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-widest font-mono">Ecosystem Categorization</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompany.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-50 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex gap-3">
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 border border-gray-200 text-slate-700 font-bold text-center text-xs rounded-xl hover:bg-slate-50 hover:text-slate-900 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  
                  <button
                    onClick={() => {
                      // Filter by company name
                      setTextSearch(selectedCompany.name);
                      setSubmitSearch(selectedCompany.name);
                      setActiveSidebarTab("jobs");
                      setSelectedCompany(null);
                      triggerToast(`Filtered main directory to highlight ${selectedCompany.name}.`);
                    }}
                    className="flex-1 py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#e02f50] transition shadow-md shadow-[#ff385c]/15"
                  >
                    🔎 View Career Openings
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. INTERACTIVE COGNITIVE RECRUITER CHATBOT PANEL */}
      <AnimatePresence>
        {activeInterviewAppId && (
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col h-[600px]"
            >
              <div className="p-5 bg-slate-900 text-white border-b border-gray-800 flex items-center justify-between">
                <div className="flex gap-3.5 items-center text-left">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-sm font-bold block">Atlas AI Recruiter Bot</h3>
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block font-mono">Cognitive pre-screening screening active</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveInterviewAppId(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 text-left">
                {chatMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                    <p className="text-xs font-mono">Loading chatbot alignment layer...</p>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[85%] space-y-1 ${
                        msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      }`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-[#ff385c] text-white rounded-tr-none font-medium"
                            : "bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono pl-1">{msg.timestamp}</span>
                    </div>
                  ))
                )}

                {isRecruiterTyping && (
                  <div className="flex items-center gap-2 mr-auto bg-white p-3 border border-slate-100 rounded-2xl shadow-sm text-xs text-gray-500 font-mono">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                    <span>AI Model Evaluator checking transcript compatibility...</span>
                  </div>
                )}
              </div>

              {/* Chat Form Action bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitInterviewMessage();
                }}
                className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your strategic engineering principle explanation..."
                  className="flex-1 bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#ff385c] focus:bg-white px-4 py-3 rounded-xl text-xs text-slate-900 transition font-sans"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-brand text-white font-bold py-3 px-5 rounded-xl text-xs hover:bg-brand-hover transition disabled:opacity-50 font-sans"
                >
                  Send Response
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. INTERACTIVE CORESANDBOX CODE CHALLENGE PLAYGROUND */}
      <AnimatePresence>
        {activeSandboxAppId && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 text-slate-100 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[650px]"
            >
              {/* Header */}
              <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-3.5 items-center text-left">
                  <div className="w-8 h-8 rounded bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-sm font-mono text-lime-400 font-bold">
                    &lt;/&gt;
                  </div>
                  <div>
                    <h3 className="text-sm font-bold block text-slate-200">Atlas Automated Testing Terminal</h3>
                    <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider block font-mono">Interactive algorithmic debugger loaded</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRunSandboxTests()}
                    disabled={isCompilingSandbox || sandboxSuccess}
                    className="bg-lime-500 hover:bg-lime-600 disabled:bg-lime-900 disabled:opacity-60 text-slate-950 text-xs font-bold py-2 px-4 rounded-xl transition flex items-center gap-1.5 font-sans"
                  >
                    <span>{isCompilingSandbox ? "Compiling..." : sandboxSuccess ? "Passed System Tests ✔" : "Run Unit Test Matrix"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSandboxAppId(null)}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Challenge Grid Panels */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left side info briefing */}
                <div className="p-6 bg-slate-950/60 border-r border-slate-800 overflow-y-auto space-y-4 text-left">
                  <span className="text-[9px] text-lime-500 font-bold tracking-widest font-mono uppercase">algorithmic sandbox challenge</span>
                  <h4 className="text-base font-bold text-slate-200">System Optimizer: Dot Product Normalizer</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hiring boards evaluate system stability strictly. Here is the active layer matching optimizer code. Run the automated TypeScript transpilation to see regression results.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-slate-300 font-mono block">Requirements Matrix:</span>
                    <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-slate-400 font-mono">
                      <li>Linear weight normalization sum bound validation.</li>
                      <li>High-concurrency dot multiplication optimization.</li>
                      <li>Floating point coordinate matches within 0.001 margin.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-lime-400 font-mono block font-bold">Standard Workspace Files Indexed:</span>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>✓ target_weights_optimizer.ts</span>
                      <span className="bg-slate-900 text-lime-500 text-[9px] px-1.5 py-0.5 rounded border border-slate-800">Ready</span>
                    </div>
                  </div>
                </div>

                {/* Right side interactive coding box */}
                <div className="flex flex-col overflow-hidden h-full">
                  <div className="flex-1 bg-slate-950 p-1 flex flex-col">
                    <span className="text-[10px] px-3 py-1 bg-slate-900 text-gray-400 self-start rounded-t-lg font-mono border-x border-t border-slate-800">
                      weights_optimizer.ts
                    </span>
                    <textarea
                      value={sandboxCode}
                      onChange={(e) => setSandboxCode(e.target.value)}
                      disabled={isCompilingSandbox || sandboxSuccess}
                      className="flex-1 w-full bg-slate-900 focus:outline-none p-4 text-xs font-mono text-lime-400 border border-slate-850 rounded-b-xl leading-relaxed resize-none cursor-text select-text"
                    />
                  </div>

                  {/* Console logs */}
                  <div className="h-[180px] bg-black p-4 border-t border-slate-800 overflow-y-auto space-y-1 text-left font-mono text-[11px]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider mb-1">Interactive Log Stream</span>
                    {sandboxConsole.length === 0 ? (
                      <p className="text-slate-600 italic">No output logged yet. Run regression testing grid above.</p>
                    ) : (
                      sandboxConsole.map((log, index) => (
                        <p
                          key={index}
                          className={`${
                            log.includes("PASSED") || log.includes("Success")
                              ? "text-lime-500 font-semibold"
                              : "text-slate-300"
                          }`}
                        >
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
