'use client';

import filterPNG from '../../../images/filter.png';
import AddSubtask from './add-subtask';
import Subtask from './subtask';
import { useContext, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { handleDropDown } from '@/lib/utils';
import { context } from '../page';
import {
  useAddSubtaskMutation,
  useDeleteSubtaskMutation,
} from '@/redux-toolkit/features/api/subtasksApiSlice';

export default function TaskSubtasks() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'done' | 'pending'>('all');

  const {
    subtasks,
    task: { id },
  } = useContext(context);

  const subtasksToRender = useMemo(() => {
    switch (filter) {
      case 'all':
        return subtasks;
      case 'pending':
        return [...subtasks].filter((task) => !task.done);
      case 'done':
        return [...subtasks].filter((task) => task.done);
    }
  }, [filter, subtasks]);

  const [addSubtask] = useAddSubtaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  function handleAddSubtask() {
    // TODO make task pagination by making side-scrollable table of tasks
    //  you can scroll it with finger using smartphone
    addSubtask(id);
  }

  return (
    <section className="relative flex flex-col justify-between mx-2 bg-white rounded-3xl mt-40">
      <div>
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
              className="absolute bg-white translate-x-[-5px] transition opacity-0 duration-200 border rounded-md shadow-lg right-[20px] pointer-events-none"
              ref={ref}
            >
              <ul className="text-center w-full">
                <li className="hover:bg-blue-600 active:bg-blue-400 rounded-t-md">
                  <button
                    className="mx-1"
                    type="button"
                    disabled={filter === 'all'}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400">
                  <button
                    className="mx-1"
                    type="button"
                    disabled={filter === 'pending'}
                    onClick={() => setFilter('pending')}
                  >
                    Pending
                  </button>
                </li>
                <li className="hover:bg-blue-600 active:bg-blue-400 rounded-b-md">
                  <button
                    className="mx-1"
                    type="button"
                    disabled={filter === 'done'}
                    onClick={() => setFilter('done')}
                  >
                    Done
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </nav>
        <ul className="flex flex-col gap-3 mt-5 px-10 h-[45vh]">
          {subtasksToRender.map((t) => {
            return (
              <Subtask
                task={t}
                key={t.id}
              />
            );
          })}
        </ul>
      </div>

      <AddSubtask onAdd={handleAddSubtask} />
    </section>
  );
}
