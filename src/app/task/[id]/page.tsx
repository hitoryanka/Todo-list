'use client';

import { useGetSubtasksQuery } from '@/redux-toolkit/features/api/subtasksApiSlice';
import { Itask } from '@/redux-toolkit/features/api/tasksApiSlice';
import { PageContent } from './components/pageContent';
import { useEffect, useState } from 'react';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { task: string };
}) {
  const [task, setTask] = useState<Itask | null>(null);

  const {
    data: subtasks,
    isLoading,
    isError,
    isSuccess,
  } = useGetSubtasksQuery(+params.id);

  useEffect(() => {
    setTask(JSON.parse(searchParams.task));
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError || !task) {
    return <h1 className="text-white">no such task</h1>;
  }
  if (isSuccess) {
    return (
      <article className="flex-1 flex-col h-full font-light">
        <PageContent
          task={task}
          setTask={setTask}
          subtasks={subtasks}
        />
      </article>
    );
  } else {
    return null;
  }
}
