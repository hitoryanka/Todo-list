'use client';

import profilePic from '../app/images/me.jpg';
import notifyBell from '../app/images/bell.svg';

import Header from './components/header';
import TasksCounter from './components/tasks-counter';
import Tasks from './components/tasks';
import { useGetTasksQuery } from '@/redux-toolkit/features/api/tasksApiSlice';

export default function Home() {
  const { data: tasks, isLoading, isError, isSuccess } = useGetTasksQuery();
  if (isLoading) {
    return <p>loading...</p>
  } else if (isError) {
    return <p>Error!!!</p>
  } else if (isSuccess) {
    return (
      <main className="flex justify-center">
        <div className="sm:max-w-2xl grow">
          <Header
            profilePic={profilePic}
            notifyBell={notifyBell}
          />
          {isSuccess && <TasksCounter tasks={tasks} />}
          <Tasks
            tasks={tasks}
          />
        </div>
      </main>
  );
}}
