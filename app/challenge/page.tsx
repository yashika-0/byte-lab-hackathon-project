"use client";

import { useEffect, useState } from "react";
import { getTasks, saveTasks, completedCount, type Task } from "@/lib/tasks";

const TRACKS = [
  { name: "BUILD", desc: "Create useful things." },
  { name: "LEARN", desc: "Learn by doing." },
  { name: "PUBLIC", desc: "Turn work into proof." },
  { name: "CONNECT", desc: "Get feedback early." },
];

export default function Challenge() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  function toggleTask(day: number) {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.day === day ? { ...t, done: !t.done } : t));
      saveTasks(updated);
      return updated;
    });
  }

  return (
    <main className="container challenge">
      <div className="page-head">
        <div>
          <p className="eyebrow">THE SYSTEM</p>
          <h1>
            Choose a track.
            <br />
            <em>Make it yours.</em>
          </h1>
        </div>
        <div className="counter">
          <strong>{completedCount(tasks)}</strong> / 60
        </div>
      </div>

      <div className="tracks">
        {TRACKS.map((track) => (
          <div key={track.name}>
            <span>{track.name}</span>
            <p>{track.desc}</p>
          </div>
        ))}
      </div>

      <div className="timeline">
        {tasks.map((task) => (
          <div key={task.day} className={`timeline-item${task.done ? " completed" : ""}`}>
            <div className="timeline-day">DAY {String(task.day).padStart(2, "0")}</div>
            <button className="timeline-card" onClick={() => toggleTask(task.day)}>
              <span className="timeline-check">{task.done ? "✓" : "+"}</span>
              <div>
                <small>
                  {task.category} · {task.time}
                </small>
                <h3>{task.title}</h3>
              </div>
              <span>↗</span>
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}