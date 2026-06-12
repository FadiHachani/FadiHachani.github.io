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
    lead: "Generalist software engineer who likes to understand systems end-to-end  ",
    rest: "from architecture down to the wire. Python & TypeScript, LLM/RAG pipelines, and real-time backends.",
  },
};

export const navItems = [
  { id: "work", label: "Work", n: "01" },
  { id: "experience", label: "Experience", n: "02" },
  { id: "skills", label: "Skills", n: "03" },
  { id: "about", label: "About", n: "04" },
];

export const status: { k: string; v: string; ok?: boolean; live?: boolean }[] =
  [
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
    kicker: "Transport Marketplace   Backend",
    meta: ["CTO & Co-Founder", "2025–Present"],
    desc: "Backend for Tunisia's first technology-driven bulky-item moving marketplace. Drivers bid on client transport requests; deliveries are tracked live on a hexagonal spatial grid.",
    flow: ["REST", "WebSocket", "Redis presence", "Uber H3", "tracking"],
    points: [
      "Designed a REST + WebSocket backend in NestJS with a strict status state-machine across requests → bids → bookings → tracking → ratings.",
      "Built real-time GPS tracking over Socket.IO with Redis-backed driver presence and live location streaming to clients.",
      "Implemented spatial driver matching using Uber's H3 hexagonal grid (k-ring queries, heatmaps)   no PostGIS needed.",
      "Secured the API with JWT RS256 (short access + long refresh tokens) and phone-based OTP auth, plus role guards and an approved-driver gate.",
    ],
    tags: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "Uber H3",
      "TypeORM",
      "Flutter",
    ],
  },
  {
    featured: true,
    title: "Déligo App",
    kicker: "Cross-Platform Mobile Client",
    meta: ["CTO & Co-Founder", "2025–Present"],
    desc: "The iOS & Android app for Déligo   separate client and driver experiences over one codebase, with live map tracking and bidding connected straight to the backend.",
    flow: ["expo-router", "Redux", "socket.io", "live map", "i18n"],
    points: [
      "Built the React Native (Expo) app with expo-router file routing split across distinct (auth) / (client) / (driver) flows.",
      "Implemented live driver tracking on react-native-maps, driven by a Socket.IO client streaming GPS from the backend.",
      "Managed app state with Redux Toolkit and a typed Axios API layer that auto-attaches JWTs and handles refresh on 401.",
      "Added multi-language support (i18next), OTP + Google sign-in, push notifications, and image-picker driver-document uploads.",
    ],
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "expo-router",
      "Redux Toolkit",
      "react-native-maps",
      "Socket.IO",
      "i18next",
    ],
  },
  {
    featured: true,
    title: "Sym-AI",
    kicker: "Medical Insight Search",
    meta: ["Software Engineer · Symmetryk AG", "Apr 2025–Present"],
    desc: "Backend services that help medical teams extract insight from large volumes of MSL/KOL field notes, tagged against a fixed clinical ontology.",
    flow: ["ingest", "graph→MD", "embeddings", "LLM re-rank", "summarise"],
    points: [
      "Upgraded semantic search with LLM re-ranking   faster queries and measurably better medical relevance.",
      "Built zero-loss graph/table-to-Markdown conversion so structured clinical content survives the embedding pipeline intact.",
      "Implemented LLM-driven summarisation pipelines that cut hours of manual review.",
      "Shipped Streamlit demos that accelerated internal decisions and client-facing feature validation over a ~3,000-insight dataset.",
    ],
    tags: [
      "Python",
      "FastAPI",
      "sentence-transformers",
      "LLM / RAG",
      "Embeddings",
      "Streamlit",
    ],
  },
  {
    title: "XWorld LTD",
    kicker: "AI Ecosystem Platform",
    meta: ["Software Engineer · Freelance", "Jun 2026"],
    desc: "A one-week freelance sprint for XWorld LTD   a company building scalable AI infrastructure, enterprise automation, and the Nora AI OS.",
    flow: ["React UI", "Node.js API", "Python AI"],
    points: [
      "Assembled the full platform   React frontend, Node.js API, and a Python AI layer   into one working system.",
      "Built the Node.js layer that bridges the web platform and the AI services.",
      "Implemented the Python integration powering the AI Suites / Nora AI OS.",
      "Translated the Figma designs (hero, nav, vision, team, CTA) into a responsive, dark-themed frontend.",
    ],
    tags: [
      "React.js",
      "Node.js",
      "Python",
      "AI integration",
      "REST APIs",
      "Figma-to-code",
    ],
  },
  {
    title: "Medical QA Backend",
    kicker: "Master's Project · Symmetryk",
    meta: ["Software Engineer", "Nov 2024–Apr 2025"],
    desc: "A question-answering service over a curated medical corpus, hardened for enterprise deployment.",
    flow: ["corpus", "retrieval", "RBAC", "async", "monitoring"],
    points: [
      "Delivered the QA engine from document ingestion through answer retrieval.",
      "Added security layers   RBAC, IP control, secure REST APIs   to meet compliance requirements.",
      "Introduced async processing and monitoring to improve performance and reliability.",
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
    when: "Apr 2025   Present",
    now: true,
    role: "Software Engineer",
    org: "Symmetryk AG",
    place: "remote · Switzerland",
    text: "Owning Sym-AI's retrieval layer   embeddings, re-ranking and summarisation pipelines that turn thousands of clinical notes into fast, reliable answers.",
  },
  {
    when: "2025   Present",
    now: true,
    role: "CTO & Co-Founder",
    org: "Déligo",
    place: "Marsa, Tunisia",
    text: "Leading engineering across the stack   the NestJS API and the Expo mobile client   for a marketplace where drivers bid on transport jobs and deliveries stream live to the customer's screen.",
  },
  {
    when: "Jun 2026",
    role: "Software Engineer (Freelance)",
    org: "XWorld LTD",
    place: "remote",
    text: "Solo freelance sprint: stood up the React frontend, Node.js API and Python AI layer for an enterprise-automation platform and its Nora AI OS.",
  },
  {
    when: "Nov 2024   Apr 2025",
    role: "Software Engineer   Sym AI",
    org: "Symmetryk AG",
    place: "remote · Switzerland (Master's project)",
    text: "Built the first iteration of the medical QA system as a Master's project   the security, async and monitoring work that took it from prototype to client-ready.",
  },
  {
    when: "Sep 2023   Nov 2024",
    role: "Front-End Engineer   Interaction Module",
    org: "Symmetryk AG",
    place: "remote · Switzerland",
    text: "Redesigned the HCP-interaction module UI and built a high-performance React.js calendar component, simplifying daily workflows for medical field teams.",
  },
];

