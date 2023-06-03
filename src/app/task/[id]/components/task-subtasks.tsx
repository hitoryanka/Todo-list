"use client";

import { Isubtask } from "@/lib/initialTasks";
import { useState } from "react";
import AddSubtask from "./add-subtask";
import Subtask from "./subtask";

interface Props {
  subtasks: Isubtask[];
}

export default function TaskSubtasks({ subtasks }: Props) {
  const [tasks, setTasks] = useState(subtasks);

  function handleChecked(id: number) {
    const alteredTask = tasks.find(t => t.id === id);
    if (!alteredTask) throw new Error("subtask does not exist");

    setTasks(
      tasks.map(t => {
        if (t.id !== id) {
          return t;
        }
        return { ...t, done: !t.done };
      })
    );
  }

  function addTask() {
    setTasks([
      ...tasks,
      { id: tasks.length, done: false, description: "create title" },
    ]);
  }

  function removeTask(id: number) {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
  }

  return (
    <section className="flex flex-col mx-2 bg-white rounded-3xl mt-40">
      <nav className="flex justify-between">
        <h2 className="text-3xl mx-3">All subtasks</h2>
        <p>filter image</p>
      </nav>
      <ul className="flex flex-col gap-3 mt-5 px-5">
        {tasks.map(t => (
          <Subtask
            task={t}
            onCheck={handleChecked}
            removeTask={removeTask}
          />
        ))}
      </ul>
      <AddSubtask onAdd={addTask} />
    </section>
  );
}
