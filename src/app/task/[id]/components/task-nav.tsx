import Link from "next/link";

export default function TaskNav() {
  return (
    <nav className="flex justify-between mb-5">
      <Link
        href="/"
        className="text-white text-3xl cursor-pointer"
      >
        {"<"}
      </Link>
      <div className="px-3 py-2 text-lg rounded-2xl border-2 border-yellow-300 text-yellow-300">
        {/* supposed to be based of status */}
        in process
      </div>
    </nav>
  );
}