export type SkillGroup = { ix: string; nm: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    ix: "01",
    nm: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Dart"],
  },
  {
    ix: "02",
    nm: "Backend & Real-time",
    items: [
      "NestJS",
      "FastAPI",
      "Node.js",
      "Flask",
      "Django",
      "Socket.IO",
      "REST",
      "TypeORM",
    ],
  },
  {
    ix: "03",
    nm: "Frontend & Mobile",
    items: [
      "React.js",
      "React Native",
      "Expo",
      "expo-router",
      "Redux Toolkit",
      "i18next",
    ],
  },
  {
    ix: "04",
    nm: "AI / LLM",
    items: [
      "RAG pipelines",
      "LLM re-ranking",
      "Embeddings",
      "Semantic search",
      "Ollama",
      "Streamlit",
    ],
  },
  {
    ix: "05",
    nm: "Data & Infrastructure",
    items: [
      "PostgreSQL",
      "Redis",
      "Docker",
      "Uber H3",
      "JWT / OTP auth",
      "Linux",
    ],
  },
];

export const about = {
  lead: "Schema, service, socket, screen. I'd rather own the whole path.",
  body: [
    "Most of my work sits on the backend, where I focus on live tracking systems, spatial matching, and AI/LLM pipelines designed to operate reliably under production load. I care deeply about clear state machines, observable systems, and building APIs that are difficult to misuse. Currently, I split my time between shipping medical-insight tooling for a Swiss company and building Déligo, a logistics marketplace, from the ground up.",
  ],
  facts: [
    { k: "based", v: "Marsa, Tunisia", ac: true },
    { k: "focus", v: "Backends · AI" },
    { k: "languages", v: "EN · FR · AR" },
    { k: "availability", v: "taking on new work", ac: true },
  ],
};
