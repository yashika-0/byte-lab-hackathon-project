export type Task = {
  day: number;
  title: string;
  category: string;
  time: string;
  done: boolean;
};

const defaultTasks: Task[] = [
  { day: 1, title: "Build your first useful API", category: "Build", time: "30 min", done: false },
  { day: 2, title: "Write your first public progress post", category: "Public", time: "15 min", done: false },
  { day: 3, title: "Ship one small feature", category: "Build", time: "45 min", done: false },
  { day: 4, title: "Learn one concept deeply", category: "Learn", time: "30 min", done: false },
  { day: 5, title: "Ask for feedback from a peer", category: "Connect", time: "15 min", done: false },
  { day: 6, title: "Improve yesterday's work", category: "Build", time: "40 min", done: false },
  { day: 7, title: "Publish your weekly reflection", category: "Public", time: "20 min", done: false },
];

function fillTo60(base: Task[]): Task[] {
  const tasks = [...base];
  for (let day = 1; day <= 60; day++) {
    if (!tasks.find((t) => t.day === day)) {
      tasks.push({
        day,
        title: `Complete your Day ${day} challenge`,
        category: day % 3 === 0 ? "Public" : day % 2 === 0 ? "Learn" : "Build",
        time: "30 min",
        done: false,
      });
    }
  }
  return tasks.sort((a, b) => a.day - b.day);
}

export function getTasks(): Task[] {
  if (typeof window === "undefined") return fillTo60(defaultTasks);
  try {
    const stored = JSON.parse(localStorage.getItem("abtalksTasks") || "null") as Task[] | null;
    const tasks = fillTo60(stored || defaultTasks);
    saveTasks(tasks);
    return tasks;
  } catch {
    return fillTo60(defaultTasks);
  }
}

export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("abtalksTasks", JSON.stringify(tasks));
}

export function completedCount(tasks: Task[]): number {
  return tasks.filter((t) => t.done).length;
}

export function getProgress(tasks: Task[]): number {
  return Math.round((completedCount(tasks) / 60) * 100);
}

export function calculateStreak(tasks: Task[]): number {
  let streak = 0;
  for (const t of tasks) {
    if (t.done) streak++;
    else break;
  }
  return streak;
}