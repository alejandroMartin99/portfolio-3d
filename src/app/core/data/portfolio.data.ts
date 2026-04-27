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
  stack: string[];
  repo?: string;
  demo?: string;
  /** Visual hint for the 3D scene */
  visual: 'finance' | 'fitness' | 'travel';
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
    company: 'Bertrandt Group',
    client: 'Airbus',
    role: 'Aerospace Data Management Engineer',
    period: 'Aug 2023 — Present',
    location: 'Getafe, Madrid',
    bullets: [
      'Lead front-end development of eMIT (Eurofighter program) in Angular — TypeScript, RxJS, custom UI for technical operators.',
      'Manage and structure large volumes of Airbus technical documentation: Service Bulletins, AOTs, Findings, IRF/RESAF reports, Concessions and Manufacturing Non-Conformities.',
      'Built internal A400M retrofit tracking tool — interactive UI with real-time data sync.',
      'Backend integration with FastAPI; ETL pipelines using Pandas and NumPy for data validation.',
      'Automated PDF parsing of large-scale aerospace data with Camelot, Tabula and PyMuPDF.',
      'CI/CD with GitHub Actions, Git workflows, agile (Jira) sprint coordination.'
    ],
    stack: ['Angular', 'TypeScript', 'Python', 'FastAPI', 'Pandas', 'NumPy', 'GitHub Actions', 'Jira']
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
    tagline: 'Personal banking & expense tracking',
    description:
      'A personal finance tracker that aggregates accounts and visualises spending patterns. Built to scratch a personal itch and explore client-side data viz.',
    stack: ['Python','Angular','Supabase','Render','Vercel'], // TODO: confirm stack
    demo: 'https://banka-app-tracker.vercel.app/login',
    repo: 'https://github.com/alejandroMartin99/BankaAppTracker',
    visual: 'finance'
  },
  {
    name: 'Gymio',
    tagline: 'Workout & training tracker',
    description:
      'Fitness companion app to log workouts, track progressive overload and surface trends across training cycles.',
    stack: ['Angular', 'TypeScript','Supabase','Render','Vercel'], // TODO: confirm stack
    demo: 'https://gymio-kappa.vercel.app/login',
    repo: 'https://github.com/alejandroMartin99/Gymio',
    visual: 'fitness'
  },
  {
    name: 'Endless Travels',
    tagline: 'Travel discovery platform',
    description:
      'Travel platform — discover, plan and share trips. Live deployed product.',
    stack: ['Angular', 'TypeScript'], // TODO: confirm stack
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
  { label: 'Email', href: 'mailto:alexmiglesias@gmail.com', type: 'email' }, // TODO: confirm
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alejandro-mart%C3%ADn-iglesias-33381a164/',
    type: 'linkedin'
  },
  { label: 'GitHub', href: 'https://github.com/alejandroMartin99', type: 'github' }
];

/** The narrative chapters used to drive scroll animations and nav */
export const chapters = [
  { id: 'hero', label: '00 / Intro' },
  { id: 'origins', label: '01 / Origins' },
  { id: 'bridge', label: '02 / The Bridge' },
  { id: 'ineco', label: '03 / Air Traffic & Data' },
  { id: 'master', label: '04 / Master’s' },
  { id: 'bertrandt', label: '05 / Eurofighter' },
  { id: 'stack', label: '06 / Stack' },
  { id: 'projects', label: '07 / Side Projects' },
  { id: 'contact', label: '08 / Contact' }
] as const;

export type ChapterId = (typeof chapters)[number]['id'];
