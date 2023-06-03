import Image from "next/image";
import importantStatic from "../../../images/important-fire-static.png";

interface Props {
  important: boolean;
  title: string;
}

export default function TaskTitle({ important, title }: Props) {
  return (
    <h1 className="text-white text-[42px]">
      {important && (
        <Image
          className="inline w-10"
          src={importantStatic}
          alt="important"
        />
      )}
      {title}
    </h1>
  );
}
