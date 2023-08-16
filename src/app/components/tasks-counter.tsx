'use client';

import { Status } from '@/lib/initialTasks';
import { IState } from '@/redux-toolkit/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function TasksCounter({ checkmark }: { checkmark: string }) {
  const tasks = useSelector((state: IState) =>
    [...state.tasks].filter((t) => t.status === Status.done)
  );

  return (
    <div className="w-90 mx-5 mt-1 bg-yellow-300 rounded-[40px] flex justify-around">
      <span className="text-[180px] font-bold">{tasks.length}</span>
      <div className="self-center flex-row">
        <Image
          className="w-9"
          src={checkmark}
          alt="checkmark"
        />
        <span className="max-w-[10px]">
          Tasks completed this month.
          <br />
          {tasks.length ? 'Keep it up!' : "Let'make the first step!"}
        </span>
      </div>
    </div>
  );
}
