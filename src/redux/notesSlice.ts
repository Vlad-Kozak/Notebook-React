import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { INewNote } from "../helpers/interfaces";
import { notesInitialState } from "./notesInitialState";

const notes = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    addNote(state, action: PayloadAction<INewNote>) {
      state.notes.push({
        id: nanoid(),
        created: Date.now(),
        name: action.payload.name,
        categoryId: action.payload.categoryId,
        content: action.payload.content,
        archived: false,
      });
    },
    editNote(state, action: PayloadAction<INewNote>) {
      state.notes = state.notes.map((el) => {
        if (el.id !== action.payload.id) {
          return el;
        }
        return {
          id: el.id,
          name: action.payload.name,
          created: el.created,
          categoryId: action.payload.categoryId,
          content: action.payload.content,
          archived: el.archived,
        };
      });
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((el) => el.id !== action.payload);
    },
    toggleArchiveNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.map((el) => {
        if (el.id !== action.payload) {
          return el;
        }
        return {
          id: el.id,
          name: el.name,
          created: el.created,
          categoryId: el.categoryId,
          content: el.content,
          archived: !el.archived,
        };
      });
    },
    toggleShowArchive(state) {
      state.showArchive = !state.showArchive;
    },
    pickCurrentCategory(state, action) {
      state.currentCategory = action.payload.categoryId;
    },
  },
});

export const NotesActions = notes.actions;
export const NotesReducer = notes.reducer;
