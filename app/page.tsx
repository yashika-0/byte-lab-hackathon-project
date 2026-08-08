import Link from "next/link";
import { fetchLanding } from "@/lib/api";

export default async function Home() {
  const data = await fetchLanding();

  const eyebrow = data?.challenge.tagline || "60 DAYS / BUILD IN PUBLIC";
  const heroTitle = data?.intro.title || "Build in public. Become undeniable.";
  const heroText =
    data?.intro.description ||
    "A simple daily system for students who want to stop consuming and start building. Show up, finish the task, share the work.";
  const days = data?.challenge.durationDays ?? 60;

  const steps = data?.howItWorks || [
    { step: 1, title: "Ship something small every day.", description: "" },
    { step: 2, title: "Learn only what you need to move forward.", description: "" },
    { step: 3, title: "Share your work and collect feedback.", description: "" },
  ];

  const cta = data?.callToAction || {
    title: "Keep the promise, not the excuse.",
    description: "Consistency beats motivation. Your dashboard makes the next step obvious.",
    buttonText: "Start the Challenge",
  };

  return (
    <main>
      <section className="hero container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{heroTitle}</h1>
        <p className="hero-text">{heroText}</p>
        <div className="actions">
          <Link className="btn primary" href="/dashboard">
            Start the {days}-day challenge →
          </Link>
          <Link className="text-link" href="/about">
            See how it works ↗
          </Link>
        </div>

        <div className="line" />
        <div className="stats">
          <div>
            <strong>{days}</strong>
            <small>DAYS</small>
          </div>
          <div>
            <strong>01</strong>
            <small>TASK / DAY</small>
          </div>
          <div>
            <strong>03</strong>
            <small>CORE HABITS</small>
          </div>
        </div>
      </section>

      <section className="cream">
        <div className="container two-col">
          <div>
            <p className="eyebrow dark">THE IDEA</p>
            <h2>
              Make your first
              <br />
              <em>useful</em> thing.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              {data?.intro.motivation || "Your project does not need to be perfect. It needs to exist."}
            </p>
            <ul className="feature-list">
              {steps.map((step) => (
                <li key={step.step}>
                  <b>{String(step.step).padStart(2, "0")}</b> {step.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container quote">
        <span className="quote-mark">&ldquo;</span>
        <h2>{cta.title}</h2>
        <p>{cta.description}</p>
      </section>
    </main>
  );
}