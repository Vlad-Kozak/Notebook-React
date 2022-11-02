import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INewNote, INote, IUpdatedNote } from "../helpers/interfaces";
import { RootState } from "./store";

type NotesResponse = INote[];

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["notes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notebook-api-zaklaxd.herokuapp.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root.auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotes: builder.query<NotesResponse, void>({
      query: () => "notes",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "notes" as const, id })),
              { type: "notes", id: "LIST" },
            ]
          : [{ type: "notes", id: "LIST" }],
    }),
    createNote: builder.mutation<INote, INewNote>({
      query: (body) => ({
        url: "notes",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "notes", id: "LIST" }],
    }),
    editNote: builder.mutation<INote, IUpdatedNote>({
      query: (body) => ({
        url: `notes/${body.id}`,
        method: "PATCH",
        body: {
          name: body.name,
          categoryId: body.categoryId,
          content: body.content,
        },
      }),
      invalidatesTags: [{ type: "notes", id: "LIST" }],
    }),
    removeNote: builder.mutation<INote, string>({
      query: (id) => ({
        url: `notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "notes", id: "LIST" }],
    }),
    toggleNoteArchiving: builder.mutation<INote, IUpdatedNote>({
      query: (body) => ({
        url: `notes/${body.id}`,
        method: "PATCH",
        body: {
          archived: body.archived,
        },
      }),
      invalidatesTags: [{ type: "notes", id: "LIST" }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useRemoveNoteMutation,
  useToggleNoteArchivingMutation,
} = notesApi;
