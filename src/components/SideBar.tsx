import {
  BiTask,
  BiArchive,
  BiPlusCircle,
  BiLogOutCircle,
} from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { INewNote } from "../helpers/interfaces";
import { NotesActions } from "../redux/notesSlice";
import { Modal } from "./Modal";
import { NoteForm } from "./NoteForm";
import { useState } from "react";

export function SideBar() {
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const { showArchive, notes, categories, currentCategory } = useAppSelector(
    (state) => state.notes
  );
  const dispatch = useAppDispatch();

  const createNote = (note: INewNote) => {
    const sameNote = notes.find(
      (el) => el.name.toLowerCase() === note.name.toLowerCase()
    );

    if (sameNote) {
      return alert("Note with the same name already exists");
    }

    dispatch(NotesActions.addNote(note));
    setShowCreateNoteModal(false);
  };

  const handlePickCategory = (id: string) => {
    if (id === currentCategory) {
      return dispatch(NotesActions.pickCurrentCategory({ categoryId: null }));
    }
    dispatch(NotesActions.pickCurrentCategory({ categoryId: id }));
  };

  return (
    <>
      <div className="fixed inset-y-5 left-0 w-60 flex flex-col items-center p-5 rounded-r-xl bg-sky-400/50">
        <div className="flex items-center justify-end w-full mb-5">
          {/* create note */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full mr-2 bg-sky-300 transition-colors hover:bg-sky-500 cursor-pointer"
            onClick={() => {
              setShowCreateNoteModal(!showCreateNoteModal);
            }}
          >
            <BiPlusCircle className="w-6 h-6 fill-slate-900" />
          </div>

          {/* show archive */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 transition-colors hover:bg-sky-500 cursor-pointer ${
              showArchive ? "bg-sky-500" : "bg-sky-300"
            } `}
            onClick={() => {
              dispatch(NotesActions.toggleShowArchive());
            }}
          >
            <BiArchive className="w-6 h-6 fill-slate-900" />
          </div>

          {/* logout */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full mr-2 bg-sky-300 transition-colors hover:bg-sky-500 cursor-pointer">
            <BiLogOutCircle className="w-6 h-6 fill-slate-900" />
          </div>
        </div>

        {/* categories */}
        {categories.map((el) => (
          <div
            className={`flex items-center w-full rounded-xl mb-2 px-2 py-1 transition-colors text-xl text-slate-900 cursor-pointer hover:bg-sky-500 focus:bg-sky-500 ${
              currentCategory === el.id ? "bg-sky-500" : "bg-sky-300"
            }`}
            onClick={() => {
              handlePickCategory(el.id);
            }}
          >
            <BiTask className="w-6 h-6 mr-2 fill-slate-900" />
            <div className="text-lg">{el.name}</div>
          </div>
        ))}
      </div>

      {showCreateNoteModal ? (
        <Modal
          handleClickCloseModal={() => {
            setShowCreateNoteModal(!showCreateNoteModal);
          }}
        >
          <NoteForm handleSubmit={createNote}>
            <BiPlusCircle className="w-10 h-10 fill-white transition-transform hover:rotate-90 focus:rotate-90" />
          </NoteForm>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
