/**
 * Single source of truth for all portfolio content.
 * Updating copy = editing this file. Sections read from here.
 *
 * NOTE: items marked with TODO need user input — see README.md.
 */

export interface Education {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface ExperienceRole {
  company: string;
  client?: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  stack: string[];
}

export interface SideProject {
  name: string;
  tagline: string;
  description: string;
  story?: string;
  stack: string[];
  repo?: string;
  demo?: string;
  /** Visual hint for the 3D scene */
  visual: 'finance' | 'fitness' | 'travel';
  /** App-store style screenshots (paths under /public). */
  screens?: { src: string; caption: string }[];
}

export interface ContactLink {
  label: string;
  href: string;
  type: 'email' | 'linkedin' | 'github' | 'web' | 'other';
}

export const profile = {
  name: 'Alejandro Martín Iglesias',
  shortName: 'Alejandro',
  headline: 'Aerospace Engineer | Data Scientist × Data Analyst × Front-End Developer',
  location: 'Madrid, Spain',
  intro: `I’m an aerospace engineer who builds software and data systems
  for the aviation industry. I started designing engines and ended up writing
  the code that keeps modern aircraft maintained.`,
  /** Hero subtitle — the one-liner that defines the portfolio. */
  oneLiner: 'I build software for the skies.',
  resumeUrl: '/resume.pdf' // TODO: place a PDF in /public/resume.pdf
};

/**
 * Bio — short narrative that follows the hero.
 * Frames who Alejandro is, his current role, and the AI focus.
 */
export const bio = {
  eyebrow: 'About',
  title: 'Senior Engineer at the intersection of aerospace, data and AI.',
  paragraphs: [
    `I’m an aerospace engineer who fell for data. What started as a thesis
    on big-data techniques for airport arrivals became a five-year career
    turning aviation’s mountain of unstructured data into models, dashboards
    and interfaces that operators actually trust in real time.`,
    `Today I work as a Senior Engineer at <strong>Indra</strong>, where I
    lead AI-driven projects integrating LLMs, RAG pipelines and agentic
    workflows into industrial-grade products. I also collaborate on
    <strong>SESAR</strong>, a European research programme, and on
    Microsoft <strong>Fabric</strong> integrations for large-scale data
    platforms.`,
    `Before that I led the Angular front-end of <strong>eMIT</strong> on
    the Eurofighter programme at Bertrandt for Airbus, and built ML and
    data pipelines for ENAIRE air-traffic operations at INECO. I move
    comfortably between aerospace engineering, data science and
    front-end — and I look for problems where the three meet.`
  ],
  highlights: [
    { label: 'Years in industry', value: '5+' },
    { label: 'Programmes shipped', value: 'Eurofighter · A400M · ENAIRE' },
    { label: 'Current focus', value: 'AI · LLMs · Microsoft Fabric' }
  ]
};

export const education: Education[] = [
  {
    institution: 'Universidad Politécnica de Madrid (UPM)',
    degree: 'Bachelor of Engineering (B.Eng.) in Aerospace Engineering — Aerospace Propulsion',
    period: '2017 — 2021',
    highlights: [
      'GPA: 7.01/10',
      'Final thesis: Big Data techniques applied to arrivals management at Barcelona-El Prat (LEBL) — graded 10/10',
      'CFD & engineering software: CATIA V5, MATLAB, ANSYS Fluent, XFLR'
    ]
  },
  {
    institution: 'Universidad Europea',
    degree: "Master’s Degree in Aeronautical Engineering (qualifying degree for regulated profession)",
    period: '2022 — 2023',
    highlights: ['Completed in parallel with full-time engineering role at INECO']
  }
];

export const experience: ExperienceRole[] = [
  {
    company: 'Indra',
    role: 'Senior Engineer — AI & Data Platforms',
    period: 'Nov 2025 — Present',
    location: 'Madrid',
    bullets: [
      'Leading AI-driven product work — LLM integrations, RAG pipelines, agentic workflows for industrial-grade systems.',
      'Collaborating on SESAR, a European research programme on autonomous and intelligent systems.',
      'Microsoft Fabric integrations for unified data engineering, BI and AI on a single governed platform.',
      'Architecture decisions across data, ML and frontend — bridging research and production.'
    ],
    stack: ['Python', 'TypeScript', 'LLMs', 'RAG', 'Microsoft Fabric', 'Azure', 'Angular']
  },
  {
    company: 'Bertrandt Group',
    client: 'Airbus — Eurofighter',
    role: 'Lead Frontend (eMIT) — Eurofighter programme',
    period: 'Aug 2023 — Nov 2025',
    location: 'Getafe, Madrid',
    bullets: [
      'Lead front-end development of eMIT in Angular (TypeScript, RxJS) — the maintenance interface used by Eurofighter technical operators.',
      'Designed and built component libraries, complex tables and dashboards optimised for high-density operational data.',
      'CI/CD with GitHub Actions, Git workflows, Agile (Jira) sprint coordination across distributed teams.',
      'Backend integration with FastAPI; ETL pipelines (Pandas / NumPy) feeding the UI in real time.'
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'FastAPI', 'GitHub Actions', 'Jira']
  },
  {
    company: 'Bertrandt Group',
    client: 'Airbus — A400M',
    role: 'Aerospace Data Management — A400M retrofit',
    period: 'Aug 2023 — Nov 2025',
    location: 'Getafe, Madrid',
    bullets: [
      'Built an internal tracking tool for the A400M retrofit programme — interactive UI with real-time data sync.',
      'Managed and structured large volumes of Airbus technical documentation: Service Bulletins, AOTs, Findings, IRF/RESAF, Concessions and Manufacturing Non-Conformities.',
      'Automated PDF parsing of aerospace data with Camelot, Tabula and PyMuPDF.',
      'ETL pipelines on Pandas / NumPy for validation and transformation of complex airframe records.'
    ],
    stack: ['Angular', 'Python', 'Pandas', 'PyMuPDF', 'Camelot', 'Tabula']
  },
  {
    company: 'INECO',
    client: 'ENAIRE',
    role: 'Data Engineer — Arrivals Optimization at LEBL (CODEM)',
    period: 'Apr 2021 — Aug 2023',
    location: 'Madrid · Hybrid',
    bullets: [
      'End-to-end ETL pipeline ownership: extraction, transformation, loading of airport operational data.',
      'Automated data extraction via API connectors (AWS, Filezilla); cleaned and structured unstructured data with Pandas / NumPy.',
      'Built BI tooling and dashboards (Power BI) for operational and strategic decision support.',
      'CI/CD for data delivery using GitHub Actions and Git-based workflows.'
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'AWS', 'Power BI', 'GitHub Actions', 'MongoDB']
  },
  {
    company: 'INECO',
    client: 'INECO (internal R&D)',
    role: 'ML Engineer — iPDA: Intelligent Post-Processing Delay Analysis',
    period: 'May 2021 — Aug 2023',
    location: 'Madrid',
    bullets: [
      'Built supervised & unsupervised ML models to predict and reduce real-time airport delays.',
      'Evaluated Linear Regression, SVM, Random Forest, KNN and Neural Networks; deployed best performers.',
      'Used scikit-learn, XGBoost and TensorFlow/Keras for experimentation and serving.',
      'Designed and maintained ETL pipelines with Pandas, NumPy and Airflow.'
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Keras', 'Airflow']
  },
  {
    company: 'INECO',
    role: 'Algorithm Developer — Radar Data & Computer Vision',
    period: 'May 2021 — Aug 2023',
    location: 'Madrid',
    bullets: [
      'Decoded and processed binary radar messages (ASTERIX CAT48).',
      'Trained and deployed YOLOv8 models for object detection and trajectory tracking on radar-based data.',
      'Built Python automation for radar message parsing, real-time monitoring and feature extraction.'
    ],
    stack: ['Python', 'YOLOv8', 'Computer Vision', 'ASTERIX CAT48']
  },
  {
    company: 'INECO',
    client: 'ENAIRE',
    role: 'Data Engineer — SMART TOOL DDI',
    period: 'Apr 2021 — Aug 2023',
    location: 'Madrid',
    bullets: [
      'Auto-decoding of large heterogeneous XML/JSON datasets to structured formats.',
      'Cloud pipelines on AWS S3 for heavy aviation data workloads.',
      'Robust ETL workflows for real-time estimation of regulations.',
      'Cross-validation, confusion matrices and iterative model testing to maximise true positives/negatives.'
    ],
    stack: ['Python', 'AWS S3', 'XML', 'JSON', 'ETL']
  },
  {
    company: 'INECO',
    role: 'Aerospace Data Intern — Air Traffic Management',
    period: 'Mar 2021 — Apr 2022',
    location: 'Madrid',
    bullets: [
      'Radar data digitization: transformed raw radar traces into structured datasets using Big Data techniques.',
      'Reviewed and improved aircraft arrival procedures at Barcelona-El Prat Airport.',
      'Supported airspace sectorization optimization in ATC operations.',
      'Hands-on with EUROCONTROL NEST for en-route and TMA analysis.'
    ],
    stack: ['Python', 'EUROCONTROL NEST', 'Big Data']
  }
];

/** Tech stack groups for the constellation scene */
export const stackGroups: { label: string; items: string[] }[] = [
  { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'SCSS', 'Three.js'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'REST APIs'] },
  { label: 'Data & ML', items: ['Pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Keras', 'Airflow', 'YOLOv8'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'GitHub Actions', 'CI/CD', 'Git'] },
  { label: 'Engineering', items: ['CATIA V5', 'MATLAB', 'ANSYS Fluent', 'XFLR'] },
  { label: 'BI & DB', items: ['Power BI', 'SQL', 'MongoDB'] }
];

/**
 * SIDE PROJECTS
 * TODO — confirm with Alejandro:
 * - stack of each project
 * - whether each has a live demo
 * - one-line description in his own words
 */
export const sideProjects: SideProject[] = [
  {
    name: 'BankaAppTracker',
    tagline: 'Personal banking & expense tracking, reinvented.',
    description:
      'A personal finance tracker that aggregates accounts, models cashflow, and visualises spending patterns across categories.',
    story:
      'Built to scratch a personal itch — and to push client-side data visualisation. Five integrated views: a unified summary, deep expense breakdowns, investment tracking, mortgage projections, and rich charting.',
    stack: ['Angular', 'TypeScript', 'Python', 'Supabase', 'Render', 'Vercel'],
    demo: 'https://banka-app-tracker.vercel.app/login',
    repo: 'https://github.com/alejandroMartin99/BankaAppTracker',
    visual: 'finance',
    screens: [
      { src: 'projects/BankaApp/Resumen.png',   caption: 'Summary' },
      { src: 'projects/BankaApp/Charts.png',    caption: 'Charts' },
      { src: 'projects/BankaApp/Gastos.png',    caption: 'Expenses' },
      { src: 'projects/BankaApp/Inversion.png', caption: 'Investments' },
      { src: 'projects/BankaApp/Hipotecas.png', caption: 'Mortgages' }
    ]
  },
  {
    name: 'Gymio',
    tagline: 'Workout & progressive-overload tracker.',
    description:
      'Fitness companion app to log workouts, track progressive overload and surface trends across training cycles.',
    stack: ['Angular', 'TypeScript', 'Supabase', 'Render', 'Vercel'],
    demo: 'https://gymio-kappa.vercel.app/login',
    repo: 'https://github.com/alejandroMartin99/Gymio',
    visual: 'fitness'
  },
  {
    name: 'Endless Travels',
    tagline: 'Travel discovery platform.',
    description:
      'Travel platform — discover, plan and share trips. Live deployed product.',
    stack: ['Angular', 'TypeScript', 'Supabase'],
    demo: 'https://endless-travels.com/',
    repo: 'https://github.com/alejandroMartin99/endless-travels',
    visual: 'travel'
  }
];

/**
 * CONTACT
 * TODO — confirm public email Alejandro wants displayed.
 */
export const contact: ContactLink[] = [
  { label: 'Email', href: 'mailto:alexmiglesias@gmail.com', type: 'email' },
  { label: 'Phone', href: 'tel:+34649619103', type: 'other' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alejandro-mart%C3%ADn-iglesias-33381a164/',
    type: 'linkedin'
  },
  { label: 'GitHub', href: 'https://github.com/alejandroMartin99', type: 'github' }
];

/** The narrative chapters used to drive scroll animations and nav */
export const chapters = [
  { id: 'hero',      label: '00 / Intro' },
  { id: 'bio',       label: '01 / Bio' },
  { id: 'projects',  label: '02 / Side Projects' },
  { id: 'origins',   label: '03 / Origins' },
  { id: 'bridge',    label: '04 / The Bridge' },
  { id: 'ineco',     label: '05 / Air Traffic & Data' },
  { id: 'master',    label: '06 / Master’s' },
  { id: 'bertrandt', label: '07 / Bertrandt — Airbus' },
  { id: 'indra',     label: '08 / Indra — AI' },
  { id: 'stack',     label: '09 / Stack' },
  { id: 'contact',   label: '10 / Contact' }
] as const;

export type ChapterId = (typeof chapters)[number]['id'];
