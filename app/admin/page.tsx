"use client";

import { useState } from "react";

const DAYS = Array.from({ length: 60 }, (_, i) => i + 1);

export default function Admin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [track, setTrack] = useState("BUILD");
  const [startDay, setStartDay] = useState(1);
  const [link, setLink] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      student: name.trim(),
      email: email.trim(),
      college: college.trim(),
      track,
      start: String(startDay),
    });
    setLink(`/dashboard?${params.toString()}`);
  }

  return (
    <main className="container profile-page">
      <p className="eyebrow">ORGANIZER / ADMIN</p>
      <h1>
        Assign the
        <br />
        <em>challenge.</em>
      </h1>
      <p className="admin-note" style={{ maxWidth: 650 }}>
        This is the organizer screen for the prototype. Enter a student&apos;s details, choose their track and
        starting task, then create an invitation link. In a real deployment, the assignment should be stored in
        a backend database and sent by email.
      </p>

      <div className="admin-grid">
        <section className="admin-card">
          <h2>Student details</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-field">
              <label htmlFor="assignName">STUDENT NAME</label>
              <input
                id="assignName"
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="assignEmail">STUDENT EMAIL</label>
              <input
                id="assignEmail"
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="assignCollege">COLLEGE / UNIVERSITY</label>
              <input
                id="assignCollege"
                required
                placeholder="College name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label htmlFor="assignTrack">TRACK</label>
              <select id="assignTrack" value={track} onChange={(e) => setTrack(e.target.value)}>
                <option>BUILD</option>
                <option>LEARN</option>
                <option>PUBLIC</option>
                <option>CONNECT</option>
              </select>
            </div>
            <div className="profile-field">
              <label htmlFor="assignDay">STARTING DAY</label>
              <select id="assignDay" value={startDay} onChange={(e) => setStartDay(Number(e.target.value))}>
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    Day {String(day).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn primary" type="submit">
              Create assignment →
            </button>
          </form>

          {link && (
            <div className="assignment-result show">
              <b>Assignment created.</b>
              <br />
              <br />
              Send this link to the student:
              <br />
              <br />
              <code>{link}</code>
              <br />
              <br />
              <a className="btn primary" href={link}>
                Open student dashboard →
              </a>
            </div>
          )}
        </section>

        <section className="admin-card">
          <h2>How the flow works</h2>
          <p className="admin-note">
            <b>1. Admin creates the student.</b>
            <br />
            Enter the student&apos;s name, email, college and track.
          </p>
          <p className="admin-note">
            <b>2. Admin assigns the 60-day challenge.</b>
            <br />
            Select the starting day. The student then sees today&apos;s task on their dashboard.
          </p>
          <p className="admin-note">
            <b>3. Student receives the invitation.</b>
            <br />
            For this prototype, the generated link opens the dashboard with the assignment data. For your final
            hackathon version, connect this to Firebase/Supabase or your own backend.
          </p>
          <p className="admin-note">
            <b>4. Student profile.</b>
            <br />
            The profile appears in the dashboard header and has a dedicated Profile page where the student can
            edit their information.
          </p>
        </section>
      </div>
    </main>
  );
}