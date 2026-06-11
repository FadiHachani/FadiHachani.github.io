// Single source of truth for portfolio content.
// Facts drawn from Fadi's CV and the real project repositories
// (Déligo = NestJS/TS/Postgres/Redis/Socket.IO/H3; Symmetryk = Python RAG/LLM).

export const profile = {
  name: "Fadi Hachani",
  role: "Software Engineer",
  handle: "FH",
  email: "fady.hachani@gmail.com",
  location: "Marsa, Tunisia",
  links: {
    linkedin: "https://www.linkedin.com/in/fadihachani/",
    github: "https://github.com/FadiHachani",
  },
  bio: {
    lead: "Generalist software engineer who likes to understand systems end-to-end —",
    rest: "from architecture down to the wire. Python & TypeScript, LLM/RAG pipelines, and real-time backends.",
  },
};

export const navItems = [
  { id: "work", label: "Work", n: "01" },
  { id: "experience", label: "Experience", n: "02" },
  { id: "skills", label: "Skills", n: "03" },
  { id: "about", label: "About", n: "04" },
];

export const status: { k: string; v: string; ok?: boolean; live?: boolean }[] = [
  { k: "role", v: "Software Engineer", ok: true },
  { k: "company", v: "Symmetryk AG · CH" },
  { k: "founder", v: "CTO @ Déligo" },
  { k: "based", v: "Marsa, TN" },
  { k: "status", v: "open to talk", live: true },
];

export type Project = {
  featured?: boolean;
  title: string;
  kicker: string;
  meta: string[];
  desc: string;
  flow: string[];
  points: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    featured: true,
    title: "Déligo",
    kicker: "Transport Marketplace",
    meta: ["CTO & Co-Founder", "2025–Present"],
    desc: "Backend for Tunisia's first technology-driven bulky-item moving marketplace. Drivers bid on client transport requests; deliveries are tracked live on a hexagonal spatial grid.",
    flow: ["REST", "WebSocket", "Redis presence", "Uber H3", "tracking"],
    points: [
      "Designed a REST + WebSocket backend in NestJS with a strict status state-machine across requests → bids → bookings → tracking → ratings.",
      "Built real-time GPS tracking over Socket.IO with Redis-backed driver presence and live location streaming to clients.",
      "Implemented spatial driver matching using Uber's H3 hexagonal grid (k-ring queries, heatmaps) — no PostGIS needed.",
      "Secured the API with JWT RS256 (short access + long refresh tokens) and phone-based OTP auth, plus role guards and an approved-driver gate.",
    ],
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Socket.IO", "Uber H3", "TypeORM", "Flutter"],
  },
  {
    featured: true,
    title: "Sym-AI",
    kicker: "Medical Insight Search",
    meta: ["Software Engineer · Symmetryk AG", "Apr 2025–Present"],
    desc: "Backend services that help medical teams extract insight from large volumes of MSL/KOL field notes, tagged against a fixed clinical ontology.",
    flow: ["ingest", "graph→MD", "embeddings", "LLM re-rank", "summarise"],
    points: [
      "Upgraded semantic search with LLM re-ranking — faster queries and measurably better medical relevance.",
      "Built zero-loss graph/table-to-Markdown conversion so structured clinical content survives the embedding pipeline intact.",
      "Implemented LLM-driven summarisation pipelines that cut manual review workload for medical teams.",
      "Shipped Streamlit demos that accelerated internal decisions and client-facing feature validation over a ~3,000-insight dataset.",
    ],
    tags: ["Python", "FastAPI", "sentence-transformers", "LLM / RAG", "Embeddings", "Streamlit"],
  },
  {
    title: "XWorld LTD",
    kicker: "AI Ecosystem Platform",
    meta: ["Software Engineer · Freelance", "Jun 2026"],
    desc: "A one-week freelance build for XWorld LTD — a company building scalable AI infrastructure, enterprise automation, and the Nora AI OS. Wired the whole system together, front to back.",
    flow: ["React UI", "Node.js API", "Python AI", "wiring"],
    points: [
      "Wired the full system end-to-end — frontend, a Node.js backend, and a Python AI layer — within a one-week freelance engagement.",
      "Built the Node.js API layer connecting the web platform to the AI services.",
      "Implemented the Python AI integration powering the AI Suites / Nora AI OS.",
      "Translated the Figma designs (hero, nav, vision, team, CTA) into a responsive, dark-themed frontend.",
    ],
    tags: ["React.js", "Node.js", "Python", "AI integration", "REST APIs", "Figma-to-code"],
  },
  {
    title: "Medical QA Backend",
    kicker: "Master's Project · Symmetryk",
    meta: ["Software Engineer", "Nov 2024–Apr 2025"],
    desc: "A medical question-answering backend giving teams faster, more reliable access to medical knowledge, built to enterprise-readiness standards.",
    flow: ["corpus", "retrieval", "RBAC", "async", "monitoring"],
    points: [
      "Delivered a medical QA backend over a curated corpus of medical documents.",
      "Added security layers — RBAC, IP control, secure REST APIs — to support compliance and enterprise readiness.",
      "Introduced async processing and monitoring to improve system performance and reliability.",
    ],
    tags: ["Python", "RAG", "LLMs", "REST APIs", "RBAC", "Async processing"],
  },
];

