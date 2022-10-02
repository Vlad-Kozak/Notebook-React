import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { notesInitialState } from "../../redux/notesInitialState";
import { Table } from "./Table";
import "../../index.css";

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
  title: "Table",
  component: Table,
  excludeStories: /.*notesInitialState$/,
};

const Template = (args) => <Table {...args} />;

export const Notes = Template.bind({});
Notes.decorators = [
  (notes) => <Mockstore notesState={notesInitialState}>{notes()}</Mockstore>,
];
Notes.args = {
  notes: notesInitialState.notes,
  categories: notesInitialState.categories,
  type: "notes",
};

export const Categories = Template.bind({});
Categories.decorators = [
  (notes) => <Mockstore notesState={notesInitialState}>{notes()}</Mockstore>,
];
Categories.args = {
  notes: notesInitialState.notes,
  categories: notesInitialState.categories,
  type: "categories",
};
