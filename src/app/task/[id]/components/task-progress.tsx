'use client';

import { useContext, useEffect } from 'react';
import {
  Itask,
  Status,
  useUpdateTaskMutation,
} from '@/redux-toolkit/features/api/tasksApiSlice';
import { calculateProgress } from '@/lib/utils';
import { Context } from './pageContent';

export default function TaskProgress() {
  const [updateTask] = useUpdateTaskMutation();
  const {
    task: { id, status },
    setTask,
    subtasks,
  } = useContext(Context);

  const progress = calculateProgress(subtasks);

  useEffect(() => {
    if (progress === '100' && status === Status.inProcess) {
      setTask((prevState: Itask) => ({ ...prevState, status: Status.done }));
      updateTask({ id, status: Status.done });
    } else if (progress !== '100' && status === Status.done) {
      setTask((prevState: Itask) => ({
        ...prevState,
        status: Status.inProcess,
      }));
      updateTask({ id, status: Status.inProcess });
    }
  }, [progress]);

  return (
    <>
      <h2 className="text-gray-300 mb-6">
        {subtasks.filter((t) => t.done).length}/{subtasks.length} subtasks done
      </h2>
      <div className="relative flex bg-gray-700 rounded-lg md:rounded-2xl w-full h-10">
        <div
          className="rounded-lg md:rounded-2xl bg-yellow-300"
          // Tailwind css doesn't support dynamic classNames
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute top-[50%] translate-y-[-50%] right-2 text-lg self-middle text-white px-5">
          {progress}%
        </span>
      </div>
    </>
  );
}
