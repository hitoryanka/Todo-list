import { Isubtask } from '@/lib/initialTasks';
import TaskNav from './task-nav';
import TaskProgress from './task-progress';
import TaskTitle from './task-title';
import { useContext } from 'react';
import { TaskContext } from '../page';
import Description from './task-description';

export default function Task() {
  const { important, title, description, subtasks } = useContext(TaskContext);
  return (
    <section className="mt-5 mx-3 px-5">
      <TaskNav />
      <main>
        <TaskTitle />
        {/* TODO if there's no subtasks - change progress bar to a 'Done' button */}
        {subtasks.length ? <TaskProgress subtasks={subtasks} /> : ''}
        <Description />
      </main>
    </section>
  );
}
