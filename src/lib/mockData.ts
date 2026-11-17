export interface AppBuilt {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: number;
  tags?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "ENTREPRENEUR" | "LAWYER" | "INVESTOR" | "USER";
  profession: string;
  bio: string;
  avatar: string;
  bannerImage?: string;
  phone?: string;
  contactEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  appsBuilt: AppBuilt[];
  posts: Post[];
  skills: string[];
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  category: "FinTech" | "HealthTech" | "AI & ML" | "Hardware & IoT" | "EdTech" | "CleanTech" | "SaaS";
  stage: "Idea" | "Prototype" | "Seed" | "Series A" | "Bootstrapped";
  fundingNeeded: string;
  founderId: string;
  founderName: string;
  founderRole: string;
  founderAvatar: string;
  website?: string;
  complianceScore: number;
  tags: string[];
  metrics: {
    users?: string;
    arr?: string;
    growth?: string;
  };
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Software & SaaS" | "AI Models & Agents" | "Hardware & Devices";
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  demoUrl?: string;
  downloadUrl?: string;
  features: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRole: string;
  image: string;
  badge?: string;
}

export interface LegalAdvocate {
  id: string;
  name: string;
  title: string;
  firm: string;
  experienceYears: number;
  barCouncilNumber: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  avatar: string;
  hourlyRate: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  verified: boolean;
  languages: string[];
}

export interface GovtPortal {
  id: string;
  name: string;
  authority: string;
  url: string;
  category: "Incorporation" | "Taxation" | "Intellectual Property" | "Startup Recognition" | "Compliance";
  description: string;
  documentsNeeded: string[];
  estimatedDays: string;
  feeEstimate: string;
  officialTag: string;
}

// ---------------------------------------------------------------------------
// Seed Data
// ---------------------------------------------------------------------------

