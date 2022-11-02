import { createSlice } from "@reduxjs/toolkit";

interface INotesInitialState {
  showArchive: boolean;
  currentCategory: null | string;
}

export const notesInitialState: INotesInitialState = {
  showArchive: false,
  currentCategory: null,
};

const notes = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
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
