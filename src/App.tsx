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

export default function App() {
  // Navigation & Workspace State
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("jobs");
  const [selectedSubPill, setSelectedSubPill] = useState<string>("jobs");
  const [viewMode, setViewMode] = useState<"mixed" | "grid" | "list">("mixed");

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

  // Handle Drag & Drop events
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
    }
  };

  // Handle Apply Submission
  const handleApplyFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal) return;

    if (!applicantForm.name || !applicantForm.email || !applicantForm.resumeName) {
      alert("Please type your name, email and upload a valid PDF/Word resume.");
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
    setShowApplyModal(null);
    triggerToast(`Successfully applied to ${showApplyModal.companyName} for ${showApplyModal.title}!`);

    // Reset applicant state but preserve default info for speed
    setApplicantForm(prev => ({
      ...prev,
      coverLetter: "",
      portfolioUrl: ""
    }));
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

    return matchesQuery && matchesRemote && matchesExperience && matchesMinSalary && matchesLocation;
  });

  // Calculate unique locations in list for filter dropdown helpers
  const savedAndFilteredJobs = jobs.filter(job => savedJobIds.includes(job.id));

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-900 font-sans flex antialiased">
      {/* 1. Left Sidebar Navigation Panel */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen select-none z-10">
        <div className="p-6 pb-4 flex items-center justify-between">
          {/* Logo with matching vector element */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white font-display text-xl font-bold tracking-tight accent-glow">
              A
            </div>
            <div>
              <span className="font-display text-lg font-bold text-gray-900 tracking-tight block">Atlas</span>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-medium">Intelligence</span>
            </div>
          </div>
          <span className="bg-red-50 text-brand text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
            v3.6
          </span>
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
            onClick={() => setActiveSidebarTab("saved")}
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
            onClick={() => setActiveSidebarTab("applications")}
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
        <header className="sticky top-0 bg-white/80 backdrop-filter backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer">Atlas Intelligence</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-900 capitalize font-semibold">{activeSidebarTab} Hub</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Live stats pill */}
            <div className="flex items-center gap-6 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 text-xs font-mono text-gray-600">
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
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8 flex-1">
          
          {/* Main High-Impact Header Section mirroring screens */}
          <section className="text-center md:text-left md:flex md:items-center md:justify-between bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="space-y-4 max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#ff385c]/5 text-[#ff385c] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Web's Premier Artificial Intelligence Career Portal</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                The Intelligence Layer <br />
                <span className="bg-gradient-to-r from-brand to-pink-600 bg-clip-text text-transparent">
                  For the AI Economy
                </span>
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
                Connect and apply instantly to high-impact career options at elite builders driving global AGI capability, machine intelligence layers, and neural infrastructures.
              </p>
            </div>

            <div className="mt-6 md:mt-0 relative z-10 shrink-0">
              <button
                onClick={() => setShowPostJobModal(true)}
                className="w-full md:w-auto px-6 py-3.5 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover tracking-wide transition shadow-md shadow-[#ff385c]/25 flex items-center justify-center gap-2.5"
              >
                <Plus className="w-5 h-5" />
                <span>Post an Opportunity</span>
              </button>
            </div>
          </section>

          {/* Interactive Search Bar Panel and Pills */}
          <section className="space-y-4">
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-2 relative">
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, stacks, locations, keywords..."
                  value={textSearch}
                  onChange={(e) => setTextSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSubmitSearch(textSearch);
                  }}
                  className="w-full py-2 bg-transparent text-sm focus:outline-none placeholder-gray-400 font-medium text-gray-900"
                />
              </div>

              {/* Advanced Filter Indicators (clickable to reset) */}
              <div className="flex items-center gap-2 px-3 md:border-l md:border-gray-100">
                <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-500">Filters:</span>
                <div className="flex flex-wrap gap-1">
                  {filterRemote !== "All" && (
                    <span 
                      onClick={() => setFilterRemote("All")} 
                      className="bg-gray-100 hover:bg-red-50 hover:text-brand cursor-pointer text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition"
                    >
                      {filterRemote} ✕
                    </span>
                  )}
                  {filterExperience !== "All" && (
                    <span 
                      onClick={() => setFilterExperience("All")} 
                      className="bg-gray-100 hover:bg-red-50 hover:text-brand cursor-pointer text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition"
                    >
                      {filterExperience} ✕
                    </span>
                  )}
                  {minSalarySlider > 0 && (
                    <span 
                      onClick={() => setMinSalarySlider(0)} 
                      className="bg-gray-100 hover:bg-red-50 hover:text-brand cursor-pointer text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition"
                    >
                      &gt;{formatCurrencyINR(minSalarySlider)} ✕
                    </span>
                  )}
                  {filterLocation !== "All" && (
                    <span 
                      onClick={() => setFilterLocation("All")} 
                      className="bg-gray-100 hover:bg-red-50 hover:text-brand cursor-pointer text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 transition"
                    >
                      Loc: {filterLocation.replace("_", " ")} ✕
                    </span>
                  )}
                  {filterRemote === "All" && filterExperience === "All" && minSalarySlider === 0 && filterLocation === "All" && (
                    <span className="text-[10px] font-mono text-gray-400 italic">None active</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTextSearch("");
                    setSubmitSearch("");
                    setFilterRemote("All");
                    setFilterExperience("All");
                    setMinSalarySlider(0);
                    setFilterLocation("All");
                    triggerToast("Filter structures reset to default settings.");
                  }}
                  className="px-4 py-2.5 text-xs text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200 rounded-xl font-medium transition"
                  title="Clear all filters & query"
                >
                  Reset
                </button>
                <button
                  onClick={() => setSubmitSearch(textSearch)}
                  className="px-6 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-hover tracking-wide transition shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Horizontal Sub-Navigation Selection Cards (mirroring screenshot horizontal category bars) */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 overflow-x-auto scrollbar-none">
              <div className="flex gap-1.5 shrink-0">
                {[
                  { id: "all", label: "All Index", count: jobs.length },
                  { id: "jobs", label: "Jobs", count: jobs.length },
                  { id: "startups", label: "Startups", count: SEED_COMPANIES.length },
                  { id: "research", label: "Research", count: 2 },
                  { id: "funding", label: "Funding Rounds", count: 4 },
                  { id: "saved", label: "Bookmarks", count: savedJobIds.length }
                ].map((pill) => {
                  const isPillActive = selectedSubPill === pill.id;
                  return (
                    <button
                      key={pill.id}
                      id={`pills-cat-${pill.id}`}
                      onClick={() => {
                        setSelectedSubPill(pill.id);
                        if (pill.id === "saved" || pill.id === "startups") {
                          setActiveSidebarTab(pill.id);
                        } else if (pill.id === "jobs" || pill.id === "all") {
                          setActiveSidebarTab("jobs");
                        } else {
                          setActiveSidebarTab(pill.id);
                        }
                      }}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                        isPillActive
                          ? "bg-[#ff385c]/10 text-brand border border-[#ff385c]/25"
                          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <span>{pill.label}</span>
                      <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 ${
                        isPillActive ? "bg-[#ff385c]/15 text-brand" : "bg-gray-100 text-gray-400"
                      }`}>
                        {pill.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Visual Presentation Modalities Switcher */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm shrink-0">
                <button
                  onClick={() => {
                    setViewMode("mixed");
                    triggerToast("Switched to Premium Mixed Bento Discovery Mode.");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === "mixed"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                  title="Spotlight Featured & Unified stream"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mixed Bento</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("grid");
                    triggerToast("Switched to Immersive Deck Grid Mode.");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === "grid"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                  title="Visual deck of cards"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Discovery Grid</span>
                </button>
                <button
                  onClick={() => {
                    setViewMode("list")}
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === "list"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                  title="Elite streamlined row list"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Elite Feed</span>
                </button>
              </div>
            </div>
          </section>

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
                    ) : viewMode === "mixed" ? (
                      // 🌌 MODE A: PREMIUM MIXED BENTO DISCOVERY FLOW
                      <div className="space-y-8 animate-fadeIn">
                        {/* 1. Bento Featured Section */}
                        {(() => {
                          const featured = filteredJobs.filter(j => j.isFeatured);
                          const regular = filteredJobs.filter(j => !j.isFeatured);
                          const displayFeatured = featured.length > 0 ? featured.slice(0, 3) : filteredJobs.slice(0, 2);
                          const displayRegular = featured.length > 0 ? regular : filteredJobs.slice(2);

                          return (
                            <>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-brand" />
                                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Spotlight Opportunities</h4>
                                  <span className="h-[1px] bg-slate-100 flex-1"></span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {displayFeatured.map((job) => {
                                    const isJobSelected = selectedJob?.id === job.id;
                                    const isJobSaved = savedJobIds.includes(job.id);
                                    return (
                                      <div
                                        key={job.id}
                                        id={`job-card-featured-${job.id}`}
                                        onClick={() => setSelectedJob(job)}
                                        className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between overflow-hidden min-h-[220px] ${
                                          isJobSelected
                                            ? "border-brand ring-1 ring-brand bg-gradient-to-br from-rose-50/10 to-brand/5 shadow-md"
                                            : "border-gray-150/80 bg-gradient-to-br from-white to-slate-50/30 hover:border-brand/20 hover:shadow-lg hover:translate-y-[-2px]"
                                        }`}
                                      >
                                        {/* Abstract geometric mesh background on spotlight cards */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/4 rounded-full blur-2xl group-hover:bg-brand/8 transition-all duration-300 pointer-events-none" />

                                        <div className="space-y-4">
                                          {/* Logo row */}
                                          <div className="flex items-start justify-between">
                                            <div className="flex gap-3">
                                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-display border border-gray-100 shadow-sm text-2.5xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                {job.companyLogo}
                                              </div>
                                              <div>
                                                <span 
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const mappedComp = SEED_COMPANIES.find(c => c.id === job.companyId);
                                                    if (mappedComp) setSelectedCompany(mappedComp);
                                                  }}
                                                  className="text-[11px] text-slate-400 font-bold hover:text-brand tracking-wider uppercase cursor-pointer hover:underline block"
                                                >
                                                  {job.companyName}
                                                </span>
                                                <div className="text-[10px] font-mono text-slate-400">
                                                  {job.department}
                                                </div>
                                              </div>
                                            </div>

                                            <button
                                              onClick={(e) => toggleSaveJob(job.id, e)}
                                              className={`p-2 rounded-xl border transition ${
                                                isJobSaved
                                                  ? "bg-[#ff385c]/10 border-[#ff385c]/20 text-brand"
                                                  : "bg-white border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300"
                                              }`}
                                              title={isJobSaved ? "Unsave role" : "Save role"}
                                            >
                                              <Bookmark className="w-3.5 h-3.5 fill-current text-current" />
                                            </button>
                                          </div>

                                          {/* Mid portion */}
                                          <div className="space-y-1.5">
                                            <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-brand transition duration-200">
                                              {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500">
                                              <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                                                {job.location}
                                              </span>
                                              <span className="flex items-center gap-1">
                                                <Globe className="w-3 h-3 text-gray-400 shrink-0" />
                                                {job.remote}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Tech badge flow */}
                                          <div className="flex flex-wrap gap-1">
                                            {job.tags.slice(0, 3).map((tag, i) => (
                                              <span key={i} className="bg-slate-100/60 hover:bg-slate-100 text-slate-650 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-slate-200/40">
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Bottom Action bar */}
                                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                          <div className="space-y-0.5">
                                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block">Salary Compensation</span>
                                            <span className="font-mono font-bold text-[11px] text-slate-800 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-150/10 inline-block">
                                              {job.salaryString}
                                            </span>
                                          </div>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowApplyModal(job);
                                            }}
                                            className="px-3.5 py-1.5 bg-slate-900 text-white text-[11px] font-semibold rounded-xl hover:bg-brand transition-all flex items-center gap-1"
                                          >
                                            <span>Apply</span>
                                            <ArrowUpRight className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* 2. Streams segment */}
                              {displayRegular.length > 0 && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 pt-2">
                                    <Layers className="w-4 h-4 text-slate-400" />
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Directory Stream</h4>
                                    <span className="h-[1px] bg-slate-100 flex-1"></span>
                                  </div>

                                  <div className="space-y-3.5">
                                    {displayRegular.map((job) => {
                                      const isJobSelected = selectedJob?.id === job.id;
                                      const isJobSaved = savedJobIds.includes(job.id);
                                      return (
                                        <div
                                          key={job.id}
                                          id={`job-card-regular-${job.id}`}
                                          onClick={() => setSelectedJob(job)}
                                          className={`p-4 bg-white rounded-2xl border transition-all duration-200 cursor-pointer relative group flex flex-col sm:flex-row items-center justify-between gap-4 ${
                                            isJobSelected
                                              ? "border-brand/40 shadow-sm ring-1 ring-brand/25 bg-rose-50/5"
                                              : "border-gray-150/60 hover:border-gray-250 hover:bg-slate-50/20"
                                          }`}
                                        >
                                          <div className="flex gap-4 items-center w-full sm:w-auto min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-display border border-gray-100 shadow-sm text-lg shrink-0 group-hover:scale-105 transition-transform">
                                              {job.companyLogo}
                                            </div>
                                            <div className="min-w-0">
                                              <div className="flex items-center gap-2">
                                                <span 
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    const mappedComp = SEED_COMPANIES.find(c => c.id === job.companyId);
                                                    if (mappedComp) setSelectedCompany(mappedComp);
                                                  }}
                                                  className="text-[11px] font-bold text-slate-400 hover:text-brand tracking-wide hover:underline cursor-pointer uppercase"
                                                >
                                                  {job.companyName}
                                                </span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase">
                                                  • {job.department}
                                                </span>
                                              </div>
                                              <h4 className="text-sm font-bold text-gray-800 group-hover:text-brand transition truncate leading-tight mt-0.5">
                                                {job.title}
                                              </h4>
                                            </div>
                                          </div>

                                          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0">
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                              <span className="hidden md:flex items-center gap-1 text-[11px]">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                                {job.location.split(",")[0]}
                                              </span>
                                              <span className="flex items-center gap-1 text-[11px]">
                                                <Globe className="w-3 h-3 text-slate-400" />
                                                {job.remote}
                                              </span>
                                              <span className="font-mono font-semibold text-[11px] text-slate-750 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg shadow-2xs">
                                                {job.salaryString}
                                              </span>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">
                                              <button
                                                onClick={(e) => toggleSaveJob(job.id, e)}
                                                className={`p-2 rounded-xl border transition ${
                                                  isJobSaved
                                                    ? "bg-[#ff385c]/10 border-[#ff385c]/20 text-brand"
                                                    : "bg-white border-gray-250 hover:bg-slate-50 text-gray-400 hover:text-gray-900"
                                                }`}
                                              >
                                                <Bookmark className="w-3 h-3 fill-current" />
                                              </button>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setShowApplyModal(job);
                                                }}
                                                className="px-3 py-1.5 bg-slate-100 hover:bg-brand hover:text-white border border-slate-200/80 text-slate-700 text-[11px] font-semibold rounded-xl transition"
                                              >
                                                Apply
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    ) : viewMode === "grid" ? (
                      // 🎚️ MODE B: IMMERSIVE CARD DECK GRID
                      <div 
                        className={`grid grid-cols-1 ${
                          selectedJob ? "sm:grid-cols-1 xl:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
                        } gap-6 animate-fadeIn`}
                      >
                        {filteredJobs.map((job) => {
                          const isJobSelected = selectedJob?.id === job.id;
                          const isJobSaved = savedJobIds.includes(job.id);
                          return (
                            <div
                              key={job.id}
                              id={`job-card-grid-${job.id}`}
                              onClick={() => setSelectedJob(job)}
                              className={`p-5 bg-white rounded-3xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between overflow-hidden min-h-[190px] ${
                                isJobSelected
                                  ? "border-brand ring-1 ring-brand bg-gradient-to-br from-rose-50/10 to-brand/5 shadow-md"
                                  : "border-gray-150/80 hover:border-brand/20 hover:shadow-md hover:translate-y-[-1px]"
                              }`}
                            >
                              <div className="space-y-3.5">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex gap-2.5">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-display border border-slate-100 shadow-sm text-xl shrink-0 group-hover:scale-105 transition-transform">
                                      {job.companyLogo}
                                    </div>
                                    <div>
                                      <span 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const mappedComp = SEED_COMPANIES.find(c => c.id === job.companyId);
                                          if (mappedComp) setSelectedCompany(mappedComp);
                                        }}
                                        className="text-[11px] font-bold text-slate-400 hover:text-brand tracking-wider uppercase cursor-pointer hover:underline block leading-tight"
                                      >
                                        {job.companyName}
                                      </span>
                                      <div className="text-[9px] font-mono text-gray-400 mt-0.5">
                                        {job.department}
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={(e) => toggleSaveJob(job.id, e)}
                                    className={`p-1.5 rounded-lg border transition ${
                                      isJobSaved
                                        ? "bg-brand/10 border-brand/20 text-brand"
                                        : "bg-white border-gray-250 text-gray-400 hover:text-gray-900"
                                    }`}
                                  >
                                    <Bookmark className="w-3 h-3 fill-current" />
                                  </button>
                                </div>

                                <div className="space-y-1">
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand transition leading-snug">
                                    {job.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-slate-500">
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="w-3 h-3 text-slate-400" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-0.5">
                                      <Globe className="w-3 h-3 text-slate-400" />
                                      {job.remote}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                  {job.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-100">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold text-slate-800 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg">
                                  {job.salaryString}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowApplyModal(job);
                                  }}
                                  className="px-3 py-1.5 bg-slate-900 hover:bg-brand text-white text-[10px] font-bold rounded-lg transition"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // 💬 MODE C: ELITE COMPACT FEED
                      <div className="space-y-3 animate-fadeIn">
                        {filteredJobs.map((job) => {
                          const isJobSelected = selectedJob?.id === job.id;
                          const isJobSaved = savedJobIds.includes(job.id);
                          return (
                            <div
                              key={job.id}
                              id={`job-card-list-${job.id}`}
                              onClick={() => setSelectedJob(job)}
                              className={`p-4 bg-white rounded-2xl border transition-all duration-200 cursor-pointer relative group flex flex-col md:flex-row items-center justify-between gap-4 ${
                                isJobSelected
                                  ? "border-brand shadow-sm bg-rose-50/5 ring-1 ring-brand/10"
                                  : "border-gray-100 hover:border-gray-200 hover:bg-slate-50/40"
                              }`}
                            >
                              <div className="flex gap-4 items-center w-full md:w-5/12 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-gray-100 shadow-sm text-lg shrink-0">
                                  {job.companyLogo}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand transition truncate leading-tight">
                                    {job.title}
                                  </h4>
                                  <span 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const mappedComp = SEED_COMPANIES.find(c => c.id === job.companyId);
                                      if (mappedComp) setSelectedCompany(mappedComp);
                                    }}
                                    className="text-[11px] text-slate-450 font-bold uppercase tracking-wider hover:text-brand cursor-pointer mt-0.5 inline-block"
                                  >
                                    {job.companyName}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2 items-center flex-wrap w-full md:w-4/12 text-xs text-slate-500">
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                  {job.department}
                                </span>
                                <span className="flex items-center gap-0.5 text-[11px]">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-0.5 text-[11px]">
                                  <Globe className="w-3 h-3 text-slate-400" />
                                  {job.remote}
                                </span>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-3/12 shrink-0 md:border-t-0 border-t border-slate-50 pt-2 md:pt-0">
                                <span className="font-mono text-xs font-bold text-slate-800 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">
                                  {job.salaryString}
                                </span>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => toggleSaveJob(job.id, e)}
                                    className={`p-2 rounded-xl border transition ${
                                      isJobSaved
                                        ? "bg-[#ff385c]/10 border-[#ff385c]/20 text-brand"
                                        : "bg-white border-gray-200 text-gray-400 hover:text-gray-900"
                                    }`}
                                  >
                                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowApplyModal(job);
                                    }}
                                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-brand text-white text-[11px] font-semibold rounded-xl transition"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center font-display border border-gray-100 shadow-sm text-xl shrink-0">
                                {job.companyLogo}
                              </div>
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

              {/* MY APPLICATIONS PORTAL */}
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
                        <div key={app.id} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition space-y-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center font-display border border-gray-100 shadow-sm text-2xl shrink-0">
                                {app.companyLogo}
                              </div>
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
                              <div className="space-y-1 pt-1">
                                <span className="text-gray-400 font-medium block">Cover Letter Brief:</span>
                                <p className="text-gray-600 bg-white p-2.5 rounded border border-gray-100 italic leading-relaxed text-[11px]">
                                  "{app.coverLetter}"
                                </p>
                              </div>
                            )}
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
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Active Job Indexes", value: "1,342 Opportunities", desc: "Across 250+ startups", icon: Briefcase, color: "text-[#ff385c]" },
                      { label: "Funding Index Q2", value: "₹1.03 Lakh Crores Seeded", desc: "+14.2% Quarter on Quarter", icon: DollarSign, color: "text-emerald-500" },
                      { label: "AI Startups Listed", value: "852 Global Projects", desc: "12 registered this week", icon: Building2, color: "text-blue-500" },
                      { label: "Mean Salaries", value: "₹1.62 Crores / Yr", desc: "Top tech standard bias", icon: Award, color: "text-purple-500" }
                    ].map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                          <div className={stat.color}>
                            <StatIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">{stat.label}</span>
                            <span className="text-lg font-bold text-gray-900 block font-display">{stat.value}</span>
                            <span className="text-[10px] text-gray-400 block">{stat.desc}</span>
                          </div>
                        </div>
                      )
                    })}
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
                <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center space-y-4">
                  <div className="text-5xl">👥</div>
                  <h2 className="text-xl font-display font-bold text-gray-900">Founders Network Registry</h2>
                  <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    The Atlas founder network maintains secure, authorized access channels for verified AI builders. Submissions to these profiles require valid organizational tokens.
                  </p>
                  <button
                    onClick={() => triggerToast("Founder authentication is restricted to approved participants.")}
                    className="px-6 py-2.5 bg-brand text-white text-xs font-semibold rounded-xl hover:bg-brand-hover transition"
                  >
                    Authenticate profile
                  </button>
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
                            onClick={() => triggerToast(`Downloading ${paper.title}...`)}
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
              <div className="col-span-1 lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 shadow-sm space-y-6">
                  
                  {/* Detailed Job Header & controls */}
                  <div className="flex items-start justify-between border-b border-gray-50 pb-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-display text-2xl shrink-0">
                        {selectedJob.companyLogo}
                      </div>
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

      {/* ==================================== MODAL OVERLAYS SECTION ==================================== */}

      {/* 1. APPLY CAREER FORM MODAL (INTERACTIVE DRAWER) */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
            >
              <div className="p-6 bg-[#ff385c]/5 border-b border-[#ff385c]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 text-xl font-display shadow-sm">
                    {showApplyModal.companyLogo}
                  </div>
                  <div>
                    <span className="text-[10px] text-brand font-bold uppercase block tracking-wider">APPLY OPPORTUNITY</span>
                    <h3 className="text-base font-bold text-slate-900">
                      {showApplyModal.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowApplyModal(null)}
                  className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-gray-900 transition border border-transparent hover:border-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplyFormSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
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
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition"
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
                      className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition"
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
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition"
                  />
                </div>

                {/* Cover Letter text field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">Cover Letter Brief (Why you?)</label>
                  <textarea
                    rows={3}
                    value={applicantForm.coverLetter}
                    onChange={(e) => setApplicantForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                    placeholder="Briefly describe what sparks your passion, what models you've deployed, or why you are an ideal fit for this role."
                    className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3.5 text-xs text-gray-900 focus:outline-none focus:border-brand focus:bg-white transition resize-none leading-relaxed"
                  />
                </div>

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

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(null)}
                    className="flex-1 py-3 text-xs font-semibold text-gray-500 rounded-xl hover:text-gray-900 border border-gray-200 bg-white transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand text-white font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-brand-hover transition shadow-md shadow-[#ff385c]/20"
                  >
                    🚀 Finalize Submission
                  </button>
                </div>
              </form>
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

    </div>
  );
}
