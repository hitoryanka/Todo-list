'use client';

import CreateTask from './createTask';
import { useDispatch, useSelector } from 'react-redux';

import filterSVG from '../images/filter.png';
import Image from 'next/image';
import Task from './task';
import { IState } from '@/redux-toolkit/store';
import { useRef, useState } from 'react';
import { handleDropDown } from '@/lib/utils';
import { sortTasks } from '@/redux-toolkit/features/tasks/taskSlice';

export default function Tasks() {
  const tasks = useSelector((state: IState) => state.tasks);
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);

  return (
    <main className="w-90 mx-5 mt-1">
      <CreateTask />
      <div className="flex-row bg-white rounded-[40px]  px-8 py-5">
        <header className="flex justify-between items-center">
          <h2 className="text-4xl font-light">Tasks</h2>
          <div
            className="flex flex-col justify-center gap-3"
            onMouseEnter={({ type }) => handleDropDown(type, ref)}
            onMouseLeave={({ type }) => handleDropDown(type, ref)}
          >
            <button
              type="button"
              onClick={({ type }) => handleDropDown(type, ref)}
            >
              <Image
                src={filterSVG}
                alt="filters"
                width={32}
                height={32}
              />
            </button>
            <section
              className="absolute self-center bg-white translate-x-[-10px] translate-y-[75px] transition opacity-0 duration-200 border rounded-md shadow-lg right-[20px]"
              ref={ref}
            >
              <ul className="text-center w-full">
                <li className="hover:bg-blue-600 active:bg-blue-400 rounded-t-md">
                  <button
                    className="mx-1"
                    type="button"
                    onClick={() =>
                      dispatch(sortTasks({ sortType: 'important' }))
                    }
                  >
                    Important
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400">
                  <button
                    className="mx-1"
                    type="button"
                    onClick={() => dispatch(sortTasks({ sortType: 'pending' }))}
                  >
                    Pending
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400">
                  <button
                    className="mx-1"
                    type="button"
                    onClick={() => dispatch(sortTasks({ sortType: 'done' }))}
                  >
                    Done
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400">
                  <button
                    className="mx-1"
                    type="button"
                    onClick={() => dispatch(sortTasks({ sortType: 'new' }))}
                  >
                    New
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400 rounded-b-md">
                  <button
                    className="mx-1"
                    type="button"
                  >
                    Archived
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </header>
        <main className="h-[45vh] overflow-scroll no-scrollbar">
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
            />
          ))}
        </main>
      </div>
    </main>
  );
}
