'use client';

import { createContext, useState } from 'react';
import TaskSubtasks from './components/task-subtasks';
import TaskHeader from './components/task';
import { useGetSubtasksQuery } from '@/redux-toolkit/features/api/subtasksApiSlice';
import {
  Isubtask,
  Status,
  Itask,
} from '@/redux-toolkit/features/api/tasksApiSlice';

export const context = createContext<{
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

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { task: string };
}) {
  const [task, setTask] = useState<Itask>(JSON.parse(searchParams.task));

  const {
    data: subtasks,
    isLoading,
    isError,
    isSuccess,
  } = useGetSubtasksQuery(+params.id);

  if (isError) {
    return <h1 className="text-white">no such task</h1>;
  } else if (isLoading) {
    return <p>loading...</p>;
  } else if (isSuccess) {
    return (
      <context.Provider value={{ task, setTask, subtasks }}>
        <article className="flex-1 flex-col h-full font-light">
          <TaskHeader />
          <TaskSubtasks />
        </article>
      </context.Provider>
    );
  }
}
