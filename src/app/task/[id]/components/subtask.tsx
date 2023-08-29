'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import editPNG from '../../../images/edit.png';
import deletePNG from '../../../images/x.png';
import { updateCheckboxStyle } from '@/lib/utils';

import { Isubtask } from '@/redux-toolkit/features/api/tasksApiSlice';
import {
  useDeleteSubtaskMutation,
  useUpdateSubtaskMutation,
} from '@/redux-toolkit/features/api/subtasksApiSlice';

interface Props {
  task: Isubtask;
  removeTask: Function;
}

export default function Subtask({ task, removeTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.title);

  const [updateSubtask] = useUpdateSubtaskMutation();
  const [deleteSubtask] = useDeleteSubtaskMutation();

  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    updateCheckboxStyle(ref, task.done);
  }, [task.done]);

  // here tasks stands for Parent task, everywhere else - for subtask

  function handleBlur() {
    setIsEditing(!isEditing);
    updateSubtask({ id: task.id, title: currentTitle });

    if (currentTitle === '') {
      deleteSubtask(task.id);
    }
  }
  function handleKeyPress(key: string) {
    if (key === 'Escape' || key === 'Enter') {
      setIsEditing(false);
      updateSubtask({ id: task.id, title: currentTitle });
    }
  }

  function handleTaskTitleChange(target: EventTarget & HTMLTextAreaElement) {
    target.style.height = `${target.scrollHeight}px`;
    setCurrentTitle(target.value);
  }

  function handleTaskDone() {
    updateSubtask({ id: task.id, done: !task.done });
  }

  return (
    <li className="flex align-middle justify-between text-2xl">
      <div className="flex grow gap-3">
        <div className="flex">
          <input
            type="checkbox"
            id={task.id.toString()}
            checked={task.done}
            onChange={handleTaskDone}
            className="appearance-none"
          />
          <label
            ref={ref}
            htmlFor={task.id.toString()}
            className="inline-block rounded-full w-7 h-7 self-center"
          />
        </div>
        {/* TODO crossing out animation */}
        <h2 className="grow w-full self-start">
          {!isEditing ? (
            <Description isDone={task.done}>{currentTitle}</Description>
          ) : (
            <textarea
              onBlur={handleBlur}
              value={currentTitle}
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
          onClick={() => deleteSubtask(task.id)}
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
  children: string;
}

function Description({ isDone, children }: DescriptionProps) {
  return isDone ? (
    <p className="text-gray-400 line-through break-all">{children}</p>
  ) : (
    <p className="break-all">{children}</p>
  );
}
