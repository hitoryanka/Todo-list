'use client';

import { createContext } from 'react';
import { useSelector } from 'react-redux';
import TaskSubtasks from './components/task-subtasks';
import TaskHeader from './components/task';

import { useGetSubtasksQuery } from '@/redux-toolkit/features/api/subtasksApiSlice';
import {
  Isubtask,
  Status,
  Itask,
  useGetSingleTaskQuery,
} from '@/redux-toolkit/features/api/tasksApiSlice';
import { ST } from 'next/dist/shared/lib/utils';

export const context = createContext<{ task: Itask; subtasks: Isubtask[] }>({
  task: {
    id: 0,
    title: "doesn't exist",
    status: Status.inProcess,
    date: 'none',
    description: 'none',
    important: false,
  },
  subtasks: [],
});

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: task,
    isError: isTaskError,
    isSuccess: isTaskSuccess,
  } = useGetSingleTaskQuery(+params.id);
  const {
    data: subtasks,
    isLoading,
    isError,
    isSuccess,
  } = useGetSubtasksQuery(+params.id);
  if (isTaskError || isError) {
    return <h1 className="text-white">no such task</h1>;
  } else if (isLoading) {
    return <p>loading...</p>;
  } else if (isSuccess && isTaskSuccess) {
    return (
      <context.Provider value={{ task, subtasks }}>
        <article className="flex-1 flex-col h-full font-light">
          <TaskHeader />
          <TaskSubtasks subtasks={subtasks} />
        </article>
      </context.Provider>
    );
  }
}
