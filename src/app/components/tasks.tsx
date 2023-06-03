"use client";

import { useState } from "react";
import CreateTask from "./createTask";

import filterSVG from "../images/filter.svg";
import Image from "next/image";
import Task from "./task";
import { initialTasks } from "@/lib/initialTasks";

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <main className="w-90 mx-5 mt-1">
      <CreateTask />
      <div className="flex-row bg-white rounded-[40px]  px-8 py-5">
        <header className="flex justify-between">
          <h2 className="font-bold text-2xl">Priority Tasks</h2>
          <Image
            src={filterSVG}
            alt="filters"
            width="20"
          />
        </header>
        <main>
          {tasks.map(task => (
            <Task
              key={task.id}
              {...task}
            ></Task>
          ))}
        </main>
      </div>
    </main>
  );
}
// TODO subtasks must be objects instead of cnt
