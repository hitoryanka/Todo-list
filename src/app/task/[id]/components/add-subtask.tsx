'use client';

interface Props {
  onAdd: Function;
}

export default function AddSubtask({ onAdd }: Props) {
  return (
    <button
      onClick={() => onAdd()}
      className="flex justify-center self-center h-10 w-10 bg-yellow-300 rounded-full m-2 text-3xl"
    >
      +
    </button>
  );
}
