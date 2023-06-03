import { initialTasks } from "@/lib/initialTasks";
import TaskSubtasks from "./components/task-subtasks";
import Task from "./components/task";

export default function Page({ params }: { params: { id: string } }) {
  const task = initialTasks.find(task => task.id === +params.id);

  if (!task) {
    return <h1 className="text-white">no such task</h1>;
  }
  return (
    <article className="flex-1 flex-col h-full">
      <Task
        important={task.important}
        description={task.description}
        title={task.title}
        subtasks={task.subtasks}
      />
      <TaskSubtasks subtasks={task.subtasks} />
    </article>
  );
}
