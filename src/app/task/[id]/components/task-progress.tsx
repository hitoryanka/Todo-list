import { Isubtask, calculateProgress } from "@/lib/initialTasks";

interface Props {
  subtasks: Isubtask[];
}

export default function TaskProgress({ subtasks }: Props) {
  const progress = calculateProgress(subtasks);
  return (
    <>
      <h2 className="text-gray-300 mb-6">
        {subtasks.filter(t => t.done).length}/{subtasks.length} subtasks done
      </h2>
      <div className="relative flex bg-gray-700 rounded-2xl w-full h-10">
        <div
          className="rounded-2xl bg-yellow-300"
          // Tailwind css doesn't support dynamic classNames
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute top-[50%] translate-y-[-50%] right-2 text-lg self-middle text-white px-5">
          {progress}%
        </span>
      </div>
    </>
  );
}
