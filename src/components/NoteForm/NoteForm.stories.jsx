import { NoteForm } from "./NoteForm";
import "../../index.css";
import { notesInitialState } from "../../redux/notesInitialState";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const Mockstore = ({ notesState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        notes: createSlice({
          name: "notes",
          initialState: notesState,
          reducers: {
            addNote(state, action) {
              state.notes.push({
                id: nanoid(),
                created: Date.now(),
                name: action.payload.name,
                categoryId: action.payload.categoryId,
                content: action.payload.content,
                archived: false,
              });
            },
            editNote(state, action) {
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
            deleteNote(state, action) {
              state.notes = state.notes.filter(
                (el) => el.id !== action.payload
              );
            },
            toggleArchiveNote(state, action) {
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
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: "NoteForm",
  component: NoteForm,
  decorators: [
    (story) => (
      <div
        style={{
          width: "fit-content",
          padding: "40px",
          backgroundColor: "rgb(0,0,0,0.5)",
          borderRadius: "10px",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*notesInitialState$/,
};

const Template = (args) => <NoteForm {...args} />;

export const CreateNote = Template.bind({});
CreateNote.decorators = [
  (notes) => <Mockstore notesState={notesInitialState}>{notes()}</Mockstore>,
];
CreateNote.args = {
  handleSubmit: () => {},
};

export const EditNote = Template.bind({});
EditNote.decorators = [
  (notes) => <Mockstore notesState={notesInitialState}>{notes()}</Mockstore>,
];
EditNote.args = {
  handleSubmit: () => {},
  currentNote: {
    id: "1",
    name: "Lora`s birthday",
    categoryId: "1",
    content: "Pick up the present for Lora",
  },
};
