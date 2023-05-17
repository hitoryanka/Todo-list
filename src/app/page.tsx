import profilePic from "../app/images/me.jpg";
import notifyBell from "../app/images/bell.svg";
import checkmark from "../app/images/checkmark.svg";

import Header from "./components/header";
import TasksCounter from "./components/tasks-counter";
import Tasks from "./components/tasks";

export default function Home() {
  return (
    <>
      <Header
        profilePic={profilePic}
        notifyBell={notifyBell}
      />
      <TasksCounter checkmark={checkmark} />
      <Tasks />
    </>
  );
}
