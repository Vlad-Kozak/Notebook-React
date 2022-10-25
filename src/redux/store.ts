import { configureStore } from "@reduxjs/toolkit";
import { NotesReducer } from "./notesSlice";

export const store = configureStore({
  reducer: {
    notes: NotesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
