export const SECTIONS = [
  { id: "founder", label: "Founder" },
  { id: "team", label: "Team" },
  { id: "company", label: "Company" },
  { id: "what-why", label: "What & why" },
  { id: "progress", label: "Progress" },
  { id: "video", label: "Video" },
  { id: "else", label: "Anything else" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
