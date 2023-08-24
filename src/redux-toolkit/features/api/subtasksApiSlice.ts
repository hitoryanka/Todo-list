import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { Isubtask } from './tasksApiSlice';

export const SubtasksApiSlice = createApi({
  reducerPath: 'subtasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['subtasks'],
  endpoints: (builder) => ({
    // BUG I pass response type into generic but it's still unknown in
    // "transformResponse"
    getSubtasks: builder.query<Isubtask[], void>({
      query: () => '/subtasks',
      transformResponse: (res: Isubtask[]) => res.sort((a, b) => a.id - b.id),
      providesTags: ['subtasks'],
    }),
    addSubtask: builder.mutation({
      query: (title: string) => ({
        url: '/subtasks',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['subtasks'],
    }),
    deleteSubtask: builder.mutation({
      query: (id: number) => ({
        url: '/subtasks',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['subtasks'],
    }),
    updateSubtask: builder.mutation({
      query: (task: Partial<Isubtask>) => ({
        url: '/subtasks',
        method: 'PATCH',
        body: { task },
      }),
    }),
  }),
});
// BUG where are hooks?
console.log(SubtasksApiSlice);
