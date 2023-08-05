import { useContext, useState } from 'react';
import { TaskContext } from '../page';
import editPNG from '../../../images/editGrey.png';
import Image from 'next/image';

export default function Description() {
  const { description } = useContext(TaskContext);
  const [taskDescription, setTaskDescription] = useState(description);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  return (
    <section>
      <h2 className="text-white text-3xl ">Description</h2>
      <div className="flex justify-between">
        <p className="text-gray-400 text-xl mt-[20px]">
          {taskDescription || 'provide description to a task'}
        </p>
        <button
          className="text-white"
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
