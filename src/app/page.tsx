'use client';

import profilePic from '../app/images/me.jpg';
import notifyBell from '../app/images/bell.svg';
import checkmark from '../app/images/checkmark.svg';
import { Provider } from 'react-redux';

import Header from './components/header';
import TasksCounter from './components/tasks-counter';
import Tasks from './components/tasks';
import { store } from '@/redux-toolkit/store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { TasksApiSlice } from '@/redux-toolkit/features/api/tasksApiSlice';

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="sm:max-w-2xl grow">
        <ApiProvider api={TasksApiSlice}>
          <Provider store={store}>
            <Header
              profilePic={profilePic}
              notifyBell={notifyBell}
            />
            <TasksCounter checkmark={checkmark} />
            <Tasks />
          </Provider>
        </ApiProvider>
      </div>
    </main>
  );
}
