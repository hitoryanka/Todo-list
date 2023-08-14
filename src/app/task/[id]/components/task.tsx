import TaskNav from './task-nav';
import TaskProgress from './task-progress';
import TaskTitle from './task-title';
import { useContext } from 'react';
import { TaskContext } from '../page';
import Description from './task-description';

export default function TaskHeader() {
  const { subtasks } = useContext(TaskContext);
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
