'use client';

import filterPNG from '../../../images/filter.png';
import AddSubtask from './add-subtask';
import Subtask from './subtask';
import { useDispatch } from 'react-redux';
import { useContext, useRef } from 'react';
import {
  addSubtask,
  deleteTask,
} from '@/redux-toolkit/features/tasks/taskSlice';
import { TaskContext } from '../page';
import Image from 'next/image';

export default function TaskSubtasks() {
  const dispatch = useDispatch();
  const { id: taskId, subtasks: tasks } = useContext(TaskContext);
  const ref = useRef<HTMLElement>(null);

  function handleChecked(id: string) {
    const alteredTask = tasks.find((t) => t.id === id);
    if (!alteredTask) throw new Error('subtask does not exist');
  }

  function handleDropDown() {
    if (ref?.current) {
      ref.current.style.opacity = ref.current.style.opacity === '1' ? '0' : '1';
    }
  }

  // TODO create filter of subtasks
  return (
    <section className="flex flex-col mx-2 bg-white rounded-3xl mt-40">
      <nav className="flex justify-between">
        <h2 className="text-3xl mx-5 mt-5">All subtasks</h2>
        <div className="mx-10 mt-5">
          <button
            type="button"
            onClick={handleDropDown}
          >
            <Image
              src={filterPNG}
              alt="filter"
              width={30}
            />
          </button>
          <section
            className="absolute border rounded-md shadow-lg px-1 right-[20px]"
            ref={ref}
          >
            <ul className="text-center">
              <li>
                <button type="button">Done</button>
              </li>
              <li>
                <button type="button">In Process</button>
              </li>
              <li>
                <button type="button">Archived</button>
              </li>
            </ul>
          </section>
        </div>
      </nav>
      <ul className="flex flex-col gap-3 mt-5 px-10">
        {tasks.map((t) => (
          <Subtask
            task={t}
            parentTaskId={taskId}
            onCheck={handleChecked}
            removeTask={() => dispatch(deleteTask)}
          />
        ))}
      </ul>
      <AddSubtask
        onAdd={() =>
          dispatch(
            addSubtask({
              id: taskId,
              subtask: {
                id: Date.now().toString(),
                description: 'create title',
                done: false,
              },
            })
          )
        }
      />
    </section>
  );
}