export const MOCK_USERS: UserProfile[] = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    email: "aarav@neuroflow.ai",
    role: "ENTREPRENEUR",
    profession: "Founder & AI Systems Architect",
    bio: "Building autonomous agent pipelines for clinical trials. Ex-DeepMind research fellow. Passionate about healthtech, distributed systems, and open-source tooling.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    contactEmail: "aarav.ventures@gmail.com",
    githubUrl: "https://github.com/aarav-sharma-ai",
    linkedinUrl: "https://linkedin.com/in/aarav-sharma-neuro",
    portfolioUrl: "https://aarav.dev",
    location: "Bengaluru, India",
    skills: ["Next.js", "Python", "PyTorch", "FastAPI", "Vector DBs", "PostgreSQL"],
    appsBuilt: [
      {
        id: "app-1",
        title: "NeuroFlow Engine",
        description: "Decentralized inference framework for fine-tuned biomedical LLMs with verifiable zero-knowledge privacy.",
        techStack: ["Python", "Rust", "Ray", "Triton"],
        liveUrl: "https://neuroflow.ai",
        repoUrl: "https://github.com/neuroflow/engine",
      },
      {
        id: "app-2",
        title: "MedParse Agent",
        description: "Open-source FHIR schema transformer & automated clinical document classifier.",
        techStack: ["TypeScript", "Next.js", "ChromaDB"],
        liveUrl: "https://medparse.clearlaunch.dev",
        repoUrl: "https://github.com/aarav-sharma/medparse",
      },
    ],
    posts: [
      {
        id: "post-1",
        authorId: "user-1",
        content: "Just filed our provisional patent for distributed clinical validation! Huge thanks to Clear Launch's legal advocates for streamlining our documentation.",
        createdAt: "2 days ago",
        likes: 38,
        tags: ["milestone", "legal", "patent"],
      },
      {
        id: "post-2",
        authorId: "user-1",
        content: "Looking for an experienced Lead Embedded Hardware Engineer to help develop our edge biometric scanner. Reach out if you're excited by IoT!",
        createdAt: "5 days ago",
        likes: 24,
        tags: ["hiring", "hardware", "cofounder"],
      },
    ],
  },
  {
    id: "user-2",
    name: "Adv. Meera Sen",
    email: "meera.sen@senassociates.law",
    role: "LAWYER",
    profession: "Senior Corporate Advocate & Startup Counsel",
    bio: "Advocate with 12+ years representing venture-backed startups in Delaware, Singapore, and India. Specialized in Section 8 companies, SPICe+ filings, ESOP schemes, and cross-border IP licensing.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+91 91234 56789",
    contactEmail: "legal@senassociates.law",
    githubUrl: "https://github.com/legal-tech-open",
    linkedinUrl: "https://linkedin.com/in/adv-meera-sen",
    portfolioUrl: "https://senassociates.law",
    location: "New Delhi & Singapore",
    skills: ["Corporate Law", "MCA Portals", "ESOP Structuring", "IP Licensing", "Series Seed / A Term Sheets"],
    appsBuilt: [
      {
        id: "app-3",
        title: "CapTable Clause Generator",
        description: "Free automated standard SAFE and convertible note term builder for early-stage founders.",
        techStack: ["React", "Tailwind", "PDFKit"],
        liveUrl: "https://captable.senassociates.law",
      },
    ],
    posts: [
      {
        id: "post-3",
        authorId: "user-2",
        content: "Quick reminder for founders: Always register your Trademark before making your product publicly available on Product Hunt or GitHub to avoid claim disputes.",
        createdAt: "1 day ago",
        likes: 89,
        tags: ["legalTip", "trademark", "startups"],
      },
    ],
  },
  {
    id: "user-3",
    name: "Vikram Singhania",
    email: "vikram@singhaniaventures.com",
    role: "INVESTOR",
    profession: "General Partner, Singhania Horizon Fund",
    bio: "Early-stage micro VC backing B2B SaaS, Hardware IoT, and AI infrastructure founders. Portfolio includes 18 companies across India and Southeast Asia.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 99887 76655",
    contactEmail: "invest@singhaniaventures.com",
    githubUrl: "https://github.com/vikram-horizon",
    linkedinUrl: "https://linkedin.com/in/vikram-singhania-vc",
    portfolioUrl: "https://singhaniaventures.com",
    location: "Mumbai, India",
    skills: ["Seed Funding", "Due Diligence", "Go-To-Market", "B2B Sales", "Tokenomics"],
    appsBuilt: [
      {
        id: "app-4",
        title: "SeedRunway Calculator",
        description: "Financial modeling tool for pre-seed founders to project runway under multiple burn scenarios.",
        techStack: ["Next.js", "Chart.js"],
        liveUrl: "https://runway.singhaniaventures.com",
      },
    ],
    posts: [
      {
        id: "post-4",
        authorId: "user-3",
        content: "We just deployed $250k into our latest portfolio company sourced directly from Clear Launch's Compliance Verified pipeline. The quality of documentation saves 3 weeks of diligence!",
        createdAt: "3 days ago",
        likes: 112,
        tags: ["investing", "dealflow", "seed"],
      },
    ],
  },
  {
    id: "user-4",
    name: "Ananya Deshmukh",
    email: "ananya@voltix.tech",
    role: "ENTREPRENEUR",
    profession: "Hardware Engineer & IoT Founder",
    bio: "Ex-Tesla battery management systems engineer. Now creating modular solar micro-inverters and low-power smart mesh telemetry for agricultural automation.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phone: "+91 94567 89012",
    contactEmail: "ananya@voltix.tech",
    githubUrl: "https://github.com/ananya-voltix",
    linkedinUrl: "https://linkedin.com/in/ananya-deshmukh-hw",
    portfolioUrl: "https://voltix.tech",
    location: "Pune, India",
    skills: ["Embedded C/C++", "KiCAD", "ESP32", "Firmware", "MQTT", "Industrial IoT"],
    appsBuilt: [
      {
        id: "app-5",
        title: "VoltMesh Telemetry",
        description: "Low-latency LoRaWAN node monitoring dashboard with real-time solar yield predictive graphs.",
        techStack: ["C++", "Next.js", "WebSockets", "TimescaleDB"],
        liveUrl: "https://voltix.tech/demo",
        repoUrl: "https://github.com/ananya-voltix/voltmesh",
      },
    ],
    posts: [
      {
        id: "post-5",
        authorId: "user-4",
        content: "Batch 1 of our Voltix Dev Kits is live on the Clear Launch Marketplace! Excited to see what smart agriculture projects the community builds.",
        createdAt: "4 days ago",
        likes: 67,
        tags: ["hardware", "iot", "productLaunch"],
      },
    ],
  },
];

