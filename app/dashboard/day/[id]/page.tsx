"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTasks,
  saveTasks,
  type Task,
} from "@/lib/tasks";
import {
  getProof,
  saveProof,
  isValidProofUrl,
} from "@/lib/proof";

type Props = {
  params: Promise<{ id: string }>;
};

export default function ChallengeDay({ params }: Props) {
  const [day, setDay] = useState(12);
  const [task, setTask] = useState<Task | null>(null);

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [githubInvalid, setGithubInvalid] = useState(false);
  const [linkedinInvalid, setLinkedinInvalid] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadDay() {
      const resolvedParams = await params;
      const requestedDay = Number(resolvedParams.id);

      const safeDay =
        Number.isInteger(requestedDay) && requestedDay >= 1 && requestedDay <= 60
          ? requestedDay
          : 12;

      setDay(safeDay);

      const tasks = getTasks();
      const currentTask = tasks.find((item) => item.day === safeDay) || null;

      setTask(currentTask);

      const savedProof = getProof(safeDay);

      setGithub(savedProof.github || "");
      setLinkedin(savedProof.linkedin || "");
    }

    loadDay();
  }, [params]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!task) return;

    setErrorMsg("");
    setSuccessMsg("");
    setGithubInvalid(false);
    setLinkedinInvalid(false);

    const githubValue = github.trim();
    const linkedinValue = linkedin.trim();

    if (!isValidProofUrl(githubValue, "github")) {
      setGithubInvalid(true);
      setErrorMsg(
        "Please enter a valid GitHub repository, commit, pull request, or file URL."
      );
      return;
    }

    if (!isValidProofUrl(linkedinValue, "linkedin")) {
      setLinkedinInvalid(true);
      setErrorMsg("Please enter a valid LinkedIn post URL.");
      return;
    }

    saveProof(day, {
      github: githubValue,
      linkedin: linkedinValue,
      submitted: true,
      submittedAt: new Date().toISOString(),
    });

    const tasks = getTasks();

    const updatedTasks = tasks.map((item) =>
      item.day === day ? { ...item, done: true } : item
    );

    saveTasks(updatedTasks);

    setTask((current) =>
      current ? { ...current, done: true } : current
    );

    setSuccessMsg(
      `Nice work. Day ${String(day).padStart(2, "0")} is now complete.`
    );
  }

  if (!task) {
    return (
      <main className="container challenge">
        <p className="eyebrow">CHALLENGE DAY</p>
        <h1>Day {day}</h1>
        <p className="admin-note">
          This challenge day could not be found.
        </p>
        <Link href="/dashboard" className="btn primary">
          Back to dashboard →
        </Link>
      </main>
    );
  }

  return (
    <main className="container challenge">
      <div className="page-head">
        <div>
          <p className="eyebrow">
            DAY {String(day).padStart(2, "0")} / 60
          </p>

          <h1>{task.title}</h1>
        </div>

        <Link href="/dashboard" className="text-link">
          ← Dashboard
        </Link>
      </div>

      <section className="panel today">
        <div className="panel-top">
          <span>{task.category}</span>
          <span>{task.time}</span>
        </div>

        <div className="big-day">
          {String(day).padStart(2, "0")}
        </div>

      <h2>Today&apos;s challenge</h2>

        <p>
          Complete this task, build something useful, and leave visible
          proof of your work.
        </p>

        <div className="profile-field">
          <strong>What counts as done?</strong>

          <p>
            Build or complete the task, push your work to GitHub, and
            share your progress publicly on LinkedIn.
          </p>
        </div>

        {task.done && (
          <p className="proof-success show">
            ✓ This challenge day is complete.
          </p>
        )}
      </section>

      <section className="proof-section">
        <div className="proof-heading">
          <div>
            <p className="eyebrow">PROOF OF WORK</p>
            <h2>Show the work.</h2>
          </div>

          <span className="proof-step">02 / 02</span>
        </div>

        <form className="proof-card" onSubmit={handleSubmit}>
          <div className="proof-intro">
            <span>YOUR RECEIPT</span>

            <p>
              Submit the links that show what you built and shared today.
            </p>
          </div>

          <div className="proof-field">
            <label htmlFor="githubUrl">
              GITHUB REPOSITORY OR COMMIT URL
            </label>

            <input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/you/project/commit/..."
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className={githubInvalid ? "invalid" : ""}
            />

            <small>
              Repository, commit, pull request, or file URL.
            </small>
          </div>

          <div className="proof-field">
            <label htmlFor="linkedinUrl">
              LINKEDIN POST URL
            </label>

            <input
              id="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/posts/..."
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className={linkedinInvalid ? "invalid" : ""}
            />

            <small>
              Share a short progress update about today&apos;s work.
            </small>
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
              {task.done
                ? "Update today's proof →"
                : "Submit today's proof →"}
            </button>

            <Link href="/dashboard" className="btn outline">
              Back to dashboard
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}