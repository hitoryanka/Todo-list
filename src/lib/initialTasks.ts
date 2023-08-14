export enum Status {
  inProcess = 'In Process',
  done = 'Done',
  archived = 'Archived',
}

export interface Itask {
  id: string;
  title: string;
  date: string;
  description: string;
  important: boolean;
  status: Status;
  subtasks: Isubtask[];
}

export interface Isubtask {
  id: string;
  description: string;
  done: boolean;
}

export const initialTasks: Itask[] = [
  {
    id: '0',
    title: 'Drink some water',
    date: '1692019595593',
    description: 'get a glass of water and chug it in',
    important: true,
    status: Status.inProcess,
    subtasks: [],
  },
  {
    id: '1',
    title: 'Brush teeth',
    date: '1692019595593',
    description: "gotta keep'em clean!",
    important: true,
    status: Status.inProcess,
    subtasks: [
      { id: '0', description: 'first subtask', done: true },
      { id: '1', description: 'second subtask', done: false },
      { id: '2', description: 'third subtask', done: false },
    ],
  },
  {
    id: '2',
    title: 'Do some stretches',
    date: '1692019595593',
    description: 'you got too rusty!',
    important: false,
    status: Status.inProcess,
    subtasks: [
      { id: '0', description: 'first subtask', done: true },
      { id: '1', description: 'second subtask', done: true },
      { id: '2', description: 'third subtask', done: false },
    ],
  },
];

export function calculateProgress(subtasks: Isubtask[]): string {
  const progress =
    +(
      subtasks.filter((subtask) => subtask.done).length / subtasks.length
    ).toFixed(2) * 100;

  return progress.toString();
}
