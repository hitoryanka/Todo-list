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

  function handleSort() {
    return [...subtasks].sort((t1, t2) => {
      if (currentSort === 'done') {
        if (t1.done && t2.done) {
          return +t2.id - +t1.id;
        } else {
          return t1.done ? 1 : -1;
        }
      } else if (currentSort === 'pending') {
        if (!t1.done && !t2.done) {
          return +t2.id - +t1.id;
        } else {
          return t2.done ? 1 : -1;
        }
      } else {
        return +t2.id - +t1.id;
      }
    });
  }

  function handleAddSubtask() {
    const newTask = {
      id: Date.now().toString(),
      description: 'create title',
      done: false,
    };
    // setSortedSubtasks((prev) => [...prev, newTask]);
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
                  onClick={() => setCurrentSort('done')}
                >
                  Done
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400">
                <button
                  className="mx-1"
                  type="button"
                  onClick={() => setCurrentSort('pending')}
                >
                  Pending
                </button>
              </li>
              <li className="hover:bg-blue-600 active:bg-blue-400 rounded-b-md">
                <button
                  className="mx-1"
                  type="button"
                  onClick={() => setCurrentSort('new')}
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
        {handleSort().map((t, i) => {
          if (i === 0) {
            console.log('start render');
          }
          if (i === subtasks.length - 1) {
            console.log('end render');
          }
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
