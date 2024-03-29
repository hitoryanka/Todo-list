import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Isubtask } from './tasksApiSlice';

export const SubtasksApiSlice = createApi({
  reducerPath: 'subtasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['subtasks'],
  endpoints: (builder) => ({
    // BUG I pass response type into generic but it's still unknown in
    // "transformResponse"

    // get subtasks for a SPECIFIC Task
    getSubtasks: builder.query<Isubtask[], number>({
      query: (id: number) => `/subtasks/${id}`,
      transformResponse: (res: Isubtask[]) => res.sort((a, b) => a.id - b.id),
      providesTags: ['subtasks'],
    }),
    addSubtask: builder.mutation({
      query: (id: number) => ({
        url: `/subtasks/${id}`,
        method: 'POST',
        body: { title: 'Create Title' },
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
      query: (subtask: Partial<Isubtask>) => ({
        url: '/subtasks',
        method: 'PATCH',
        body: subtask,
      }),
      invalidatesTags: ['subtasks'],
    }),
  }),
});

export const {
  useGetSubtasksQuery,
  useDeleteSubtaskMutation,
  useAddSubtaskMutation,
  useUpdateSubtaskMutation,
} = SubtasksApiSlice;
