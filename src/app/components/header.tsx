import Image, { StaticImageData } from "next/image";

export default function Header({
  profilePic,
  notifyBell,
}: {
  profilePic: StaticImageData;
  notifyBell: string;
}) {
  return (
    <header className="w-90 mx-5 bg-white rounded-[40px]  px-8 py-5 flex justify-between">
      <div className="flex space-x-3">
        <Image
          className="rounded-full w-[60px]"
          src={profilePic}
          alt="profile pic"
        ></Image>
        <h1 className="text-2xl font-bold self-center">Tamirlan Gabaraev</h1>
      </div>
      <Image
        src={notifyBell}
        alt="notification"
      ></Image>
    </header>
  );
}
