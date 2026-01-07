
export interface ProjectPageData {
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
    gallery: string[];
    challenge: string;
    solution: string;
    role: string;
    timeline: string;
    tools: string;
    year: string;
    features: string[];
}

export const defaultPageContent: Record<number, ProjectPageData> = {};
