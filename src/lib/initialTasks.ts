export interface Itask {
  id: number;
  title: string;
  date: string;
  description: string;
  important: boolean;
  status: "in process" | "done" | "archived";
  subtasks: Isubtask[];
}

export interface Isubtask {
  id: number;
  description: string;
  done: boolean;
}

export const initialTasks: Itask[] = [
  {
    id: 0,
    title: "Drink some water",
    date: "may 17th",
    description: "get a glass of water and chug it in",
    important: true,
    status: "in process",
    subtasks: [],
  },
  {
    id: 1,
    title: "Brush teeth",
    date: "may 17th",
    description: "gotta keep'em clean!",
    important: true,
    status: "in process",
    subtasks: [
      { id: 0, description: "first subtask", done: true },
      { id: 1, description: "second subtask", done: false },
      { id: 2, description: "third subtask", done: false },
    ],
  },
  {
    id: 2,
    title: "Do some stretches",
    date: "may 17th",
    description: "you got too rusty!",
    important: false,
    status: "in process",
    subtasks: [
      { id: 0, description: "first subtask", done: true },
      { id: 1, description: "second subtask", done: true },
      { id: 2, description: "third subtask", done: false },
    ],
  },
];

export function calculateProgress(subtasks: Isubtask[]): string {
  const progress =
    +(
      subtasks.filter(subtask => subtask.done).length / subtasks.length
    ).toFixed(2) * 100;

  return progress.toString();
}
