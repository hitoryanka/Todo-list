'use client';

import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Isubtask } from '@/lib/initialTasks';
import editPNG from '../../../images/edit.png';
import deletePNG from '../../../images/x.png';
import { useDispatch } from 'react-redux';
import {
  removeSubtask,
  upadteSubtaskTitle,
  updateSubtaskStatus,
} from '@/redux-toolkit/features/tasks/taskSlice';
import { updateCheckboxStyle } from '@/lib/utils';
import { TaskContext } from '../page';

interface Props {
  task: Isubtask;
  removeTask: Function;
}

export default function Subtask({ task, removeTask }: Props) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    task.description
  );
  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    updateCheckboxStyle(ref, task.done);
  });

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
    target.style.height = `${target.scrollHeight}px`;
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
    dispatch(
      updateSubtaskStatus({
        id: parentTaskId,
        subtaskId: task.id,
        done: !task.done,
      })
    );
  }

  return (
    <li className="flex align-middle justify-between text-2xl">
      <div className="flex grow gap-3">
        <div className="flex">
          <input
            type="checkbox"
            id={task.id}
            checked={task.done}
            onChange={handleTaskDone}
            className="appearance-none"
          />
          <label
            ref={ref}
            htmlFor={task.id}
            className="inline-block rounded-full w-7 h-7 self-center"
          />
        </div>
        {/* TODO crossing out animation */}
        <h2 className="grow w-full self-start">
          {!isEditing ? (
            <Description
              isDone={task.done}
              description={currentDescription}
            />
          ) : (
            <textarea
              onBlur={handleBlur}
              value={currentDescription}
              onChange={({ target }) => handleTaskTitleChange(target)}
              onKeyDown={(event) => handleKeyPress(event.key)}
              className=" rounded-lg px-1 focus:border-yellow-300 resize-none overflow-hidden w-full"
              onFocus={({ target }) =>
                (target.style.height = `${target.scrollHeight}px`)
              }
              autoFocus
            />
          )}
        </h2>
      </div>

      <div className="flex gap-3 self-start ml-5 shrink-0 text-2xl">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Image
            src={editPNG.src}
            alt="edit"
            width={30}
            height={30}
          />
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(removeSubtask({ id: parentTaskId, subtaskId: task.id }))
          }
        >
          <Image
            src={deletePNG}
            alt="delete"
            width={24}
          />
        </button>
      </div>
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
