import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO create types file and transfer this stuff there
export enum Status {
  inProcess = 'In Process',
  done = 'Done',
  archived = 'Archived',
}

export interface Itask {
  id: number;
  title: string;
  date: string;
  description: string;
  important: boolean;
  status: Status;
}

export interface Isubtask {
  id: number;
  title: string;
  done: boolean;
  parentId: number;
}
// ---------------------------------------------------------------

export const TasksApiSlice = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['tasks'],
  endpoints: (builder) => ({
    // BUG I pass response type into generic but it's still unknown in
    // "transformResponse"
    getTasks: builder.query<Itask[], void>({
      query: () => '/tasks',
      transformResponse: (res: Itask[]) => res.sort((a, b) => a.id - b.id),
      providesTags: ['tasks'],
    }),
    getSingleTask: builder.query<Itask, number>({
      query: (id: number) => `/tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: (title: string) => ({
        url: '/tasks',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['tasks'],
    }),
    deleteTask: builder.mutation({
      query: (id: number) => ({
        url: '/tasks',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['tasks'],
    }),
    updateTask: builder.mutation({
      query: (task: Partial<Itask>) => ({
        url: '/tasks',
        method: 'PATCH',
        body: { task },
      }),
      invalidatesTags: ['tasks'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetSingleTaskQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = TasksApiSlice;