export const MOCK_STARTUPS: Startup[] = [
  {
    id: "startup-1",
    name: "NeuroFlow Clinical",
    tagline: "Autonomous AI-agent pipeline for high-compliance clinical trials",
    description: "NeuroFlow automates regulatory documentation, patient cohort eligibility screening, and trial data verification while maintaining strict HIPAA & FDA Part 11 electronic records compliance.",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&auto=format&fit=crop&q=80",
    category: "AI & ML",
    stage: "Seed",
    fundingNeeded: "$500,000",
    founderId: "user-1",
    founderName: "Aarav Sharma",
    founderRole: "CEO & Co-Founder",
    founderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    website: "https://neuroflow.ai",
    complianceScore: 98,
    tags: ["HIPAA Verified", "FDA Part 11", "Delaware C-Corp", "Patent Pending"],
    metrics: {
      users: "14 Hospital Labs",
      arr: "$180,000",
      growth: "+32% MoM",
    },
  },
  {
    id: "startup-2",
    name: "Voltix Energy Grid",
    tagline: "Decentralized solar micro-inverter mesh with automated yield trading",
    description: "Voltix builds plug-and-play smart inverters that network across rural agricultural clusters to balance loads and monetize surplus clean energy via local micro-grids.",
    logo: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=100&auto=format&fit=crop&q=80",
    category: "Hardware & IoT",
    stage: "Prototype",
    fundingNeeded: "$350,000",
    founderId: "user-4",
    founderName: "Ananya Deshmukh",
    founderRole: "Founder & CTO",
    founderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    website: "https://voltix.tech",
    complianceScore: 92,
    tags: ["CE Certified", "Udyam MSME Registered", "Green Tech", "Hardware"],
    metrics: {
      users: "45 Farm Pilot Sites",
      arr: "$42,000",
      growth: "+18% MoM",
    },
  },
  {
    id: "startup-3",
    name: "FinPulse Ledger",
    tagline: "Cross-border instant GST & VAT reconciliation for global merchants",
    description: "Real-time automated tax withholding, e-invoicing generation, and compliance escrow for cross-border SaaS companies selling into Southeast Asia and India.",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80",
    category: "FinTech",
    stage: "Series A",
    fundingNeeded: "$1,200,000",
    founderId: "user-1",
    founderName: "Aarav Sharma",
    founderRole: "Strategic Advisor",
    founderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    website: "https://finpulse.io",
    complianceScore: 99,
    tags: ["RBI Regulated Sandbox", "GST Compliant", "SOC 2 Type II", "Singapore Pte Ltd"],
    metrics: {
      users: "2,400+ Merchants",
      arr: "$940,000",
      growth: "+45% YoY",
    },
  },
  {
    id: "startup-4",
    name: "SkillNexus AI",
    tagline: "Adaptive technical curriculum and verifiable dev portfolio minting",
    description: "An AI tutor that reviews pull requests, creates custom computer science labs, and proves candidate mastery through cryptographically signed code assessments.",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    category: "EdTech",
    stage: "Seed",
    fundingNeeded: "$400,000",
    founderId: "user-4",
    founderName: "Ananya Deshmukh",
    founderRole: "Co-Founder",
    founderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    website: "https://skillnexus.dev",
    complianceScore: 90,
    tags: ["EdTech", "B2B SaaS", "DPIIT Recognized", "Startup India"],
    metrics: {
      users: "12,000 Devs",
      arr: "$110,000",
      growth: "+22% MoM",
    },
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Sovereign SaaS Pro Boilerplate",
    tagline: "Production-ready Next.js 16, Auth.js, Prisma, Stripe & Tailwind v4 Starter",
    description: "Complete full-stack code repository including multi-tenancy, RBAC permissions, transactional email templates, webhook listeners, and dynamic billing subscriptions. Cut 6 weeks off your launch cycle.",
    category: "Software & SaaS",
    price: 79,
    currency: "USD",
    rating: 4.9,
    reviewsCount: 142,
    demoUrl: "https://demo.sovereignsaas.dev",
    features: ["Next.js 16 App Router", "Full Auth.js v5 RBAC", "Prisma ORM with PostgreSQL/SQLite", "Stripe Checkout & Billing Portal", "Tailwind CSS v4 Dual Theme"],
    sellerId: "user-1",
    sellerName: "Aarav Sharma",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    sellerRole: "Entrepreneur & Architect",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    badge: "Bestseller",
  },
  {
    id: "prod-2",
    title: "LexiGuard Legal RAG Pipeline",
    tagline: "Pre-indexed ChromaDB vector knowledge base for startup corporate laws",
    description: "Includes parsed legal frameworks for Indian MCA, US Delaware, UK Companies House, and Singapore ACRA. Comes with LangChain & Gemini retrieval pipelines and automatic citation formatters.",
    category: "AI Models & Agents",
    price: 149,
    currency: "USD",
    rating: 4.8,
    reviewsCount: 88,
    demoUrl: "https://lexiguard.clearlaunch.dev",
    features: ["ChromaDB & Pinecone ready", "35,000+ Legal Statute Chunks", "Prompt injection defense layers", "Gemini 2.0 Flash optimized", "Direct PDF legal citation engine"],
    sellerId: "user-2",
    sellerName: "Adv. Meera Sen",
    sellerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    sellerRole: "Corporate Advocate",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    badge: "Verified Law-Tech",
  },
  {
    id: "prod-3",
    title: "Voltix ESP32 Smart Edge Node",
    tagline: "Industrial IoT Dev Kit with LoRa, RS485, Solar MPPT & Encrypted Flash",
    description: "A plug-and-play development board designed for rapid prototyping of industrial sensors, environmental telemetry, and smart energy monitors. Ships worldwide with pre-flashed OpenTelemetry firmware.",
    category: "Hardware & Devices",
    price: 64,
    currency: "USD",
    rating: 5.0,
    reviewsCount: 56,
    demoUrl: "https://voltix.tech/docs/hardware",
    features: ["Dual-Core Xtensa LX7 @ 240MHz", "SX1262 LoRa Radio (868/915MHz)", "Built-in MPPT solar battery charger", "Hardware cryptographic accelerator", "IP67 weatherproof casing included"],
    sellerId: "user-4",
    sellerName: "Ananya Deshmukh",
    sellerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    sellerRole: "Hardware Engineer",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    badge: "Hardware Favorite",
  },
  {
    id: "prod-4",
    title: "OmniAgent Autonomous Outreach Bot",
    tagline: "Fine-tuned tool-calling AI agent for investor discovery & warm pitch drafting",
    description: "Scrapes Crunchbase, LinkedIn, and AngelList to map investor investment theses and automatically drafts hyper-personalized, compliance-safe warm pitch decks.",
    category: "AI Models & Agents",
    price: 99,
    currency: "USD",
    rating: 4.7,
    reviewsCount: 73,
    demoUrl: "https://omniagent.clearlaunch.dev",
    features: ["Autonomous multi-step research loop", "Contextual pitch deck alignment", "Anti-hallucination guardrails", "Custom CRM integrations", "Export to Google Slides / Notion"],
    sellerId: "user-1",
    sellerName: "Aarav Sharma",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    sellerRole: "AI Architect",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
  },
];

