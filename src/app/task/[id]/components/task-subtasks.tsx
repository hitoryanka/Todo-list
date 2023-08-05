'use client';

import { Isubtask } from '@/lib/initialTasks';
import AddSubtask from './add-subtask';
import Subtask from './subtask';
import { useDispatch } from 'react-redux';
import {
  addSubtask,
  addTask,
  deleteTask,
} from '@/redux-toolkit/features/tasks/taskSlice';

interface Props {
  subtasks: Isubtask[];
  taskId: string;
}

export default function TaskSubtasks({ subtasks: tasks, taskId }: Props) {
  const dispatch = useDispatch();
  function handleChecked(id: string) {
    const alteredTask = tasks.find((t) => t.id === id);
    if (!alteredTask) throw new Error('subtask does not exist');
  }

  return (
    <section className="flex flex-col mx-2 bg-white rounded-3xl mt-40">
      <nav className="flex justify-between">
        <h2 className="text-3xl mx-3">All subtasks</h2>
        <p>filter image</p>
      </nav>
      <ul className="flex flex-col gap-3 mt-5 px-5">
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
