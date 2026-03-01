// Playbook Configuration System for Programmatic SEO

export type PlaybookType = 
  | "templates" | "curation" | "conversions" | "comparisons" 
  | "examples" | "locations" | "personas" | "integrations" 
  | "glossary" | "translations" | "directory" | "profiles";

export interface PlaybookConfig {
  type: PlaybookType;
  urlPattern: string;
  minWordCount: number;
  requiredSections: string[];
  schemaType: "Article" | "FAQPage" | "HowTo" | "WebPage" | "DefinedTerm";
  minFAQs: number;
  minInternalLinks: number;
}

export const PLAYBOOK_CONFIGS: Record<PlaybookType, PlaybookConfig> = {
  templates: {
    type: "templates",
    urlPattern: "/palettes/:slug",
    minWordCount: 900,
    requiredSections: ["Introduction", "Palette Collection", "Usage Guide", "Implementation Tips", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  curation: {
    type: "curation",
    urlPattern: "/best/:slug",
    minWordCount: 900,
    requiredSections: ["Overview", "Ranking Criteria", "Top Picks", "Comparison Table", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  conversions: {
    type: "conversions",
    urlPattern: "/convert/:slug",
    minWordCount: 600,
    requiredSections: ["Converter Tool", "How It Works", "Examples", "FAQ"],
    schemaType: "HowTo",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  comparisons: {
    type: "comparisons",
    urlPattern: "/compare/:slug",
    minWordCount: 900,
    requiredSections: ["Overview", "Feature Matrix", "Use Cases", "Verdict", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  examples: {
    type: "examples",
    urlPattern: "/examples/:slug",
    minWordCount: 900,
    requiredSections: ["Introduction", "Examples Gallery", "Analysis", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  locations: {
    type: "locations",
    urlPattern: "/colors-in/:slug",
    minWordCount: 900,
    requiredSections: ["Local Overview", "Color Trends", "Recommendations", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  personas: {
    type: "personas",
    urlPattern: "/guides/:slug",
    minWordCount: 900,
    requiredSections: ["Introduction", "Pain Points", "Solutions", "Benefits", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  integrations: {
    type: "integrations",
    urlPattern: "/integrations/:slug",
    minWordCount: 900,
    requiredSections: ["Overview", "Setup Steps", "Use Cases", "Workflow", "FAQ"],
    schemaType: "HowTo",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  glossary: {
    type: "glossary",
    urlPattern: "/glossary/:slug",
    minWordCount: 900,
    requiredSections: ["Definition", "Beginner Guide", "Technical Deep Dive", "Related Terms", "FAQ"],
    schemaType: "DefinedTerm",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  translations: {
    type: "translations",
    urlPattern: "/:lang/colors/:slug",
    minWordCount: 600,
    requiredSections: ["Localized Content", "Cultural Notes", "FAQ"],
    schemaType: "WebPage",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  directory: {
    type: "directory",
    urlPattern: "/directory/:slug",
    minWordCount: 600,
    requiredSections: ["Listings", "Filters", "Categories", "FAQ"],
    schemaType: "WebPage",
    minFAQs: 3,
    minInternalLinks: 5,
  },
  profiles: {
    type: "profiles",
    urlPattern: "/profiles/:slug",
    minWordCount: 600,
    requiredSections: ["Overview", "Milestones", "Insights", "FAQ"],
    schemaType: "Article",
    minFAQs: 3,
    minInternalLinks: 5,
  },
};

// Validation function
export function validatePageContent(config: PlaybookConfig, content: { wordCount: number; faqCount: number; internalLinkCount: number }): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (content.wordCount < config.minWordCount) errors.push(`Word count ${content.wordCount} below minimum ${config.minWordCount}`);
  if (content.faqCount < config.minFAQs) errors.push(`FAQ count ${content.faqCount} below minimum ${config.minFAQs}`);
  if (content.internalLinkCount < config.minInternalLinks) errors.push(`Internal links ${content.internalLinkCount} below minimum ${config.minInternalLinks}`);
  return { isValid: errors.length === 0, errors };
}
