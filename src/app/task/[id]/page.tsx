'use client';

import { useGetSubtasksQuery } from '@/redux-toolkit/features/api/subtasksApiSlice';
import { Itask } from '@/redux-toolkit/features/api/tasksApiSlice';
import { PageContent } from './components/pageContent';
import { useState } from 'react';

export default function Page({
  params = null,
  searchParams = null,
}: {
  params: { id: string } | null;
  searchParams: { task: string } | null;
}) {
  if (params === null || searchParams === null) {
    return <p>There's nothing torender.</p>;
  }

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
      <article className="flex-1 flex-col h-full font-light">
        <PageContent
          task={task}
          setTask={setTask}
          subtasks={subtasks}
        />
      </article>
    );
  }
}
