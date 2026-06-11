export interface AIFounder {
  id: string;
  name: string;
  company: string;
  avatar: string; // emoji or design placeholder
  avatarBg: string; // color classes
  bio: string;
  focus: string;
  techStack: string[];
  capitalRaised: string;
  metrics: { label: string; value: string }[];
  quote: string;
  openRoles: number;
  highlightColor: string;
}

export const AT_LAS_FOUNDERS: AIFounder[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    company: "OpenAI",
    avatar: "🪐",
    avatarBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    bio: "Co-founded OpenAI with the mission of ensuring that artificial general intelligence benefits all of humanity. Pioneer of heavy scaling and GPT series models.",
    focus: "Foundation Systems & AGI Alignment",
    techStack: ["PyTorch", "Kubernetes", "Ray", "Triton"],
    capitalRaised: "$17.8B",
    metrics: [
      { label: "Active Users", value: "250M+" },
      { label: "Compute Cluster Size", value: "300k+ GPUs" },
      { label: "Valuation", value: "$150B" }
    ],
    quote: "Scaling rules are empirical laws of nature. The magic of adding layers and parameters is that new behaviors simply emerge.",
    openRoles: 14,
    highlightColor: "#10b981"
  },
  {
    id: "dario-amodei",
    name: "Dario Amodei",
    company: "Anthropic",
    avatar: "💮",
    avatarBg: "bg-amber-50 text-amber-700 border-amber-100",
    bio: "Former VP of Research at OpenAI, co-founded Anthropic to build highly aligned, reliable, and steerable AI systems with Constitutional AI principles.",
    focus: "AI Alignment & Safety Science",
    techStack: ["Python", "PyTorch", "Jax", "AWS Trainium"],
    capitalRaised: "$8.4B",
    metrics: [
      { label: "Model Family", value: "Claude 3.5" },
      { label: "Adoption Rate", value: "84% of Fortune 500" },
      { label: "Safety Level", value: "ASL-2 Confirmed" }
    ],
    quote: "If we don't understand the internal circuitry of our neural architectures, keeping them safe will eventually depend on luck.",
    openRoles: 9,
    highlightColor: "#d97706"
  },
  {
    id: "arthur-mensch",
    name: "Arthur Mensch",
    company: "Mistral AI",
    avatar: "⛰️",
    avatarBg: "bg-orange-50 text-orange-600 border-orange-150",
    bio: "Co-founded Mistral AI in Paris. Leading Europe’s open-weights revolution with fast, highly optimized Mixture of Experts (MoE) architectures.",
    focus: "Open Weights & Model Optimization",
    techStack: ["C++", "CUDA", "vLLM", "FlashAttention"],
    capitalRaised: "$640M",
    metrics: [
      { label: "Model Weight Type", value: "Open Weights" },
      { label: "MoE Active Ratio", value: "2/8 Active" },
      { label: "Inference Speed", value: "110 tok/sec" }
    ],
    quote: "Open models are key to securing technical sovereignty and fostering a diverse, global ecosystem of AI tooling.",
    openRoles: 5,
    highlightColor: "#ea580c"
  },
  {
    id: "alexandr-wang",
    name: "Alexandr Wang",
    company: "Scale AI",
    avatar: "📐",
    avatarBg: "bg-blue-50 text-blue-600 border-blue-105",
    bio: "Founded Scale AI to provide the high-quality human-in-the-loop and synthetic training workflows necessary to power frontier AI architectures.",
    focus: "Data Pipelines & RLHF Tuning",
    techStack: ["Next.js", "MongoDB", "PostgreSQL", "RLHF Engines"],
    capitalRaised: "$1.6B",
    metrics: [
      { label: "Annotator Pool", value: "200k+ Domain Experts" },
      { label: "Government Contracts", value: "$240M+" },
      { label: "Valuation", value: "$13.8B" }
    ],
    quote: "AI is a function of compute and data. Clean reinforcement data is the absolute catalyst that turns raw base models into active agents.",
    openRoles: 11,
    highlightColor: "#2563eb"
  },
  {
    id: "denis-yarats",
    name: "Denis Yarats",
    company: "Perplexity AI",
    avatar: "🔍",
    avatarBg: "bg-teal-50 text-teal-700 border-teal-100",
    bio: "Co-founded Perplexity to replace traditional search engines with direct, real-time citation-backed answers derived by system execution swarms.",
    focus: "Cognitive Retrieval & Answer Actions",
    techStack: ["NodeJS", "Redis", "ElasticSearch", "Triton Kernels"],
    capitalRaised: "$510M",
    metrics: [
      { label: "Queries / Day", value: "15M+ Actions" },
      { label: "Database Coverage", value: "100% Real-time Web" },
      { label: "Valuation", value: "$3B" }
    ],
    quote: "Our target isn't returning links. It's direct action orchestration over high-context knowledge indices.",
    openRoles: 6,
    highlightColor: "#0d9488"
  },
  {
    id: "arvid-lunnemar",
    name: "Arvid Lunnemar",
    company: "Cursor (Anysphere)",
    avatar: "⚡",
    avatarBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
    bio: "Pioneering AI-native developer setups at Anysphere. Built Cursor to make IDEs context-aware and agent-driven from the ground up.",
    focus: "IDE Integrations & Context Compilation",
    techStack: ["VSCode Core", "Rust", "TypeScript", "WASM"],
    capitalRaised: "$140M",
    metrics: [
      { label: "DAU Engineers", value: "85k+ Active" },
      { label: "Context Compress Rate", value: "92.4% Efficacy" },
      { label: "Telemetry Speed", value: "140ms Round-trip" }
    ],
    quote: "We want to merge the editor's AST index and the AI's generation heads into a single, cohesive, self-correcting loop.",
    openRoles: 4,
    highlightColor: "#4f46e5"
  }
];

