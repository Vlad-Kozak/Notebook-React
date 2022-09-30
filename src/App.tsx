import { useState } from "react";
import "./App.css";
import { TextButton } from "./components/TextButton/TextButton";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { Modal } from "./components/Modal/Modal";
import { Table } from "./components/Table/Table";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";
import { ReactComponent as AddIcon } from "./images/add.svg";
import { INewNote } from "./helpers/interfaces";
import { addNote } from "./redux/notesRedux";

function App() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const categories = useAppSelector((state) => state.notes.categories);
  const [showModalCreateNote, setShowModalCreateNote] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const handleToggleModal = () => {
    showModalCreateNote
      ? setShowModalCreateNote(false)
      : setShowModalCreateNote(true);
  };

  const handleToggleShowArchive = () => {
    showArchive ? setShowArchive(false) : setShowArchive(true);
  };

  const handleCreateNote = (note: INewNote) => {
    const sameNote = notes.find(
      (el) => el.name.toLowerCase() === note.name.toLowerCase()
    );

    if (sameNote) {
      return alert("Note with the same name already exists");
    }

    dispatch(addNote(note));
    setShowModalCreateNote(false);
  };

  return (
    <>
      <Table
        notes={notes.filter((el) => !el.archived)}
        categories={categories}
        type="notes"
      />
      <div className="createButton">
        <TextButton handleClick={handleToggleModal}>Create Note</TextButton>
      </div>
      <div className="showArchiveButton">
        <TextButton handleClick={handleToggleShowArchive}>
          {showArchive ? "Hide Archive" : "Show Archive"}
        </TextButton>
      </div>

      {showArchive ? (
        <Table
          notes={notes.filter((el) => el.archived)}
          categories={categories}
          type="notes"
        />
      ) : (
        <></>
      )}

      <Table notes={notes} categories={categories} type="categories" />

      {showModalCreateNote ? (
        <Modal handleClickCloseModal={handleToggleModal}>
          <NoteForm handleSubmit={handleCreateNote}>
            <AddIcon width="50" height="50" />
          </NoteForm>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
