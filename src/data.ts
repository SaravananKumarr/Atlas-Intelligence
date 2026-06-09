/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, Job } from "./types";

export const convertTextToINR = (text: string): string => {
  if (!text) return text;
  
  // Replace € with $ for unified parsing
  let cleanText = text.replace(/€/g, "$");
  
  // Handle Billions (B) and Millions (M) - e.g., $17.8B+, $7.3B+, $165M+
  cleanText = cleanText.replace(/\$?(\d+(\.\d+)?)\s*(B|M|Billion|Million)/gi, (match, numStr, decimalPart, unit) => {
    const num = parseFloat(numStr);
    const unitChar = unit.toLowerCase()[0];
    if (unitChar === 'b') {
      const inrCrores = num * 83 * 100; // 1 Billion USD = 83 Billion INR = 8,300 Crores INR
      if (inrCrores >= 10000) {
        return `₹${(inrCrores / 10000).toFixed(2)} Lakh Crores`;
      }
      return `₹${Math.round(inrCrores).toLocaleString("en-IN")} Crores`;
    } else { // 'm' or 'million'
      // 1 Million USD = 8.3 Crores INR
      const inrCrores = num * 8.3;
      return `₹${inrCrores.toFixed(1)} Crores`;
    }
  });

  // Handle standard numerical strings with optional 'k', e.g. $240,000 or $240k or $250k+
  cleanText = cleanText.replace(/\$?(\d{1,3}(,\d{3})+)(k)?/gi, (match, p1, p2, p3) => {
    let val = parseFloat(p1.replace(/,/g, ''));
    if (p3 && p3.toLowerCase() === 'k') {
      val *= 1000;
    }
    const inrVal = val * 83;
    if (inrVal >= 10000000) {
      return `₹${(inrVal / 10000000).toFixed(2)} Cr`;
    } else if (inrVal >= 100000) {
      return `₹${(inrVal / 100000).toFixed(1)} Lakhs`;
    } else {
      return `₹${inrVal.toLocaleString("en-IN")}`;
    }
  });

  cleanText = cleanText.replace(/\$(\d+)(k)?/gi, (match, p1, p2) => {
    let val = parseFloat(p1);
    if (p2 && p2.toLowerCase() === 'k') {
      val *= 1000;
    } else if (val < 1000) {
      val *= 1000;
    }
    const inrVal = val * 83;
    if (inrVal >= 10000000) {
      return `₹${(inrVal / 10000000).toFixed(2)} Cr`;
    } else if (inrVal >= 100000) {
      return `₹${(inrVal / 100000).toFixed(1)} Lakhs`;
    } else {
      return `₹${inrVal.toLocaleString("en-IN")}`;
    }
  });

  // Finally replace remaining standalone "$" with "₹"
  return cleanText.replace(/\$/g, "₹");
};

export const formatCurrencyINR = (valInInr: number): string => {
  if (valInInr >= 10000000) {
    return `₹${(valInInr / 10000000).toFixed(2)} Cr`;
  } else if (valInInr >= 100000) {
    return `₹${(valInInr / 100000).toFixed(1)} Lakhs`;
  } else {
    return `₹${valInInr.toLocaleString("en-IN")}`;
  }
};

