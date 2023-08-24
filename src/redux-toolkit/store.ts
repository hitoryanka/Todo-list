'use client';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import { Itask } from '@/lib/initialTasks';
import { TasksApiSlice } from './features/api/tasksApiSlice';

export interface IState {
  tasks: Itask[];
  // TODO it's any - type for now
  [TasksApiSlice.reducerPath]: any;
}

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    [TasksApiSlice.reducerPath]: TasksApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TasksApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
