import { useState } from "react";
import { NoteForm } from "./NoteForm";
import { Modal } from "./Modal";
import { INote, IUpdatedNote } from "../helpers/interfaces";
import { useAppSelector } from "../helpers/hooks";
import { BiEdit, BiCheckCircle, BiTrash, BiArchiveIn } from "react-icons/bi";
import { Note } from "./Note";
import {
  useEditNoteMutation,
  useGetNotesQuery,
  useRemoveNoteMutation,
  useToggleNoteArchivingMutation,
} from "../redux/notesApi";
import { toast } from "react-toastify";

const emptyNote = {
  id: "",
  name: "",
  categoryId: "",
  content: "",
  archived: false,
  createdAt: "",
  updatedAt: "",
};

export function Notes() {
  const [editNote] = useEditNoteMutation();
  const [archiveNote] = useToggleNoteArchivingMutation();
  const [removeNote] = useRemoveNoteMutation();
  const { data = [] } = useGetNotesQuery();
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState<INote>(emptyNote);
  const { showArchive, currentCategory } = useAppSelector(
    (state) => state.root.notes
  );

  const handleOpenNote = (note: INote) => {
    setCurrentNote(note);
    setShowNoteModal(!showNoteModal);
  };

  const handleShowEditNoteModal = (note: INote) => {
    setCurrentNote(note);
    setShowNoteModal(!showNoteModal);
    setShowEditNoteModal(!showEditNoteModal);
  };

  const handleSubmitEditForm = (note: IUpdatedNote) => {
    const sameNote = data.find(
      (el) => note.name && el.name.toLowerCase() === note.name.toLowerCase()
    );

    if (sameNote && note.name !== currentNote.name) {
      return toast.error("Note with the same name already exists");
    }

    editNote(note);

    setShowEditNoteModal(!showEditNoteModal);
  };

  const handleArchiveNote = () => {
    archiveNote({ id: currentNote.id, archived: !currentNote.archived });
    setShowNoteModal(!showNoteModal);
  };

  const handleRemoveNote = () => {
    removeNote(currentNote.id);
    setShowNoteModal(!showNoteModal);
  };

  if (data.length === 0) {
    return (
      <div className="w-fit mx-auto text-center text-3xl text-white mt-10 bg-sky-400/50 rounded-xl p-5">
        You don't have any notes
        <span className="block mt-5 text-base">
          You can add a note using the button on the sidebar
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {[...data]
          .filter((el) => el.archived === showArchive)
          .filter((el) =>
            currentCategory ? el.categoryId === currentCategory : el
          )
          .map((note) => {
            return <Note key={note.id} note={note} onClick={handleOpenNote} />;
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
                  handleShowEditNoteModal(currentNote);
                }}
              >
                <BiEdit className="w-6 h-6 fill-sky-900 cursor-pointer" />
              </div>
              <div
                className="flex items-center justify-center w-8 h-8 ml-2 transition-colors bg-sky-300 hover:bg-sky-500 focus:bg-sky-500 rounded-full"
                onClick={handleArchiveNote}
              >
                <BiArchiveIn className="w-6 h-6 fill-sky-900 cursor-pointer" />
              </div>
              <div
                className="flex items-center justify-center w-8 h-8 ml-2 transition-colors bg-sky-300 hover:bg-sky-500 focus:bg-sky-500 rounded-full"
                onClick={handleRemoveNote}
              >
                <BiTrash className="w-6 h-6 fill-sky-900 cursor-pointer" />
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
