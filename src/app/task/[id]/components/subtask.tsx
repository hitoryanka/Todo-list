'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { Isubtask } from '@/lib/initialTasks';
import { useState } from 'react';
import editPNG from '../../../images/edit.png';
import { useDispatch } from 'react-redux';
import {
  upadteSubtaskTitle,
  updateSubtaskStatus,
} from '@/redux-toolkit/features/tasks/taskSlice';
import { calculateRows } from '@/lib/utils';
import { TaskContext } from '../page';

// TODO refactor to use context
interface Props {
  task: Isubtask;
  removeTask: Function;
}
// BUG when task is created - it renders as a copy of task at the bottom
export default function Subtask({ task, removeTask }: Props) {
  console.log(task.description === 'first subtask');
  const dispatch = useDispatch();

  const [isDone, setIsDone] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    task.description
  );

  const { id: parentTaskId } = useContext(TaskContext);

  function handleBlur() {
    setIsEditing(!isEditing);

    if (currentDescription === '') {
      removeTask(task.id);
    }
  }
  // BUG put this function into utils folder
  function handleKeyPress(key: string) {
    if (key === 'Escape' || key === 'Enter') {
      setIsEditing(false);
    }
  }

  function handleTaskTitleChange(target: EventTarget & HTMLTextAreaElement) {
    calculateRows(target);
    setCurrentDescription(target.value);
    dispatch(
      upadteSubtaskTitle({
        id: parentTaskId,
        subtaskId: task.id,
        title: currentDescription,
      })
    );
  }

  function handleTaskDone() {
    setIsDone((prev) => !prev);
    dispatch(
      updateSubtaskStatus({
        id: parentTaskId,
        subtaskId: task.id,
        done: !isDone,
      })
    );
  }

  return (
    <li className="flex align-middle justify-between text-2xl">
      <div className="flex grow gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleTaskDone}
          className="appearance-none bg-gray-200 checked:bg-yellow-300 checked:bg-[url('/app/images/checked.png')] checked:bg-repeat w-8 h-8 rounded-full"
        />
        {/* TODO crossing out animation */}
        <h2 className="grow w-full">
          {!isEditing ? (
            <Description
              isDone={isDone}
              description={currentDescription}
            />
          ) : (
            <textarea
              onBlur={handleBlur}
              value={currentDescription}
              onChange={({ target }) => handleTaskTitleChange(target)}
              onKeyDown={(event) => handleKeyPress(event.key)}
              className=" rounded-lg px-1 focus:border-yellow-300 resize-none overflow-hidden w-full"
              onFocus={({ target }) => calculateRows(target)}
              autoFocus
            />
          )}
        </h2>
      </div>

      <button
        className="text-2xl shrink-0 self-start"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Image
          src={editPNG.src}
          alt="edit"
          width={30}
          height={30}
        />
      </button>
    </li>
  );
}

interface DescriptionProps {
  isDone: boolean;
  description: string;
}

function Description({ isDone, description }: DescriptionProps) {
  return isDone ? (
    <p className="text-gray-400 line-through break-words">{description}</p>
  ) : (
    <p>{description}</p>
  );
}
