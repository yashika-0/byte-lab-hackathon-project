"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, saveProfile } from "@/lib/profile";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [track, setTrack] = useState("BUILD");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    setName(profile.name);
    setEmail(profile.email);
    setCollege(profile.college);
    setTrack(profile.track);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveProfile({
      name: name.trim(),
      email: email.trim(),
      college: college.trim(),
      track,
    });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2500);
  }

  return (
    <main className="container profile-page">
      <p className="eyebrow">STUDENT PROFILE</p>
      <h1>
        Know your
        <br />
        <em>builder.</em>
      </h1>

      <div className="profile-grid">
        <section className="profile-card">
          <div className="profile-avatar-large">{(name || "S").charAt(0).toUpperCase()}</div>
          <h2>{name || "Student"}</h2>
          <p>{email || "student@example.com"}</p>
          <p>{college || "College / University"}</p>
          <Link className="btn outline" href="/dashboard">
            Back to dashboard →
          </Link>
        </section>

        <section className="profile-card">
          <h2>Edit profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-field">
              <label htmlFor="profileName">FULL NAME</label>
              <input id="profileName" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="profile-field">
              <label htmlFor="profileEmail">EMAIL</label>
              <input
                id="profileEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="profileCollege">COLLEGE / UNIVERSITY</label>
              <input
                id="profileCollege"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="profileTrack">CHALLENGE TRACK</label>
              <select id="profileTrack" value={track} onChange={(e) => setTrack(e.target.value)}>
                <option>BUILD</option>
                <option>LEARN</option>
                <option>PUBLIC</option>
                <option>CONNECT</option>
              </select>
            </div>
            <button className="btn primary" type="submit">
              Save profile →
            </button>
            <p className={`proof-success${showSaved ? " show" : ""}`}>Profile saved on this device.</p>
          </form>
        </section>
      </div>
    </main>
  );
}