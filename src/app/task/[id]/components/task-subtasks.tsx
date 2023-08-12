'use client';

import filterPNG from '../../../images/filter.png';
import AddSubtask from './add-subtask';
import Subtask from './subtask';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useRef, useState } from 'react';
import {
  addSubtask,
  sortSubtasks,
} from '@/redux-toolkit/features/tasks/taskSlice';
import { TaskContext } from '../page';
import Image from 'next/image';
import { handleDropDown } from '@/lib/utils';

export default function TaskSubtasks() {
  const dispatch = useDispatch();
  const { id: taskId, subtasks } = useContext(TaskContext);

  const ref = useRef<HTMLElement>(null);

  function handleAddSubtask() {
    const newTask = {
      id: Date.now().toString(),
      description: 'create title',
      done: false,
    };
    // TODO make task pagination by making side-scrollable table of tasks
    //  you can scroll it with finger using smartphone
    dispatch(addSubtask({ id: taskId, subtask: newTask }));
  }

  return (
    <section className="flex flex-col mx-2 bg-white rounded-3xl mt-40">
      <nav className="flex justify-between">
        <h2 className="text-3xl mx-5 mt-5">All subtasks</h2>
        <div
          className="mx-10 mt-5"
          onMouseEnter={({ type }) => handleDropDown(type, ref)}
          onMouseLeave={({ type }) => handleDropDown(type, ref)}
        >
          <button
            type="button"
            onClick={({ type }) => handleDropDown(type, ref)}
          >
            <Image
              src={filterPNG}
              alt="filter"
              width={30}
            />
          </button>

          <section
            className="absolute bg-white translate-x-[-10px] transition opacity-0 duration-200 border rounded-md shadow-lg right-[20px]"
            ref={ref}
          >
            <ul className="text-center w-full">
              <li className="hover:bg-blue-600 active:bg-blue-400 rounded-t-md">
                <button
                  className="mx-1"
                  type="button"
                  onClick={() =>
                    dispatch(sortSubtasks({ id: taskId, sortType: 'done' }))
                  }
                >
                  Done
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400">
                <button
                  className="mx-1"
                  type="button"
                  onClick={() =>
                    dispatch(sortSubtasks({ id: taskId, sortType: 'pending' }))
                  }
                >
                  Pending
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400 rounded-b-md">
                <button
                  className="mx-1"
                  type="button"
                  onClick={() =>
                    dispatch(sortSubtasks({ id: taskId, sortType: 'new' }))
                  }
                >
                  New
                </button>
              </li>
            </ul>
          </section>
        </div>
      </nav>
      <ul className="flex flex-col gap-3 mt-5 px-10">
        {/* BUG instead of sorting on every render use useMemo() to maintain order of task untill sorting button pressed */}
        {subtasks.map((t) => {
          return (
            <Subtask
              task={t}
              key={t.id}
              removeTask={() => console.log("I'm not deleting anything yet!")}
            />
          );
        })}
      </ul>
      <AddSubtask onAdd={() => handleAddSubtask()} />
    </section>
  );
}
