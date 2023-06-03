import { Isubtask } from "@/lib/initialTasks";
import TaskNav from "./task-nav";
import TaskProgress from "./task-progress";
import TaskTitle from "./task-title";

interface Props {
  important: boolean;
  title: string;
  description: string;
  subtasks: Isubtask[];
}

export default function Task({
  important,
  title,
  description,
  subtasks,
}: Props) {
  return (
    <section className="mt-5 mx-3 px-5">
      <TaskNav />
      <main>
        <TaskTitle
          important={important}
          title={title}
        />
        {subtasks.length ? <TaskProgress subtasks={subtasks} /> : ""}
        <h2 className="text-white text-3xl mt-[35px]">Description</h2>
        {description ? (
          <p className="text-gray-400 text-xl mt-[20px]">{description}</p>
        ) : (
          "provide description to a task"
        )}
      </main>
    </section>
  );
}
