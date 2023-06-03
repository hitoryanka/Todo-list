"use client";

import importantStatic from "../images/important-fire-static.png";
import importantAnimated from "../images/important-fire-animated.gif";
import detailsSVG from "../images/go-into-task.svg";
import detailsSVGDark from "../images/go-into-task-dark.svg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  date: string;
  description: string;
  important: boolean;
  subtasks: { id: number; description: string }[];
}

export default function Task({
  id,
  title,
  date,
  description,
  important,
  subtasks,
}: Props) {
  const [fireUrl, setFireUrl] = useState(importantStatic);
  const [detailsUrl, setDetailsUrl] = useState(detailsSVG);

  function onHover() {
    setFireUrl(importantAnimated);
    setDetailsUrl(detailsSVGDark);
  }
  function onHoverOff() {
    setFireUrl(importantStatic);
    setDetailsUrl(detailsSVG);
  }
  return (
    <Link href={`/task/${id}`}>
      <article
        onMouseOver={onHover}
        onMouseLeave={onHoverOff}
        className=" h-20 my-1 bg-gray-100 rounded-[25px] flex justify-between place-items-center
                hover:bg-black hover:text-white hover:fill-white"
      >
        <div className="px-5">
          <Title
            title={title}
            important={important}
            imageUrl={fireUrl}
          />
          {subtasks.length !== 0 && (
            <span className="text-lg text-gray-400">
              {subtasks.length} subtasks
            </span>
          )}
        </div>
        <div className="flex flex-col place-items-center pr-4">
          {/* TODO how to change svg color?? */}
          <img
            className=""
            src={detailsUrl.src}
            alt="see task"
            width={20}
          />
          <span>{date}</span>
        </div>
      </article>
    </Link>
  );
}

function Title({
  important,
  title,
  imageUrl,
}: {
  important: boolean;
  title: string;
  imageUrl: StaticImageData;
}) {
  return (
    <div className="flex space-x-2">
      {important && (
        <Image
          className=""
          src={imageUrl.src}
          alt="important"
          width={40}
          height={40}
        />
      )}
      <h3 className="text-2xl self-center">{title}</h3>
    </div>
  );
}
