'use client';

import Image from 'next/image';
import checkmark from '../images/checkmark.svg';
import { Itask } from '@/redux-toolkit/features/api/tasksApiSlice';

export default function TasksCounter({ tasks }: { tasks: Itask[] }) {
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
