import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  upadteSubtaskTitle,
  updateTaskTitle,
} from '@/redux-toolkit/features/tasks/taskSlice';
import importantStatic from '../../../images/important-fire-static.png';
import editPNG from '../../../images/editWhite.png';
import { useContext, useState } from 'react';
import { TaskContext } from '../page';

export default function TaskTitle() {
  // TODO make important sign a button and add inactive state as 'fire-outline'
  const { important, title, id } = useContext(TaskContext);
  const dispatch = useDispatch();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);

  function handleTitleSubmit(key: string) {
    if (key === 'Escape' || key === 'Enter') {
      dispatch(updateTaskTitle({ id, title: taskTitle }));
      setIsTitleEditing(false);
    }
  }

  return (
    <section className="flex justify-between mr-10">
      <h1 className="text-white text-[42px]">
        {important && (
          <Image
            className="inline w-10"
            src={importantStatic}
            alt="important"
          />
        )}
        {isTitleEditing ? (
          <input
            className="bg-black"
            autoFocus
            onBlur={() => setIsTitleEditing(false)}
            value={taskTitle}
            onChange={({ target }) => setTaskTitle(target.value)}
            onKeyDown={({ key }) => handleTitleSubmit(key)}
          />
        ) : (
          taskTitle
        )}
      </h1>
      <button
        className="text-white"
        onClick={() => setIsTitleEditing((prevState) => !prevState)}
      >
        <Image
          src={editPNG}
          alt="edit"
          width={45}
        />
      </button>
    </section>
  );
}
