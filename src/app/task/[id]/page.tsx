'use client';

import { Isubtask, Itask, Status, initialTasks } from '@/lib/initialTasks';
import { useContext, createContext } from 'react';
import { useSelector } from 'react-redux';
import TaskSubtasks from './components/task-subtasks';
import Task from './components/task';
import { IState } from '@/redux-toolkit/store';
import { create } from 'domain';

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
    <TaskContext.Provider value={task}>
      <article className="flex-1 flex-col h-full">
        <Task />
        <TaskSubtasks />
      </article>
    </TaskContext.Provider>
  );
}
