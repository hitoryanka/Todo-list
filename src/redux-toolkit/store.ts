'use client';

import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import { Itask } from '@/lib/initialTasks';

export interface IState {
  tasks: Itask[];
}

export const store = configureStore({
  reducer: { tasks: taskReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
