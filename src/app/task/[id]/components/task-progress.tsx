import { Status, calculateProgress } from '@/lib/initialTasks';
import { updateTaskStatus } from '@/redux-toolkit/features/tasks/taskSlice';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { TaskContext } from '../page';

export default function TaskProgress() {
  const dispatch = useDispatch();
  const { id, subtasks, status } = useContext(TaskContext);
  const progress = calculateProgress(subtasks);

  if (status !== Status.done && progress === '100') {
    dispatch(updateTaskStatus({ id, status: Status.done }));
  } else if (status !== Status.inProcess && progress !== '100') {
    dispatch(updateTaskStatus({ id, status: Status.inProcess }));
  }
  return (
    <>
      <h2 className="text-gray-300 mb-6">
        {subtasks.filter((t) => t.done).length}/{subtasks.length} subtasks done
      </h2>
      <div className="relative flex bg-gray-700 rounded-2xl w-full h-10">
        <div
          className="rounded-2xl bg-yellow-300"
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
