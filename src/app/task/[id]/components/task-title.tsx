import Image from 'next/image';
import importantStatic from '../../../images/important-fire-static.png';
import importantOutline from '../../../images/important-fire-outline.png';
import editPNG from '../../../images/editWhite.png';
import { useContext, useState } from 'react';
import { context } from '../page';
import {
  Itask,
  useUpdateTaskMutation,
} from '@/redux-toolkit/features/api/tasksApiSlice';

export default function TaskTitle() {
  const {
    task: { important, title, id },
    setTask,
  } = useContext(context);
  const [isImportant, setIsImportant] = useState(important);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [updateTask] = useUpdateTaskMutation();

  function handleTitleChange(target: EventTarget & HTMLTextAreaElement) {
    if (target.value.trim()) {
      setTaskTitle(target.value);
    } else {
      setTaskTitle('');
    }
    target.style.height = `${target.scrollHeight}px`;
  }

  function handleTitleSubmit(key: string) {
    if (key === 'Escape' || key === 'Enter') {
      setIsTitleEditing(false);

      updateTask({ id, title: taskTitle });
    }
  }

  function handleStopTitleEdit() {
    setIsTitleEditing(false);
    setTask((prevState: Itask) => ({ ...prevState, title: taskTitle }));
    updateTask({ id, title: taskTitle });
  }

  function handleImportant() {
    setIsImportant((prev) => !prev);
    setTask((prevState: Itask) => ({ ...prevState, important: !isImportant }));
    updateTask({ id, important: !isImportant });
  }

  return (
    <header className="flex justify-between mr-10">
      <section className="flex grow text-white text-[42px]">
        <button
          type="button"
          className="shrink-0 self-start flex"
          onClick={handleImportant}
        >
          <Image
            className="inline w-10 self-start"
            src={isImportant ? importantStatic : importantOutline}
            alt="important"
          />
        </button>

        <h1 className="grow leading-10 break-all">
          {isTitleEditing ? (
            <textarea
              rows={1}
              className="bg-black resize-none overflow-hidden w-full"
              autoFocus
              onBlur={handleStopTitleEdit}
              onFocus={({ target }) =>
                (target.style.height = `${target.scrollHeight}px`)
              }
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
