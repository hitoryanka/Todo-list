'use client';

import Link from 'next/link';
import { useContext, useRef } from 'react';
import { Context } from '../page';
import { handleDropDown } from '@/lib/utils';
import {
  Itask,
  Status,
  useUpdateTaskMutation,
} from '@/redux-toolkit/features/api/tasksApiSlice';

export default function TaskNav() {
  const [updateTask] = useUpdateTaskMutation();
  const {
    task: { id, status },
    setTask,
  } = useContext(Context);

  const ref = useRef<HTMLElement>(null);

  function handleStatus(newStatus: Status) {
    setTask((prevState: Itask) => ({
      ...prevState,
      status: newStatus,
    }));
    updateTask({ id, status: newStatus });
  }

  return (
    <nav className="flex justify-between mb-5">
      <Link
        href="/"
        className="text-white text-3xl cursor-pointer"
      >
        {'<'}
      </Link>
      <div
        onMouseEnter={({ type }) => handleDropDown(type, ref)}
        onMouseLeave={({ type }) => handleDropDown(type, ref)}
        className="relative z-10"
      >
        <button
          type="button"
          onClick={({ type }) => handleDropDown(type, ref)}
          className="px-3 py-2 mb-2 text-lg rounded-2xl border-2 w-32 border-yellow-300 text-yellow-300 active:border-yellow-200 active:text-yellow-200"
        >
          {status}
        </button>
        <section
          // BUG there is better way to position dropdown rather than use "translate-x"
          className="absolute bg-white translate-x-[27px] w-28 transition opacity-0 pointer-events-none duration-200 shadow-lg right-[20px]"
          ref={ref}
        >
          <ul className="absolute bg-white text-center rounded-md">
            <li className="hover:bg-blue-500 rounded-t-md p-1">
              <button
                type="button"
                onClick={() => handleStatus(Status.inProcess)}
              >
                in Process
              </button>
            </li>
            <li className="hover:bg-blue-500 rounded-b-md p-1">
              <button
                type="button"
                onClick={() => handleStatus(Status.done)}
              >
                Done
              </button>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
}