export interface ComputeEstimateResult {
  flops: string;
  gpuDays: number;
  costEstimate: string;
  standardClusterSize: number;
  recommendedHardware: string;
}

export function calculateComputeEstimate(
  parametersBillion: number,
  tokensTrillion: number,
  hardwareType: "H105" | "H200" | "Blackwell",
  gpuCount: number,
  mfuEfficiency: number // e.g. 45
): ComputeEstimateResult {
  // Chinchilla calculation standard: Floating Point Operations (Flops) = 6 * N * P
  // N = parameters count = parametersBillion * 10^9
  // P = token count = tokensTrillion * 10^12
  const parameters = parametersBillion * 1e9;
  const tokens = tokensTrillion * 1e12;
  const totalFlopsRequired = 6 * parameters * tokens;

  // Let's analyze GPU speeds:
  // H100 (SXM5): FP8 Tensor core performance: 1.9 PFLOPS. With Sparsity, let's take dense performance: 989 TFLOPS (9.89e14 FLOPS).
  // H200: similar dense, slightly faster memory bandwidth. Let's say 1.1e15 FLOPS.
  // Blackwell (B200): ~2.2e15 FLOPS dense.
  let gpuFlopsPerSecond = 9.89e14; // H100 SXM density baseline
  let costPerHour = 2.45; // $ rent price
  let hwName = "Nvidia H100 SXM5";

  if (hardwareType === "H200") {
    gpuFlopsPerSecond = 1.15e15;
    costPerHour = 3.25;
    hwName = "Nvidia H200 (141GB)";
  } else if (hardwareType === "Blackwell") {
    gpuFlopsPerSecond = 2.4e15;
    costPerHour = 4.80;
    hwName = "Nvidia Blackwell B200";
  }

  // Multiply by model FLOPs utilization (MFU)
  const effectiveGpuFlops = gpuFlopsPerSecond * (mfuEfficiency / 100);

  // Total seconds needed for training on 1 GPU
  const totalGpuSeconds = totalFlopsRequired / effectiveGpuFlops;
  const totalSecondsWithCluster = totalGpuSeconds / gpuCount;

  const gpuDays = Math.ceil(totalSecondsWithCluster / 86400);

  // Cost calculation
  // Total hours = (totalGpuSeconds) / 3600
  const totalGpuHours = totalGpuSeconds / 3600;
  const computedCost = totalGpuHours * costPerHour;

  // Format cost
  let costString = "";
  if (computedCost >= 1e7) {
    costString = `$${(computedCost / 1e6).toFixed(1)}M USD`;
  } else if (computedCost >= 1e5) {
    costString = `$${(computedCost / 1e3).toFixed(0)}k USD`;
  } else {
    costString = `$${computedCost.toFixed(0)} USD`;
  }

  // Format Flops to scientific/exascale
  const exaflopsVal = totalFlopsRequired / 1e24; // 10^24 is Yottaflops, 10^18 is exaflops (EFLOPs)
  const flopsString = `${(totalFlopsRequired / 1e18).toFixed(2)} EFLOPs`;

  return {
    flops: flopsString,
    gpuDays: Math.max(1, gpuDays),
    costEstimate: costString,
    standardClusterSize: gpuCount,
    recommendedHardware: hwName
  };
}
