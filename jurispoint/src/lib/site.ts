/**
 * Single source of truth for business details and shared content.
 * Update contact details here and they change everywhere on the site.
 */
export const site = {
  name: "JurisPoint",
  owner: "Stevens Gregs",
  tagline: "Clear Advice. Strong Representation.",
  phoneDisplay: "+1 (251) 520-4334",
  phoneHref: "tel:+12515204334",
  email: "stevensgregs@jurispoint.site",
  emailHref: "mailto:stevensgregs@jurispoint.site",
  location: "South Carolina, USA",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://jurispoint.site").replace(/\/$/, ""),
  description:
    "JurisPoint offers clear, practical legal guidance from South Carolina, USA, on business, contract, dispute, property and family matters.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/contact", label: "About Us & Contact" },
] as const;

/** Where every "Book a Consultation" button leads. */
export const consultationHref = "/contact#enquiry";

export const disclaimer =
  "The content of this website is provided for general information only and is not legal advice. Reading this website, or contacting JurisPoint through it, does not create a lawyer-client relationship. Please do not act or refrain from acting on the basis of anything on this website without first obtaining advice about your specific circumstances. Every legal matter is different, and no outcome can be promised.";

/** Royalty-free photography (Unsplash licence). Swap for the firm's own photography at any time. */
export const photos = {
  hero: {
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    alt: "Scales of justice and law books on a desk",
  },
  study: {
    src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744",
    alt: "Shelves of bound legal volumes in a law library",
  },
  signing: {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    alt: "A person reviewing and signing a document with a fountain pen",
  },
  meeting: {
    src: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
    alt: "Two professionals shaking hands across a table",
  },
  office: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    alt: "A bright, modern professional office interior",
  },
  architecture: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    alt: "Glass and steel office buildings seen from below",
  },
} as const;

export type PracticeArea = {
  slug: string;
  title: string;
  icon: "building" | "file" | "scale" | "home" | "users" | "message";
  summary: string;
  intro: string;
  body: string;
  topics: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    title: "Corporate and Commercial Law",
    icon: "building",
    summary:
      "Guidance on business agreements, commercial arrangements and the documents that shape how a company operates.",
    intro:
      "Running a business brings a steady stream of legal questions, from how an arrangement with a supplier should be recorded to what a company's own documents actually require.",
    body: "JurisPoint helps business owners and decision-makers understand the legal side of their commercial dealings. That can mean looking at how a proposed arrangement is structured, explaining what existing corporate documents say, or talking through a general business question before it becomes a larger concern. The aim is practical: clear information that supports sound business decisions.",
    topics: [
      "Commercial and supplier agreements",
      "Partnership and shareholder arrangements",
      "Corporate documentation and governance",
      "General business legal questions",
    ],
  },
  {
    slug: "contracts",
    title: "Contract Drafting and Review",
    icon: "file",
    summary:
      "Careful review and preparation of agreements, so obligations are understood before anything is signed.",
    intro:
      "A contract sets out what each party has promised. Reading it carefully before signing, and understanding it clearly afterwards, can prevent misunderstandings later.",
    body: "Whether you have been handed an agreement to sign or need a document prepared for your own business, JurisPoint can review the terms line by line, explain what each obligation means in plain language and point out provisions that may deserve a closer look. Where a new document is needed, the focus is on clear wording that reflects what the parties intend.",
    topics: [
      "Reviewing agreements before signing",
      "Clarifying contractual obligations",
      "Identifying potential concerns and risks",
      "Preparing business documents and agreements",
    ],
  },
  {
    slug: "dispute-resolution",
    title: "Dispute Resolution",
    icon: "scale",
    summary:
      "Helping you understand a disagreement, weigh negotiation and alternative routes, and consider the next step.",
    intro:
      "Disputes can be stressful and time-consuming. Understanding where you stand is the first step toward deciding how to respond.",
    body: "JurisPoint works through the facts and documents behind a dispute to help clients understand the issues involved. From there, the conversation turns to the realistic routes available, which may include direct negotiation, mediation or another form of alternative dispute resolution, and what each could involve. Every situation is different, so the guidance is shaped around your circumstances and priorities.",
    topics: [
      "Understanding the dispute and your position",
      "Exploring negotiated solutions",
      "Considering mediation and other alternatives",
      "Evaluating potential next steps",
    ],
  },
  {
    slug: "property-real-estate",
    title: "Property and Real Estate",
    icon: "home",
    summary:
      "Clear explanations of property documents, agreements and ownership questions, including property disputes.",
    intro:
      "Property is often among the most significant things a person or business owns, and the paperwork that comes with it can be detailed.",
    body: "JurisPoint can help you understand the documents involved in buying, selling or leasing property, review agreements before you commit, and talk through questions about ownership. Where a disagreement over property has arisen, the firm can help you understand the issues and consider how you might move forward.",
    topics: [
      "Property transaction documents",
      "Purchase, sale and lease agreements",
      "Ownership-related questions",
      "Property disputes",
    ],
  },
  {
    slug: "family-law",
    title: "Family Law",
    icon: "users",
    summary:
      "Considerate, discreet guidance on family-related legal concerns, separation, divorce and associated property questions.",
    intro:
      "Family matters are personal, and legal questions that arise within them deserve patience, discretion and care.",
    body: "JurisPoint offers a calm, respectful space to discuss family-related legal concerns. That may include questions about matrimonial matters, separation or divorce-related issues, and how property may be affected. The firm's role is to help you understand your situation and the options that may be available, so that you can make decisions with a clearer view of what lies ahead.",
    topics: [
      "Family-related legal concerns",
      "Matrimonial matters",
      "Separation and divorce-related issues",
      "Associated property questions",
    ],
  },
  {
    slug: "consultation-advisory",
    title: "Legal Consultation and Advisory",
    icon: "message",
    summary:
      "A focused conversation to understand a legal issue, identify the relevant documents and explore possible options.",
    intro:
      "Sometimes the most useful first step is simply a clear conversation about what is happening and what it may mean.",
    body: "A consultation gives you the opportunity to explain your situation and ask questions. JurisPoint will help you understand the legal issue at hand, identify the documents and information that are likely to be relevant, and outline the options that may be open to you. You leave with a better understanding of where you stand and what the sensible next steps might be.",
    topics: [
      "Understanding a legal issue",
      "Identifying relevant documents",
      "Exploring possible options",
      "Planning sensible next steps",
    ],
  },
];

export const matterTypes = [
  ...practiceAreas.map((p) => ({ value: p.slug, label: p.title })),
  { value: "other", label: "Other or not sure" },
] as const;