export type Experience = {
  when: string;
  now?: boolean;
  role: string;
  org: string;
  place: string;
  text: string;
};

export const experience: Experience[] = [
  {
    when: "Apr 2025 — Present",
    now: true,
    role: "Software Engineer",
    org: "Symmetryk AG",
    place: "remote · Switzerland",
    text: "Building backend services for medical-insight tooling — semantic search, RAG pipelines and LLM summarisation over clinical field notes against a fixed ontology.",
  },
  {
    when: "2025 — Present",
    now: true,
    role: "CTO & Co-Founder",
    org: "Déligo",
    place: "Marsa, Tunisia",
    text: "Leading engineering for Tunisia's first technology-driven bulky-item moving marketplace: real-time bidding, GPS tracking and spatial driver matching on a hexagonal grid.",
  },
  {
    when: "Jun 2026",
    role: "Software Engineer (Freelance)",
    org: "XWorld LTD",
    place: "remote",
    text: "One-week engagement wiring a full AI-platform system end-to-end — React frontend, Node.js API and a Python AI layer — for an AI-infrastructure & enterprise-automation company.",
  },
  {
    when: "Nov 2024 — Apr 2025",
    role: "Software Engineer — Sym AI",
    org: "Symmetryk AG",
    place: "remote · Switzerland (Master's project)",
    text: "Delivered a medical QA backend with RBAC, IP control and secure REST APIs, plus async processing and monitoring for enterprise readiness.",
  },
  {
    when: "Sep 2023 — Nov 2024",
    role: "Front-End Engineer — Interaction Module",
    org: "Symmetryk AG",
    place: "remote · Switzerland",
    text: "Redesigned the HCP-interaction module UI and built a high-performance React.js calendar component, simplifying daily workflows for medical field teams.",
  },
];

export type SkillGroup = { ix: string; nm: string; items: string[] };

export const skills: SkillGroup[] = [
  { ix: "01", nm: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Dart"] },
  { ix: "02", nm: "Backend & Real-time", items: ["NestJS", "FastAPI", "Node.js", "Flask", "Django", "Socket.IO", "REST", "TypeORM"] },
  { ix: "03", nm: "AI / LLM", items: ["RAG pipelines", "LLM re-ranking", "Embeddings", "Semantic search", "Ollama", "Streamlit"] },
  { ix: "04", nm: "Data & Infrastructure", items: ["PostgreSQL", "Redis", "Docker", "Uber H3", "JWT / OTP auth", "Linux"] },
];

export const about = {
  lead: "I like to understand systems end-to-end — from the architecture diagram down to the bytes on the wire.",
  body: [
    "Most of my work lives on the backend: real-time services, spatial matching, and AI/LLM pipelines that have to behave under real production load. I care about clear state machines, observable systems, and APIs that are hard to misuse.",
    "Right now I split my time between shipping medical-insight tooling for a Swiss company and building Déligo, a logistics marketplace, from the ground up.",
  ],
  facts: [
    { k: "based", v: "Marsa, Tunisia", ac: true },
    { k: "focus", v: "Backends · AI" },
    { k: "languages", v: "EN · FR · AR" },
    { k: "availability", v: "open to talk", ac: true },
  ],
};
