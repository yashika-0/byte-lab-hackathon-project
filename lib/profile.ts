export type Profile = {
  name: string;
  email: string;
  college: string;
  track: string;
};

const DEFAULT_PROFILE: Profile = {
  name: "Student",
  email: "student@example.com",
  college: "College / University",
  track: "BUILD",
};

export function getProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const stored = localStorage.getItem("abtalksProfile");
    return stored ? { ...DEFAULT_PROFILE, ...JSON.parse(stored) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  localStorage.setItem("abtalksProfile", JSON.stringify(profile));
}
export function applyAssignmentFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (!params.get("student")) return null;

  const profile = getProfile();
  profile.name = params.get("student") || profile.name;
  profile.email = params.get("email") || profile.email;
  profile.college = params.get("college") || profile.college;
  profile.track = params.get("track") || profile.track;
  saveProfile(profile);

  const start = params.get("start");
  if (start) {
    localStorage.setItem("abtalksStartDay", start);
    return parseInt(start, 10);
  }
  return null;
}