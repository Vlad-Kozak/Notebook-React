import { useState } from "react";
import { NoteForm } from "./NoteForm";
import { Modal } from "./Modal";
import { INewNote } from "../helpers/interfaces";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { NotesActions } from "../redux/notesSlice";
import { BiEdit, BiCheckCircle } from "react-icons/bi";
import { Note } from "./Note";

export function Notes() {
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    name: "",
    categoryId: "",
    content: "",
  });
  const dispatch = useAppDispatch();
  const { notes, showArchive, currentCategory } = useAppSelector(
    (state) => state.notes
  );

  const handleOpenNote = ({ id, name, categoryId, content }: INewNote) => {
    id && setCurrentNote({ id, name, categoryId, content });
    setShowNoteModal(!showNoteModal);
  };
  const handleShowEditNoteModal = ({
    id,
    name,
    categoryId,
    content,
  }: INewNote) => {
    id && setCurrentNote({ id, name, categoryId, content });
    setShowEditNoteModal(!showEditNoteModal);
  };

  const handleSubmitEditForm = (note: INewNote) => {
    const sameNote = notes.find(
      (el) => el.name.toLowerCase() === note.name.toLowerCase()
    );

    if (sameNote && note.name !== currentNote.name) {
      return alert("Note with the same name already exists");
    }

    dispatch(NotesActions.editNote(note));
    setShowEditNoteModal(!showEditNoteModal);
  };

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {notes
          .filter((el) => el.archived === showArchive)
          .filter((el) =>
            currentCategory ? el.categoryId === currentCategory : el
          )
          .map((note) => {
            return <Note note={note} onClick={handleOpenNote} />;
          })}
      </div>

      {showNoteModal ? (
        <Modal
          handleClickCloseModal={() => {
            setShowNoteModal(!showNoteModal);
          }}
        >
          <div className="w-[400px] text-2xl text-white">
            <div className="flex items-center mb-5">
              <div className="font-bold break-words">{currentNote.name}</div>
              <div
                className="flex items-center justify-center w-8 h-8 ml-4 transition-colors bg-sky-300 hover:bg-sky-500 focus:bg-sky-500 rounded-full"
                onClick={() => {
                  handleShowEditNoteModal({
                    id: currentNote.id,
                    name: currentNote.name,
                    categoryId: currentNote.categoryId,
                    content: currentNote.content,
                  });
                }}
              >
                <BiEdit className="w-6 h-6 fill-sky-900" />
              </div>
            </div>
            <div className="break-words text-xl">{currentNote.content}</div>
          </div>
        </Modal>
      ) : (
        <></>
      )}

      {showEditNoteModal ? (
        <Modal
          handleClickCloseModal={() => {
            setShowEditNoteModal(!showEditNoteModal);
          }}
        >
          <NoteForm
            handleSubmit={handleSubmitEditForm}
            currentNote={currentNote}
          >
            <BiCheckCircle className="w-10 h-10 fill-white transition-colors hover:animate-wiggle" />
          </NoteForm>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