export const MOCK_ADVOCATES: LegalAdvocate[] = [
  {
    id: "adv-1",
    name: "Adv. Meera Sen",
    title: "Managing Partner, Sen & Associates Corporate Law",
    firm: "Sen & Associates",
    experienceYears: 12,
    barCouncilNumber: "D/1482/2012",
    rating: 4.95,
    reviewsCount: 184,
    specialties: ["Company Incorporation (Pvt Ltd, LLP)", "IP Trademark & Patents", "Startup India Tax Exemptions", "Cross-Border Structuring"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    hourlyRate: "$90 / hr",
    email: "meera.sen@senassociates.law",
    phone: "+91 91234 56789",
    location: "New Delhi & Singapore",
    bio: "Advised over 250+ tech founders from seed stage through Series B. Former in-house counsel at a top tier fintech unicorn. Dedicated to fast-turnaround, jargon-free startup legal navigation.",
    verified: true,
    languages: ["English", "Hindi", "Bengali"],
  },
  {
    id: "adv-2",
    name: "Adv. Rajesh Kothari",
    title: "Senior Partner, Kothari & Chambers Law",
    firm: "Kothari & Chambers",
    experienceYears: 16,
    barCouncilNumber: "MAH/2930/2008",
    rating: 4.9,
    reviewsCount: 220,
    specialties: ["RBI Fintech Licensing", "Data Privacy & GDPR", "Founders' Agreement Drafting", "Dispute Resolution"],
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&auto=format&fit=crop&q=80",
    hourlyRate: "$110 / hr",
    email: "rajesh@kotharilaw.in",
    phone: "+91 98200 12345",
    location: "Mumbai, India",
    bio: "Expertise in digital lending regulations, NBFC tie-ups, payment gateway compliance, and comprehensive customer terms of service.",
    verified: true,
    languages: ["English", "Hindi", "Gujarati", "Marathi"],
  },
  {
    id: "adv-3",
    name: "Adv. Sarah Jenkins",
    title: "Lead Counsel, CrossBorder Tech Legal",
    firm: "Jenkins Global Tech Law",
    experienceYears: 9,
    barCouncilNumber: "SRA-649210 / NY-51203",
    rating: 4.88,
    reviewsCount: 96,
    specialties: ["Delaware C-Corp Flip", "Y Combinator SAFE Financing", "US Visa (O-1 / EB-2 NIW)", "SaaS Terms & Privacy"],
    avatar: "https://images.unsplash.com/photo-1580894732488-825501867c48?w=150&auto=format&fit=crop&q=80",
    hourlyRate: "$150 / hr",
    email: "s.jenkins@jenkinsglobal.com",
    phone: "+1 (415) 890-4321",
    location: "San Francisco, CA & London",
    bio: "Helps international founders establish US entities, issue stock options to US hires, and negotiate clean term sheets with American venture funds.",
    verified: true,
    languages: ["English", "French"],
  },
];

export const MOCK_GOVT_PORTALS: GovtPortal[] = [
  {
    id: "portal-1",
    name: "MCA Portal (Ministry of Corporate Affairs)",
    authority: "Government of India",
    url: "https://www.mca.gov.in",
    category: "Incorporation",
    description: "The primary portal for filing SPICe+ (Part A for name reservation and Part B for incorporation, PAN, TAN, EPFO, ESIC, and bank account opening in one single submission).",
    documentsNeeded: ["Director Digital Signature (DSC)", "PAN & Aadhaar of all Directors", "Proof of Registered Office (Electricity Bill + NOC)", "MOA & AOA Declarations"],
    estimatedDays: "3 - 7 business days",
    feeEstimate: "₹1,000 - ₹4,000 (Govt fees exempt for up to ₹15 Lakhs capital)",
    officialTag: "mca.gov.in",
  },
  {
    id: "portal-2",
    name: "Startup India Hub (DPIIT)",
    authority: "Ministry of Commerce & Industry",
    url: "https://www.startupindia.gov.in",
    category: "Startup Recognition",
    description: "Apply for official DPIIT recognition to unlock 3-year Section 80-IAC Income Tax exemption, exemption from Angel Tax (Section 56(2)(viib)), fast-track patent processing, and government tender exemptions.",
    documentsNeeded: ["Certificate of Incorporation", "Pitch Deck / Writeup on Innovation", "Website URL / Video link", "Director Details"],
    estimatedDays: "2 - 5 business days",
    feeEstimate: "100% Free / Nil",
    officialTag: "startupindia.gov.in",
  },
  {
    id: "portal-3",
    name: "Udyam Registration Portal (MSME)",
    authority: "Ministry of Micro, Small and Medium Enterprises",
    url: "https://udyamregistration.gov.in",
    category: "Compliance",
    description: "Zero-cost paperless MSME registration certificate enabling priority lending, interest rate concessions, collateral-free credit guarantees (CGTMSE), and protection against delayed payments.",
    documentsNeeded: ["Aadhaar Number of Applicant", "PAN of Enterprise / Proprietor", "Bank Account Details", "NIC Business Activity Code"],
    estimatedDays: "Instant (1 - 2 days for certificate)",
    feeEstimate: "100% Free of Cost",
    officialTag: "udyamregistration.gov.in",
  },
  {
    id: "portal-4",
    name: "GST Portal (Goods & Services Tax)",
    authority: "Central Board of Indirect Taxes and Customs",
    url: "https://www.gst.gov.in",
    category: "Taxation",
    description: "Mandatory for interstate commerce, e-commerce operators, and businesses with annual turnover exceeding threshold (₹20L/₹40L). Required to sell goods or software globally.",
    documentsNeeded: ["PAN Card of Entity", "Aadhaar authentication of Authorized Signatory", "Bank Account Cancelled Cheque", "Proof of Principal Place of Business"],
    estimatedDays: "3 - 7 working days (with Aadhaar OTP)",
    feeEstimate: "Nil (Free)",
    officialTag: "gst.gov.in",
  },
  {
    id: "portal-5",
    name: "IP India (Controller General of Patents, Designs & Trademarks)",
    authority: "Department for Promotion of Industry and Internal Trade",
    url: "https://ipindia.gov.in",
    category: "Intellectual Property",
    description: "Register trademarks for your startup brand name/logo (Form TM-A), file provisional/complete patents, and protect software algorithms & designs with an 80% fee rebate for recognized startups.",
    documentsNeeded: ["Brand Logo / Name specification", "User Affidavit & Proof of First Use", "Form 48 Power of Attorney", "DPIIT Recognition Certificate (for 80% discount)"],
    estimatedDays: "Instant acknowledgement, 6-12 months examination",
    feeEstimate: "₹4,500 (DPIIT startup / individual) vs ₹9,000 standard",
    officialTag: "ipindia.gov.in",
  },
];
