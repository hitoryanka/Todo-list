"use client";

import importantSVG from "../images/importantTask.svg";
import importantSVGLight from "../images/fire-light.svg";
import goIntoSVG from "../images/go-into-task.svg";
import Image from "next/image";
import { useState } from "react";

interface Props {
  title: string;
  date: string;
  description: string;
  important: boolean;
  subtasksCnt: number;
}

export default function Task({
  title,
  date,
  description,
  important,
  subtasksCnt,
}: Props) {
  const [SVGUrl, setSVGUrl] = useState(importantSVG);

  function onHover() {
    setSVGUrl(importantSVGLight);
  }
  function onHoverOff() {
    setSVGUrl(importantSVG);
  }
  return (
    <article
      onMouseOver={onHover}
      onMouseLeave={onHoverOff}
      className=" h-20 my-1 bg-gray-100 rounded-[25px] flex justify-between place-items-center
                hover:bg-black"
    >
      <div className="px-5">
        <Title
          title={title}
          important={important}
          SVGUrl={SVGUrl}
        />
        {subtasksCnt !== 0 && <span>{subtasksCnt} subtasks</span>}
      </div>
      <div className="flex flex-col place-items-center pr-4">
        <Image
          className=""
          src={goIntoSVG}
          alt="see task"
          width={20}
        />
        <span>{date}</span>
      </div>
    </article>
  );
}

function Title({
  important,
  title,
  SVGUrl,
}: {
  important: boolean;
  title: string;
  SVGUrl: string;
}) {
  return (
    <div className="flex space-x-2">
      {important && (
        <Image
          src={SVGUrl}
          alt="important"
        />
      )}
      <h3 className="text-xl">{title}</h3>
    </div>
  );
}
