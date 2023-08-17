import { useContext, useState } from 'react';
import { TaskContext } from '../page';
import editPNG from '../../../images/editGrey.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateTaskDescription } from '@/redux-toolkit/features/tasks/taskSlice';

export default function Description() {
  const { description, id } = useContext(TaskContext);
  const [taskDescription, setTaskDescription] = useState(description);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const dispatch = useDispatch();

  // BUG title and description are not updating

  function handleDescriptionChange(target: EventTarget & HTMLTextAreaElement) {
    if (target.value.trim()) {
      setTaskDescription(target.value);
    } else {
      setTaskDescription('');
    }
    target.style.height = `${target.scrollHeight}px`;
  }

  function handleBlur() {
    setIsDescriptionEditing(false);
    dispatch(updateTaskDescription({ id, description: taskDescription }));
  }

  return (
    <section>
      <h2 className="text-white text-3xl mt-5">Description</h2>
      <div className="flex justify-between align-middle mt-5">
        {isDescriptionEditing ? (
          <textarea
            className="bg-black text-gray-400 text-xl resize-none overflow-hidden w-full"
            value={taskDescription}
            rows={1}
            onChange={({ target }) => handleDescriptionChange(target)}
            onBlur={handleBlur}
            onFocus={({ target }) =>
              (target.style.height = `${target.scrollHeight}px`)
            }
            autoFocus
          />
        ) : (
          <p className="text-gray-400 text-xl break-words">
            {taskDescription || 'provide description to a task'}
          </p>
        )}
        <button
          className="text-white mx-[44px] shrink-0 self-start"
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
