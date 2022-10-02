import { useState } from "react";
import { TextButton } from "./components/TextButton/TextButton";
import { Container } from "./components/Container/Container";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { Modal } from "./components/Modal/Modal";
import { Table } from "./components/Table/Table";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";
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
      <Container>
        <Table
          notes={notes.filter((el) => !el.archived)}
          categories={categories}
          type="notes"
        />
        <div className="w-fit ml-auto mb-2">
          <TextButton handleClick={handleToggleModal}>Create Note</TextButton>
        </div>
        <div className="w-fit ml-auto">
          <TextButton handleClick={handleToggleShowArchive}>
            {showArchive ? "Hide Archive" : "Show Archive"}
          </TextButton>
        </div>
      </Container>

      {showArchive ? (
        <Container>
          <Table
            notes={notes.filter((el) => el.archived)}
            categories={categories}
            type="notes"
          />
        </Container>
      ) : (
        <></>
      )}

      <Container>
        <Table notes={notes} categories={categories} type="categories" />
      </Container>

      {showModalCreateNote ? (
        <Modal handleClickCloseModal={handleToggleModal}>
          <NoteForm handleSubmit={handleCreateNote} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