const RAW_COMPANIES: Company[] = [
  {
    id: "openai",
    name: "OpenAI",
    logo: "⚡",
    description: "Building safe and beneficial Artificial General Intelligence (AGI) that benefits all of humanity.",
    funding: "$17.8B+",
    founded: 2015,
    hq: "San Francisco, USA",
    employees: "1,000 - 5,000",
    website: "https://openai.com",
    tags: ["Foundation Models", "AGI", "ChatGPT"],
    category: "Foundation Models",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: "▲",
    description: "An AI safety and research company that builds reliable, beneficial, and controllable AI systems.",
    funding: "$7.3B+",
    founded: 2021,
    hq: "San Francisco, USA",
    employees: "500 - 1,000",
    website: "https://anthropic.com",
    tags: ["AI Safety", "Claude", "Constitutional AI"],
    category: "AI Safety",
    color: "from-amber-600 to-orange-500"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logo: "🔍",
    description: "Answering the world's questions by delivering real-time, sourced information with an AI search engine.",
    funding: "$165M+",
    founded: 2022,
    hq: "San Francisco, USA",
    employees: "100 - 250",
    website: "https://perplexity.ai",
    tags: ["AI Search", "Conversational AI", "LLM Citations"],
    category: "AI Search",
    color: "from-cyan-600 to-blue-500"
  },
  {
    id: "cursor",
    name: "Cursor",
    logo: "⌖",
    description: "The AI-first code editor designed to make engineers 10x more productive while writing, editing, and debugging code.",
    funding: "$105M+",
    founded: 2022,
    hq: "San Francisco, USA",
    employees: "10 - 50",
    website: "https://cursor.com",
    tags: ["AI Coding", "IDE", "Developer Tools"],
    category: "AI Coding",
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    logo: "🗣️",
    description: "Developing hyper-realistic AI audio and voice generation technology, making content accessible in any language.",
    funding: "$101M+",
    founded: 2022,
    hq: "London, UK",
    employees: "50 - 100",
    website: "https://elevenlabs.io",
    tags: ["AI Audio", "Voice Cloning", "Speech Synthesis"],
    category: "AI Voice",
    color: "from-pink-600 to-rose-500"
  },
  {
    id: "mistral",
    name: "Mistral AI",
    logo: "❄️",
    description: "An independent European AI laboratory specialized in creating state-of-the-art open-weights foundation models.",
    funding: "$640M+",
    founded: 2023,
    hq: "Paris, France",
    employees: "50 - 100",
    website: "https://mistral.ai",
    tags: ["Open Weights", "Europe", "Codestral"],
    category: "Foundation Models",
    color: "from-violet-500 to-purple-700"
  },
  {
    id: "groq",
    name: "Groq",
    logo: "🏎️",
    description: "Setting the standard for ultra-fast LPU (Language Processing Unit) real-time AI inference architectures.",
    funding: "$350M+",
    founded: 2016,
    hq: "Mountain View, USA",
    employees: "150 - 300",
    website: "https://groq.com",
    tags: ["Hardware", "LPU", "Inference speed"],
    category: "AI Hardware",
    color: "from-orange-500 to-yellow-500"
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    logo: "🤗",
    description: "The collaborative platform for great developer models, hosting open source code tools, models, and ML datasets.",
    funding: "$395M+",
    founded: 2016,
    hq: "New York, USA",
    employees: "200 - 500",
    website: "https://huggingface.co",
    tags: ["Open ML", "Hub", "Transformers"],
    category: "Community Platform",
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: "scale",
    name: "Scale AI",
    logo: "⚖️",
    description: "Modernizing AI development pipelines with the primary premium clean data engine for foundational model scaling.",
    funding: "$1.6B+",
    founded: 2016,
    hq: "San Francisco, USA",
    employees: "800 - 1,500",
    website: "https://scale.com",
    tags: ["RLHF", "Data Labeling", "Enterprise Data"],
    category: "AI Infrastructure",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "pinecone",
    name: "Pinecone",
    logo: "🌲",
    description: "A developer-first, fully managed vector database designed for lightning-fast semantic search and robust retrieval-augmented generation (RAG).",
    funding: "$138M+",
    founded: 2019,
    hq: "New York, USA",
    employees: "100 - 250",
    website: "https://pinecone.io",
    tags: ["Vector Database", "RAG", "Index retrieval"],
    category: "AI Cloud Database",
    color: "from-emerald-600 to-green-500"
  },
  {
    id: "langchain",
    name: "LangChain",
    logo: "🦜",
    description: "Building open source tools and orchestration layer libraries to safely chain LLMs, custom agents, and vector embeddings.",
    funding: "$25M+",
    founded: 2022,
    hq: "San Francisco, USA",
    employees: "10 - 50",
    website: "https://langchain.com",
    tags: ["AI Orchestration", "Agents", "Python Frameworks"],
    category: "AI Orchestration",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "cohere",
    name: "Cohere",
    logo: "🌀",
    description: "Empowering global enterprises with advanced neural retrieval, semantic embeddings, and multilingual transformer fine-tuning models.",
    funding: "$440M+",
    founded: 2019,
    hq: "Toronto, Canada",
    employees: "250 - 500",
    website: "https://cohere.com",
    tags: ["Enterprise LLMs", "Embeddings", "RAG Pipeline"],
    category: "Foundation Models",
    color: "from-teal-600 to-blue-600"
  },
  {
    id: "vercel",
    name: "Vercel",
    logo: "▲",
    description: "Providing developers with the optimal frontend cloud infrastructure for deploying fast React, Next.js, and AI web applications.",
    funding: "$340M+",
    founded: 2015,
    hq: "New York, USA",
    employees: "400 - 800",
    website: "https://vercel.com",
    tags: ["Next.js", "Serverless", "Edge Computing"],
    category: "Developer Cloud",
    color: "from-dark to-slate-900"
  }
];

