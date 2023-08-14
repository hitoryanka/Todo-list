import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  updateImportantTask,
  updateTaskTitle,
} from '@/redux-toolkit/features/tasks/taskSlice';
import importantStatic from '../../../images/important-fire-static.png';
import importantOutline from '../../../images/important-fire-outline.png';
import editPNG from '../../../images/editWhite.png';
import { useContext, useState } from 'react';
import { TaskContext } from '../page';
import { calculateRows } from '@/lib/utils';

export default function TaskTitle() {
  const { important, title, id } = useContext(TaskContext);
  const dispatch = useDispatch();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);

  function handleTitleChange(target: EventTarget & HTMLTextAreaElement) {
    setTaskTitle(target.value);
    calculateRows(target);
  }

  function handleTitleSubmit(key: string) {
    if (key === 'Escape' || key === 'Enter') {
      dispatch(updateTaskTitle({ id, title: taskTitle }));
    }
  }

  return (
    <header className="flex justify-between mr-10">
      <section className="flex grow text-white text-[42px]">
        <button
          type="button"
          className="shrink-0 self-start flex"
          onClick={() =>
            dispatch(updateImportantTask({ id, important: !important }))
          }
        >
          <Image
            className="inline w-10 self-start"
            src={important ? importantStatic : importantOutline}
            alt="important"
          />
        </button>

        <h1 className="grow leading-10 break-all">
          {isTitleEditing ? (
            <textarea
              className="bg-black resize-none overflow-hidden w-full"
              autoFocus
              onFocus={({ target }) => calculateRows(target)}
              onBlur={() => setIsTitleEditing(false)}
              value={taskTitle}
              onChange={({ target }) => handleTitleChange(target)}
              onKeyDown={({ key }) => handleTitleSubmit(key)}
            />
          ) : (
            <header className="break-words">{taskTitle}</header>
          )}
        </h1>
      </section>
      <button
        type="button"
        className="text-white ml-5 shrink-0 self-start"
        onClick={() => setIsTitleEditing((prevState) => !prevState)}
      >
        <Image
          src={editPNG}
          alt="edit"
          width={32}
        />
      </button>
    </header>
  );
}
