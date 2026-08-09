import Link from "next/link";

export default function About() {
  return (
    <main className="container about">
      <p className="eyebrow">HOW IT WORKS</p>
      <h1>
        Less scrolling.
        <br />
        <em>More shipping.</em>
      </h1>

      <div className="about-grid">
        <article>
          <span>01</span>
          <h2>Show up</h2>
          <p>Open your dashboard and see exactly what you need to do today.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Do the work</h2>
          <p>Complete one focused task. The goal is progress, not perfection.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Make it visible</h2>
          <p>Share what you built and create a public record of your learning.</p>
        </article>
      </div>

      <Link className="btn primary" href="/dashboard">
        Enter my dashboard →
      </Link>
    </main>
  );
}