export const SEED_COMPANIES: Company[] = RAW_COMPANIES.map(comp => ({
  ...comp,
  funding: convertTextToINR(comp.funding),
  description: convertTextToINR(comp.description),
}));

const RAW_CURATED_JOBS: Job[] = [
  {
    id: "openai-rlhf-researcher",
    title: "Staff RLHF Research Engineer",
    companyId: "openai",
    companyName: "OpenAI",
    companyLogo: "⚡",
    salary: 280000,
    salaryString: "$240,000 - $310,000",
    location: "San Francisco, CA",
    remote: "On-site",
    applyUrl: "https://openai.com/careers/staff-rlhf-research-engineer",
    experienceRequired: 6,
    experienceTier: "Senior",
    description: "We are seeking an outstanding Research Engineer to lead the design and execution of next-generation Reinforcement Learning from Human Feedback (RLHF) algorithms. You will train massive language models to be safer, highly aligned, and capable of complex multi-step reasoning.",
    tags: ["RLHF", "Deep Learning", "PyTorch", "Alignment"],
    postedAt: "2h ago",
    benefits: ["Full health cover", "Generous equity", "Catered gourmet meals", "Unlimited PTO"],
    isFeatured: true,
    department: "Research & Development"
  },
  {
    id: "anthropic-ml-scientist",
    title: "ML Research Scientist, Claude Core",
    companyId: "anthropic",
    companyName: "Anthropic",
    companyLogo: "▲",
    salary: 260000,
    salaryString: "$220,000 - $290,000",
    location: "San Francisco, CA",
    remote: "Hybrid",
    applyUrl: "https://anthropic.com/careers/ml-research-scientist",
    experienceRequired: 4,
    experienceTier: "Senior",
    description: "Join the core Claude scaling team to design, train, and test advanced transformer architectures. You will research and deploy techniques in mechanistic interpretability, training efficiency, or safety filters, directly pushing the frontier of Claude's capability.",
    tags: ["Scaling", "Transformer", "Mechanistic Interpretability", "Python"],
    postedAt: "4h ago",
    benefits: ["$250k+ base salary", "Robust health/wellness", "Venture equity", "Paid parent leave"],
    isFeatured: true,
    department: "AI Research"
  },
  {
    id: "cursor-ide-compiler",
    title: "Systems Engineer, IDE & Autocomplete",
    companyId: "cursor",
    companyName: "Cursor",
    companyLogo: "⌖",
    salary: 195000,
    salaryString: "$170,000 - $220,000",
    location: "San Francisco, CA",
    remote: "On-site",
    applyUrl: "https://cursor.sh/careers/systems-engineer-autocomplete",
    experienceRequired: 3,
    experienceTier: "Mid",
    description: "We are building the future editor of code. As an autocomplete systems engineer, you will design ultra-low latency rust modules to index user repositories, predict the next edit chunks, and pipe context efficiently to local and server GPUs in milliseconds.",
    tags: ["Rust", "WASM", "VS Code APIs", "Native Systems"],
    postedAt: "8h ago",
    benefits: ["Top 1% equity", "Newest high-end hardware", "Flexible remote days", "Comprehensive health"],
    isFeatured: true,
    department: "Core IDE Infrastructure"
  },
  {
    id: "perplexity-citations",
    title: "Founding ML Search Engineer",
    companyId: "perplexity",
    companyName: "Perplexity",
    companyLogo: "🔍",
    salary: 180000,
    salaryString: "$160,000 - $200,000",
    location: "San Francisco, CA",
    remote: "Hybrid",
    applyUrl: "https://perplexity.ai/careers/founding-ml-search",
    experienceRequired: 5,
    experienceTier: "Senior",
    description: "We are rebuilding search from scratch. You will work on combining real-time web crawler pipelines, neural ranking networks, and generative LLMs to answer conversational search prompts correctly within 800 milliseconds.",
    tags: ["Search Ranking", "Vector Databases", "Web Crawling", "LLM APIs"],
    postedAt: "1d ago",
    benefits: ["Valuable stock options", "Beautiful office in SF", "Commuter benefits", "Health insurance"],
    isFeatured: false,
    department: "Information Retrieval"
  },
  {
    id: "elevenlabs-voice-lead",
    title: "Audio Synthesis Research Lead",
    companyId: "elevenlabs",
    companyName: "ElevenLabs",
    companyLogo: "🗣️",
    salary: 210000,
    salaryString: "$180,000 - $240,000",
    location: "London, UK",
    remote: "Hybrid",
    applyUrl: "https://elevenlabs.io/careers/audio-synthesis-lead",
    experienceRequired: 5,
    experienceTier: "Senior",
    description: "Develop the state of the art in text-to-speech, sound effect generation, and real-time voice translation. You will manage advanced neural vocoders, diffusion audio networks, and low-latency audio streaming technology pipelines.",
    tags: ["Generative Audio", "Diffusion Models", "TTS", "CUDA C++"],
    postedAt: "2d ago",
    benefits: ["International work visa sponsorship", "Premium pension plan", "Yearly education allowance"],
    isFeatured: true,
    department: "Generative Audio Research"
  },
  {
    id: "openai-frontend",
    title: "Senior Frontend Engineer, ChatGPT Canvas",
    companyId: "openai",
    companyName: "OpenAI",
    companyLogo: "⚡",
    salary: 220000,
    salaryString: "$200,000 - $240,000",
    location: "San Francisco, CA",
    remote: "Hybrid",
    applyUrl: "https://openai.com/careers/senior-frontend-chatgpt-canvas",
    experienceRequired: 5,
    experienceTier: "Senior",
    description: "We are creating novel collaborative interfaces for AI. Work on building high-performance, real-time rich-text interactive canvas components, custom markdown renderers, and live multiplayer operational transform algorithms.",
    tags: ["React 19", "ProseMirror", "WebSockets", "CSS Grid"],
    postedAt: "3d ago",
    benefits: ["Top-tier standard benefits", "Free gourmet catering", "Annual learning stipend"],
    isFeatured: false,
    department: "Product UX Engineering"
  },
  {
    id: "anthropic-triage",
    title: "Security Engineer (Trust & Safety)",
    companyId: "anthropic",
    companyName: "Anthropic",
    companyLogo: "▲",
    salary: 165000,
    salaryString: "$150,000 - $185,000",
    location: "San Francisco, USA",
    remote: "Remote",
    applyUrl: "https://anthropic.com/careers/trust-and-safety-engineer",
    experienceRequired: 2,
    experienceTier: "Mid",
    description: "Help Anthropic secure and filter incoming data and align training with strict safety benchmarks. You will implement jailbreak detectors, monitor APIs for abusive prompt behavior, and collaborate with red-teaming experts.",
    tags: ["Jailbreaking", "Python Scripting", "Prompt Auditing", "OAuth security"],
    postedAt: "3d ago",
    benefits: ["Comprehensive medical plan", "Fully remote option", "Stipend for home office Setup"],
    isFeatured: false,
    department: "Security & Operations"
  },
  {
    id: "mistral-codestral-dev",
    title: "Founding Engineer, Codestral Agent",
    companyId: "mistral",
    companyName: "Mistral AI",
    salary: 190000,
    salaryString: "€160,000 - €210,000",
    location: "Paris, France",
    remote: "Hybrid",
    companyLogo: "❄️",
    applyUrl: "https://mistral.ai/jobs/codestral-founding-engineer",
    experienceRequired: 4,
    experienceTier: "Senior",
    description: "Join Mistral AI in Paris. Contribute directly to making our open weights developer-focused model Codestral highly reactive, with state-of-the-art auto-completions, contextual repository lookups, and function-calling interfaces.",
    tags: ["Open Source", "C++ Training", "Keras", "Model Quantization"],
    postedAt: "4d ago",
    benefits: ["French health scheme contribution", "Stock options package", "Central Paris office allowance"],
    isFeatured: false,
    department: "Open weights alignment"
  }
];

