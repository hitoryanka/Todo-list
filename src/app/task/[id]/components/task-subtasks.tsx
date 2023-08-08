'use client';

import filterPNG from '../../../images/filter.png';
import AddSubtask from './add-subtask';
import Subtask from './subtask';
import { useDispatch } from 'react-redux';
import { useContext, useRef, useState } from 'react';
import { addSubtask } from '@/redux-toolkit/features/tasks/taskSlice';
import { TaskContext } from '../page';
import Image from 'next/image';

export default function TaskSubtasks() {
  const dispatch = useDispatch();
  const { id: taskId, subtasks } = useContext(TaskContext);
  const [sortedSubtasks, setSortedSubtasks] = useState(subtasks);
  const [currentSort, setCurrentSort] = useState('new');

  const ref = useRef<HTMLElement>(null);

  function handleDropDown(type: string) {
    if (!ref?.current) {
      return;
    }
    if (type === 'mouseenter') {
      ref.current.style.opacity = '1';
    } else if (type === 'mouseleave') {
      ref.current.style.opacity = '0';
    } else {
      ref.current.style.opacity = ref.current.style.opacity === '1' ? '0' : '1';
    }

    if (ref.current.style.opacity === '1') {
      ref.current.style.pointerEvents = 'auto';
    } else {
      ref.current.style.pointerEvents = 'none';
    }
  }

  function handleSort(sortType: string) {
    if (sortType !== currentSort) {
      setCurrentSort(sortType);
    }
    let sortedSubtasks = [...subtasks];
    if (sortType === 'done') {
      sortedSubtasks = [
        ...sortedSubtasks.filter((t) => t.done),
        ...sortedSubtasks.filter((t) => !t.done),
      ];
    }
    setSortedSubtasks(sortedSubtasks);
  }

  function handleAddSubtask() {
    const newTask = {
      id: Date.now().toString(),
      description: 'create title',
      done: false,
    };
    setSortedSubtasks((prev) => [...prev, newTask]);
    dispatch(addSubtask({ id: taskId, subtask: newTask }));
  }

  // TODO create filter of subtasks
  return (
    <section className="flex flex-col mx-2 bg-white rounded-3xl mt-40">
      <nav className="flex justify-between">
        <h2 className="text-3xl mx-5 mt-5">All subtasks</h2>
        <div
          className="mx-10 mt-5"
          onMouseEnter={({ type }) => handleDropDown(type)}
          onMouseLeave={({ type }) => handleDropDown(type)}
        >
          <button
            type="button"
            onClick={({ type }) => handleDropDown(type)}
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
                  onClick={() => handleSort('done')}
                >
                  Done
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400">
                <button
                  className="mx-1"
                  type="button"
                >
                  Pending
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400 rounded-b-md">
                <button
                  className="mx-1"
                  type="button"
                >
                  New
                </button>
              </li>
            </ul>
          </section>
        </div>
      </nav>
      <ul className="flex flex-col gap-3 mt-5 px-10">
        {sortedSubtasks.map((t) => (
          <Subtask
            task={t}
            removeTask={() => console.log("I'm not deleting anything yet!")}
          />
        ))}
      </ul>
      <AddSubtask onAdd={() => handleAddSubtask()} />
    </section>
  );
}
