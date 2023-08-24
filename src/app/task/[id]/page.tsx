'use client';

import { Itask, Status } from '@/lib/initialTasks';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import TaskSubtasks from './components/task-subtasks';
import { IState } from '@/redux-toolkit/store';
import TaskHeader from './components/task';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { SubtasksApiSlice } from '@/redux-toolkit/features/api/subtasksApiSlice';

export const TaskContext = createContext<Itask>({
  id: '1',
  title: 'Brush teeth',
  date: 'may 17th',
  description: "gotta keep'em clean!",
  important: true,
  status: Status.inProcess,
  subtasks: [],
});

export default function Page({ params }: { params: { id: string } }) {
  const task = useSelector((state: IState) =>
    state.tasks.find((task) => task.id === params.id)
  );
  if (!task) {
    return <h1 className="text-white">no such task</h1>;
  }
  return (
    <ApiProvider api={SubtasksApiSlice}>
      <TaskContext.Provider value={task}>
        <article className="flex-1 flex-col h-full font-light">
          <TaskHeader />
          <TaskSubtasks />
        </article>
      </TaskContext.Provider>
    </ApiProvider>
  );
}
