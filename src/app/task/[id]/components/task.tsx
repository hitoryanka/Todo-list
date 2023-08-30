'use client';

import TaskNav from './task-nav';
import TaskProgress from './task-progress';
import TaskTitle from './task-title';
import Description from './task-description';
import { useContext } from 'react';
import { Context } from './pageContent';

export default function TaskHeader() {
  const { subtasks } = useContext(Context);

  return (
    <section className="mt-5 mx-3 px-5">
      <TaskNav />
      <main>
        <TaskTitle />
        {subtasks.length ? <TaskProgress /> : ''}
        <Description />
      </main>
    </section>
  );
}
