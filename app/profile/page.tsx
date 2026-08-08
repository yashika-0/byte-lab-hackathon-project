"use client";

import Link from "next/link";
import { useState } from "react";
import { getProfile, saveProfile } from "@/lib/profile";

export default function ProfilePage() {
  const profile = getProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [college, setCollege] = useState(profile.college);
  const [track, setTrack] = useState(profile.track);
  const [showSaved, setShowSaved] = useState(false);

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
    <main>
      <div className="profile-grid">
        <section className="profile-card">
          <div className="profile-avatar-large">
            {(name || "S").charAt(0).toUpperCase()}
          </div>

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
              <input
                id="profileName"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <select
                id="profileTrack"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
              >
                <option>BUILD</option>
                <option>LEARN</option>
                <option>PUBLIC</option>
                <option>CONNECT</option>
              </select>
            </div>

            <button className="btn primary" type="submit">
              Save profile →
            </button>

            <p className={`proof-success${showSaved ? " show" : ""}`}>
              Profile saved on this device.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}