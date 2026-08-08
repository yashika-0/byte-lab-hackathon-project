const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LandingData = {
  challenge: {
    name: string;
    durationDays: number;
    targetAudience: string;
    tagline: string;
  };
  intro: {
    title: string;
    description: string;
    motivation: string;
  };
  howItWorks: { step: number; title: string; description: string }[];
  benefits: { title: string; description: string }[];
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
};

export async function fetchLanding(): Promise<LandingData | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/api/landing`);
    if (!res.ok) return null;
    return (await res.json()) as LandingData;
  } catch {
    return null;
  }
}