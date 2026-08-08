"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getTasks, saveTasks, completedCount, getProgress, calculateStreak, type Task } from "@/lib/tasks";
import { getProfile, applyAssignmentFromUrl, type Profile } from "@/lib/profile";
import { getProof, saveProof, clearProof, isValidProofUrl } from "@/lib/proof";

const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [startDay, setStartDay] = useState(1);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [githubInvalid, setGithubInvalid] = useState(false);
  const [linkedinInvalid, setLinkedinInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const justSubmittedRef = useRef(false);

  // Initial load
  useEffect(() => {
    const assignedStart = applyAssignmentFromUrl();
    setProfile(getProfile());
    setTasks(getTasks());
    const storedStart = parseInt(localStorage.getItem("abtalksStartDay") || "1", 10);
    setStartDay(assignedStart ?? storedStart);
  }, []);

  const next = tasks.length
    ? tasks.find((t) => !t.done && t.day >= startDay) || tasks[tasks.length - 1]
    : null;

  // Load proof-of-work whenever the active task changes
  useEffect(() => {
    if (!next) return;
    if (justSubmittedRef.current) {
      justSubmittedRef.current = false;
      return;
    }
    const saved = getProof(next.day);
    setGithub(saved.github || "");
    setLinkedin(saved.linkedin || "");
    setGithubInvalid(false);
    setLinkedinInvalid(false);
    setErrorMsg("");
    setSuccessMsg(saved.submitted ? `Proof submitted for Day ${String(next.day).padStart(2, "0")}. Your progress is saved on this device.` : "");
    setSubmitted(!!saved.submitted);
  }, [next?.day]);

  function toggleTask(day: number) {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.day === day ? { ...t, done: !t.done } : t));
      saveTasks(updated);
      return updated;
    });
  }

  function handleProofSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!next) return;
    setErrorMsg("");
    setSuccessMsg("");
    setGithubInvalid(false);
    setLinkedinInvalid(false);

    const githubValue = github.trim();
    const linkedinValue = linkedin.trim();

    if (!isValidProofUrl(githubValue, "github")) {
      setGithubInvalid(true);
      setErrorMsg("Please enter a valid GitHub repository, commit, pull request, or file URL.");
      return;
    }
    if (!isValidProofUrl(linkedinValue, "linkedin")) {
      setLinkedinInvalid(true);
      setErrorMsg("Please enter a valid LinkedIn post URL.");
      return;
    }

    justSubmittedRef.current = true;
    saveProof(next.day, {
      github: githubValue,
      linkedin: linkedinValue,
      submitted: true,
      submittedAt: new Date().toISOString(),
    });

    if (!next.done) {
      toggleTask(next.day);
    }

    setSuccessMsg(`Nice work. Day ${String(next.day).padStart(2, "0")} is now complete.`);
    setSubmitted(true);
  }

  function handleProofClear() {
    if (!next) return;
    setGithub("");
    setLinkedin("");
    setGithubInvalid(false);
    setLinkedinInvalid(false);
    setErrorMsg("");
    setSuccessMsg("");
    clearProof(next.day);
    setSubmitted(false);
  }

  if (!profile || !next) {
    return <main className="container dashboard" />;
  }

  const done = completedCount(tasks);
  const progress = getProgress(tasks);
  const streak = calculateStreak(tasks);

  return (
    <main className="container dashboard">
      <div className="page-head">
        <div>
          <p className="eyebrow">
            DAY <span>{String(next.day).padStart(2, "0")}</span> / 60
          </p>
          <h1>
            Keep the promise,
            <br />
            <em>{profile.name || "Student"}.</em>
          </h1>
        </div>
        <div className="page-actions">
          <Link className="btn outline" href="/profile">
            My profile ↗
          </Link>
          <Link className="btn outline" href="/challenge">
            View full challenge ↗
          </Link>
        </div>
      </div>

      <section className="profile-strip">
        <div className="profile-main">
          <div className="avatar">{(profile.name || "Student").charAt(0).toUpperCase()}</div>
          <div>
            <h3>{profile.name || "Student"}</h3>
            <p>
              {profile.college || "College / University"} · {profile.email || "student@example.com"}
            </p>
          </div>
        </div>
        <div className="profile-meta">
          <div>
            TRACK
            <b>{profile.track || "BUILD"}</b>
          </div>
          <div>
            STATUS
            <b>ACTIVE</b>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="panel today">
          <div className="panel-top">
            <span>TODAY&apos;S TASK</span>
            <span className="orange">●</span>
          </div>
          <div className="big-day">{String(next.day).padStart(2, "0")}</div>
          <h2>{next.title}</h2>
          <p>Complete the task, then mark it done. Small proof every day adds up.</p>
          <button
            className={`btn primary${next.done ? " outline" : ""}`}
            onClick={() => toggleTask(next.day)}
          >
            {next.done ? "✓ Task completed" : "Mark task complete →"}
          </button>
        </article>

        <article className="panel progress-card">
          <div className="panel-top">
            <span>YOUR PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div
            className="progress-ring"
            style={{ background: `conic-gradient(var(--orange) ${progress * 3.6}deg,#34342f 0deg)` }}
          >
            <div>
              <strong>{done}</strong>
              <small>TASKS</small>
            </div>
          </div>
          <div className="progress-row">
            <span>Challenge</span>
            <b>{progress}%</b>
          </div>
          <div className="bar">
            <i style={{ width: `${progress}%` }} />
          </div>
        </article>

        <article className="panel streak">
          <div className="panel-top">
            <span>CURRENT STREAK</span>
            <span>🔥</span>
          </div>
          <strong>{streak}</strong>
          <small>days in a row</small>
          <div className="week">
            {WEEK_LABELS.map((label, i) => (
              <span key={i} className={i < streak ? "active" : ""}>
                {label}
              </span>
            ))}
          </div>
        </article>

        <article className="panel recent">
          <div className="panel-top">
            <span>RECENT TASKS</span>
            <Link href="/challenge">SEE ALL →</Link>
          </div>
          <div>
            {tasks.slice(0, 6).map((task) => (
              <button key={task.day} className="task-row" onClick={() => toggleTask(task.day)}>
                <span className={`check${task.done ? " done" : ""}`}>{task.done ? "✓" : ""}</span>
                <span className="task-info">
                  <b>DAY {String(task.day).padStart(2, "0")}</b>
                  <span>{task.title}</span>
                </span>
                <span className="task-time">{task.time}</span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="proof-section">
        <div className="proof-heading">
          <div>
            <p className="eyebrow">LEAVE YOUR RECEIPT</p>
            <h2>Show the work.</h2>
          </div>
          <span className="proof-step">02 / 02</span>
        </div>

        <form className="proof-card" onSubmit={handleProofSubmit}>
          <div className="proof-intro">
            <span>PROOF OF WORK</span>
            <p>Submit the links that show what you built or shared today. Your links stay yours — we only use them to mark the day complete.</p>
          </div>

          <div className="proof-field">
            <label htmlFor="githubUrl">GITHUB REPOSITORY OR COMMIT URL</label>
            <span className="field-icon">⌘</span>
            <input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/you/project/commit/..."
              autoComplete="url"
              className={githubInvalid ? "invalid" : ""}
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <small>Paste a repository, commit, pull request, or file URL.</small>
          </div>

          <div className="proof-field">
            <label htmlFor="linkedinUrl">LINKEDIN POST URL</label>
            <span className="field-icon">in</span>
            <input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/posts/..."
              autoComplete="url"
              className={linkedinInvalid ? "invalid" : ""}
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <small>Share a short progress update so your work is visible.</small>
          </div>

          {errorMsg && (
            <p className="proof-error show" role="alert">
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p className="proof-success show" role="status">
              {successMsg}
            </p>
          )}

          <div className="proof-actions">
            <button className="btn primary" type="submit">
              {submitted ? "Update today's proof →" : "Submit today's proof →"}
            </button>
            <button className="btn outline proof-clear" type="button" onClick={handleProofClear}>
              Clear
            </button>
          </div>
        </form>

        <div className="proof-note">
          <span>↳</span>
          <div>
            <strong>Not ready to post yet?</strong>
            <br />
            <span>Your links are saved on this device if you come back later.</span>
          </div>
        </div>
      </section>

      <section className="milestone">
        <div>
          <p className="eyebrow">NEXT MILESTONE</p>
          <h2>First 7-day streak.</h2>
          <p>Keep showing up. Your next badge unlocks after seven completed days.</p>
        </div>
        <div className="milestone-number">
          <span>{Math.min(streak, 7)}</span> <small>/ 07</small>
        </div>
      </section>
    </main>
  );
}