export type Proof = {
  github?: string;
  linkedin?: string;
  submitted?: boolean;
  submittedAt?: string;
};

function getProofKey(day: number): string {
  return `abtalksProofDay${day}`;
}

export function getProof(day: number): Proof {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(getProofKey(day)) || "null") || {};
  } catch {
    return {};
  }
}

export function saveProof(day: number, proof: Proof) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getProofKey(day), JSON.stringify(proof));
}

export function clearProof(day: number) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getProofKey(day));
}

export function isValidProofUrl(value: string, type: "github" | "linkedin"): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    const host = url.hostname.toLowerCase();
    if (type === "github") return host === "github.com" || host.endsWith(".github.com");
    if (type === "linkedin") return host === "linkedin.com" || host.endsWith(".linkedin.com");
    return false;
  } catch {
    return false;
  }
}