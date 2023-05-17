"use client";

import Image from "next/image";
import { useState } from "react";

export default function TasksCounter({ checkmark }: { checkmark: string }) {
  const [tasksCnt, setTasksCnt] = useState(34);

  return (
    <div className="w-90 mx-5 mt-1 bg-yellow-300 rounded-[40px] flex justify-around">
      <span className="text-[180px] font-bold">{tasksCnt}</span>
      <div className="self-center flex-row">
        <Image
          className="w-9"
          src={checkmark}
          alt="checkmark"
        />
        <span className="max-w-[10px]">
          Tasks completed this month.
          <br />
          Keep it up!
        </span>
      </div>
    </div>
  );
}
