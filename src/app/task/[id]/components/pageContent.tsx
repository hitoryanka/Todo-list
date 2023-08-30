import {
  Isubtask,
  Itask,
  Status,
} from '@/redux-toolkit/features/api/tasksApiSlice';
import { createContext } from 'react';
import TaskHeader from './task';
import TaskSubtasks from './task-subtasks';

export const Context = createContext<{
  task: Itask;
  setTask: Function;
  subtasks: Isubtask[];
}>({
  task: {
    id: 0,
    title: "doesn't exist",
    status: Status.inProcess,
    date: 'none',
    description: 'none',
    important: false,
  },
  setTask: () => {},
  subtasks: [],
});

export function PageContent({
  task,
  setTask,
  subtasks,
}: {
  task: Itask;
  setTask: Function;
  subtasks: Isubtask[];
}) {
  return (
    <Context.Provider value={{ task, setTask, subtasks }}>
      <TaskHeader />
      <TaskSubtasks />
    </Context.Provider>
  );
}
