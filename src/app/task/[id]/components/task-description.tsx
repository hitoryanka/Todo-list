import { useContext, useState } from 'react';
import { TaskContext } from '../page';
import editPNG from '../../../images/editGrey.png';
import Image from 'next/image';
import { calculateRows } from '@/lib/utils';

export default function Description() {
  const { description } = useContext(TaskContext);
  const [taskDescription, setTaskDescription] = useState(description);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  function handleDescriptionChange(target: EventTarget & HTMLTextAreaElement) {
    setTaskDescription(target.value);
    calculateRows(target);
  }
  return (
    <section>
      <h2 className="text-white text-3xl mt-5">Description</h2>
      <div className="flex justify-between align-middle mt-5">
        {isDescriptionEditing ? (
          <textarea
            className="bg-black text-gray-400 text-xl resize-none overflow-hidden w-full"
            value={taskDescription}
            onChange={({ target }) => handleDescriptionChange(target)}
            onBlur={() => setIsDescriptionEditing(false)}
            onFocus={({ target }) => calculateRows(target)}
            autoFocus
          />
        ) : (
          <p className="text-gray-400 text-xl ">
            {taskDescription || 'provide description to a task'}
          </p>
        )}
        <button
          className="text-white mx-[50px] shrink-0 self-start"
          onClick={() => setIsDescriptionEditing((prevState) => !prevState)}
        >
          <Image
            src={editPNG}
            alt="edit"
            width={28}
          />
        </button>
      </div>
    </section>
  );
}
