'use client';

import importantStatic from '../images/important-fire-static.png';
import importantAnimated from '../images/important-fire-animated.gif';
import detailsSVG from '../images/go-into-task.svg';
import detailsSVGDark from '../images/go-into-task-dark.svg';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import deleteTaskPNG from '../images/x.png';
import deleteTaskWhitePNG from '../images/x-white.png';

import {
  Itask,
  Status,
  useDeleteTaskMutation,
} from '@/redux-toolkit/features/api/tasksApiSlice';
import { useGetSubtasksQuery } from '@/redux-toolkit/features/api/subtasksApiSlice';

interface Props {
  task: Itask;
}

export default function Task({ task }: Props) {
  const [fireUrl, setFireUrl] = useState(importantStatic);
  const [detailsUrl, setDetailsUrl] = useState(detailsSVG);
  const [deleteUrl, setDeleteUrl] = useState(deleteTaskPNG);

  if (!task) {
    throw new Error("task doesn't exist");
  }
  const { title, date, important, id } = task;
  const [deleteTask] = useDeleteTaskMutation();
  const { data: subtasks, isSuccess } = useGetSubtasksQuery(task.id);

  function onHover() {
    setFireUrl(importantAnimated);
    setDetailsUrl(detailsSVGDark);
    setDeleteUrl(deleteTaskWhitePNG);
  }
  function onHoverOff() {
    setFireUrl(importantStatic);
    setDetailsUrl(detailsSVG);
    setDeleteUrl(deleteTaskPNG);
  }
  return (
    <article
      onMouseOver={onHover}
      onMouseLeave={onHoverOff}
      className={`h-20 my-1 pr-5 ${
        task.status === Status.done ? 'bg-gray-50 text-gray-400' : 'bg-gray-100'
      } rounded-xl md:rounded-[25px] flex justify-between place-items-center
          hover:bg-black hover:text-white hover:fill-white`}
    >
      <Link
        href={{
          pathname: `/task/${task.id}`,
          query: { task: JSON.stringify(task) },
        }}
        className="grow"
      >
        <div
          className="flex justify-between place-items-center
        "
        >
          <div className="px-5">
            <Title
              important={important}
              imageUrl={fireUrl}
              isDone={task.status === Status.done}
            >
              {title}
            </Title>
            {isSuccess && subtasks.length !== 0 && (
              <span className="md:text-lg text-gray-400">
                {subtasks.length} {`subtask${subtasks.length !== 1 ? 's' : ''}`}
              </span>
            )}
          </div>

          <button
            type="button"
            className="flex flex-col place-items-center pr-4"
          >
            {/* TODO how to change svg color?? */}
            <Image
              className="md:w-[25px] md:h-[25px]"
              src={detailsUrl.src}
              alt="see task"
              width={15}
              height={15}
            />
            <span className="text-sm md:text-base">
              {new Date(date).toLocaleDateString()}
            </span>
          </button>
        </div>
      </Link>
      <button
        className="shrink-0"
        type="button"
        onClick={() => deleteTask(id)}
      >
        <Image
          className="w-[17px] md:w-[22px]"
          src={deleteUrl}
          alt="delete"
          width={22}
        />
      </button>
    </article>
  );
}

function Title({
  important,
  children,
  imageUrl,
  isDone,
}: {
  important: boolean;
  children: string;
  imageUrl: StaticImageData;
  isDone: boolean;
}) {
  return (
    <div className="flex space-x-2 max-w-[200px] md:max-w-[385px]">
      {important && (
        <Image
          className="self-start w-[30px] md:w-[40px]"
          src={imageUrl.src}
          alt="important"
          width={40}
          height={40}
        />
      )}
      <h3
        className={`text-xl md:text-2xl self-center truncate  ${
          isDone && 'line-through'
        }`}
      >
        {/* TODO make a function that will check for punctuation symbols at the end */}
        {children}
      </h3>
    </div>
  );
}