export const CURATED_JOBS: Job[] = RAW_CURATED_JOBS.map(job => ({
  ...job,
  salary: job.salary * 83,
  salaryString: convertTextToINR(job.salaryString),
  description: convertTextToINR(job.description),
  benefits: job.benefits.map(b => convertTextToINR(b)),
}));

const generateRealisticJobs = (): Job[] => {
  const list: Job[] = [...CURATED_JOBS];
  const targetCount = 1000;

  const roles = [
    { title: "Research Engineer", dept: "AI Research", tags: ["RLHF", "Deep Learning", "PyTorch", "Alignment"] },
    { title: "Full Stack Engineer", dept: "Product UX Engineering", tags: ["React 19", "TypeScript", "Node.js", "Tailwind"] },
    { title: "Systems Architect", dept: "Core Infrastructure", tags: ["Rust", "WASM", "C++", "Distributed Systems"] },
    { title: "MLOps Specialist", dept: "Security & Operations", tags: ["Kubernetes", "Docker", "Python", "GPU Orchestration"] },
    { title: "Research Scientist", dept: "Generative Media", tags: ["Diffusion Models", "PyTorch", "Audio Synthesis", "CUDA"] },
    { title: "Developer Advocate", dept: "Developer Relations", tags: ["Community", "Technical Writing", "API Design", "TypeScript"] },
    { title: "Security Specialist", dept: "Trust & Safety", tags: ["Red Teaming", "Jailbreaking", "Python", "Security Compliance"] },
    { title: "Product Manager", dept: "Product Management", tags: ["Product Strategy", "AI Agents", "UX", "Roadmapping"] },
    { title: "Data Engineer", dept: "Data Engine", tags: ["Spark", "PostgreSQL", "Python", "Vector Databases"] },
    { title: "Infrastructure Engineer", dept: "Core Infrastructure", tags: ["Go", "Linux", "Terraform", "TCP/IP"] },
    { title: "Backend Engineer", dept: "API Engineering", tags: ["Node.js", "REST APIs", "GraphQL", "FastAPI"] },
    { title: "Compiler Engineer", dept: "Core IDE Infrastructure", tags: ["LLVM", "Rust", "C++", "Static Analysis"] }
  ];

  const seniorities = [
    { prefix: "Associate", exp: 1, tier: "Junior" as const, salaryMultiplier: 0.7 },
    { prefix: "Junior", exp: 2, tier: "Junior" as const, salaryMultiplier: 0.65 },
    { prefix: "", exp: 3, tier: "Mid" as const, salaryMultiplier: 1.0 },
    { prefix: "Senior", exp: 5, tier: "Senior" as const, salaryMultiplier: 1.3 },
    { prefix: "Lead", exp: 6, tier: "Senior" as const, salaryMultiplier: 1.45 },
    { prefix: "Staff", exp: 7, tier: "Senior" as const, salaryMultiplier: 1.6 },
    { prefix: "Principal", exp: 9, tier: "Senior" as const, salaryMultiplier: 1.9 }
  ];

  const companiesPool = SEED_COMPANIES;

  const locations = [
    { text: "San Francisco, CA", remote: "On-site" as const },
    { text: "San Francisco, CA", remote: "Hybrid" as const },
    { text: "London, UK", remote: "Hybrid" as const },
    { text: "Paris, France", remote: "Hybrid" as const },
    { text: "Seattle, WA", remote: "On-site" as const },
    { text: "New York, NY", remote: "On-site" as const },
    { text: "Austin, TX", remote: "Hybrid" as const },
    { text: "Remote", remote: "Remote" as const }
  ];

  const benefitsPool = [
    "Full medical & dental coverage",
    "Generous equity/stock options",
    "Flexible parental leave",
    "Catered gourmet lunches daily",
    "Home office setup stipend (₹1.6 Lakhs)",
    "Unlimited PTO with 4 weeks mandatory",
    "Health and wellness allowance",
    "Annual learning budget (₹2.5 Lakhs)",
    "Commuter transit benefits"
  ];

  let idCounter = 1;
  while (list.length < targetCount) {
    const roleIdx = (idCounter * 3) % roles.length;
    const senIdx = (idCounter * 7) % seniorities.length;
    const compIdx = (idCounter * 11) % companiesPool.length;
    const locIdx = (idCounter * 13) % locations.length;

    const baseRole = roles[roleIdx];
    const seniority = seniorities[senIdx];
    const company = companiesPool[compIdx];
    const loc = locations[locIdx];

    const title = seniority.prefix 
      ? `${seniority.prefix} ${baseRole.title}` 
      : baseRole.title;

    const baseSalNum = 150000;
    const finalSalNum = Math.floor(baseSalNum * seniority.salaryMultiplier + (idCounter % 15) * 2000);
    const salMin = finalSalNum - 15000;
    const salMax = finalSalNum + 20000;

    // Convert values to Indian Rupees
    const finalInr = finalSalNum * 83;
    const minInr = salMin * 83;
    const maxInr = salMax * 83;
    const salaryString = `${formatCurrencyINR(minInr)} - ${formatCurrencyINR(maxInr)}`;

    const tags = [...baseRole.tags];
    if (loc.remote === "Remote") tags.push("Remote Only");
    if (seniority.tier === "Senior") tags.push("Leadership");

    const daysAgo = (idCounter % 12) + 1;
    const postedAt = daysAgo === 1 ? "1d ago" : `${daysAgo}d ago`;

    const selectedBenefits: string[] = [];
    const bCount = 3 + (idCounter % 3);
    for (let b = 0; b < bCount; b++) {
      const bIdx = (idCounter + b * 2) % benefitsPool.length;
      if (!selectedBenefits.includes(benefitsPool[bIdx])) {
        selectedBenefits.push(benefitsPool[bIdx]);
      }
    }

    const jobDescription = `We are looking for a highly capable ${title} to join the ${baseRole.dept} team at ${company.name}. In this role, you will help design and scale state-of-the-art computational layers, improve system workflows, and contribute to cutting-edge tech integration across our platform. Ideal candidates possess deep experience in key tooling like ${tags[0]} and ${tags[1]}, combined with strong communication skills and passion for high quality software patterns.`;

    const generatedJob: Job = {
      id: `gen-job-${idCounter}`,
      title,
      companyId: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      salary: finalInr,
      salaryString,
      location: loc.text,
      remote: loc.remote,
      applyUrl: `${company.website}/careers/${title.toLowerCase().replace(/\s+/g, "-")}`,
      experienceRequired: seniority.exp,
      experienceTier: seniority.tier,
      description: jobDescription,
      tags,
      postedAt,
      benefits: selectedBenefits,
      isFeatured: (idCounter % 10) === 0,
      department: baseRole.dept
    };

    list.push(generatedJob);
    idCounter++;
  }

  return list;
};

export const SEED_JOBS: Job[] = generateRealisticJobs();

export const STATISTICS = {
  totalJobs: 1000,
  startupsTracking: 254,
  fundingThisQuarter: "₹1.03 Lakh Crores",
  averageSalary: "₹1.62 Crores",
};
