"use client";

import Image from "next/image";
import { Isubtask } from "@/lib/initialTasks";
import { useState } from "react";
import editPNG from "../../../images/edit.png";

interface Props {
  task: Isubtask;
  onCheck: Function;
  removeTask: Function;
}
export default function Subtask({ task, onCheck, removeTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    task.description
  );

  function handleBlur() {
    setIsEditing(!isEditing);

    if (currentDescription === "") {
      removeTask(task.id);
    }
  }

  return (
    <li
      className="flex align-middle justify-between text-2xl"
      key={task.id}
    >
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onCheck(task.id)}
          className="appearance-none bg-gray-200 checked:bg-yellow-300 w-8 h-8 rounded-full "
        />
        {/* TODO crossing out animation */}
        {!isEditing ? (
          <Description
            isDone={task.done}
            description={currentDescription}
          />
        ) : (
          <input
            type="text"
            // TODO blur on Enter/Esc key press
            onBlur={handleBlur}
            value={currentDescription}
            onChange={({ target }) => setCurrentDescription(target.value)}
            className="bg-gray-300 rounded-lg px-1 focus:border-yellow-300"
            autoFocus
          />
        )}
      </div>

      <button
        className="text-2xl"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Image
          src={editPNG.src}
          alt="edit"
          width={30}
          height={30}
        />
      </button>
    </li>
  );
}

interface DescriptionProps {
  isDone: boolean;
  description: string;
}

function Description({ isDone, description }: DescriptionProps) {
  return isDone ? (
    <p className="text-gray-400 line-through">{description}</p>
  ) : (
    <p>{description}</p>
  );
}
