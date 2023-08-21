'use client';

import { addTask } from '@/redux-toolkit/features/tasks/taskSlice';
import addTaskPNG from '../images/addTask.png';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  function handleDescriptionChange(target: EventTarget & HTMLTextAreaElement) {
    if (target.value.trim()) {
      setTitle(target.value);
    } else {
      setTitle('');
    }
    target.style.height = `${target.scrollHeight}px`;
  }

  function handleTitleSubmit() {
    setTitle('');
    dispatch(addTask({ title }));
  }

  return (
    <div className="flex justify-between bg-blue-500 rounded-[40px] text-2xl  px-8 py-5 mb-1">
      <textarea
        rows={1}
        value={title}
        onChange={({ target }) => handleDescriptionChange(target)}
        onBlur={({ target }) => (target.style.height = '48px')}
        onFocus={({ target }) =>
          (target.style.height = `${target.scrollHeight}px`)
        }
        className="resize-none overflow-hidden w-full rounded-3xl p-2"
        placeholder="Start typing..."
      ></textarea>
      <button
        className="ml-5"
        onClick={handleTitleSubmit}
      >
        <Image
          src={addTaskPNG}
          alt="add task"
          width={38}
        />
      </button>
    </div>
  );
}
