'use client';

import profilePic from '../app/images/me.jpg';
import notifyBell from '../app/images/bell.svg';
import checkmark from '../app/images/checkmark.svg';
import { Provider } from 'react-redux';

import Header from './components/header';
import TasksCounter from './components/tasks-counter';
import Tasks from './components/tasks';
import { store } from '@/redux-toolkit/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Header
        profilePic={profilePic}
        notifyBell={notifyBell}
      />
      <TasksCounter checkmark={checkmark} />
      <Tasks />
    </Provider>
  );
}
