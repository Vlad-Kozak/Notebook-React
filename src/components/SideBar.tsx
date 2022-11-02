import { BiArchive, BiPlusCircle, BiLogOutCircle } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { INewNote } from "../helpers/interfaces";
import { NotesActions } from "../redux/notesSlice";
import { Modal } from "./Modal";
import { NoteForm } from "./NoteForm";
import { useState } from "react";
import { authOperations } from "../redux/auth/authOperations";
import { useGetCategoriesQuery } from "../redux/categoriesApi";
import { useCreateNoteMutation } from "../redux/notesApi";
import { ThreeCircles } from "react-loader-spinner";
import {
  currentNotesCategory,
  isLoadingLogout,
  showArchive,
} from "../redux/reduxSelectors";

export function SideBar() {
  const [addNote] = useCreateNoteMutation();
  const { data = [], refetch } = useGetCategoriesQuery();
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const isShowArchive = useAppSelector(showArchive);
  const currentCategory = useAppSelector(currentNotesCategory);
  const loadingLogout = useAppSelector(isLoadingLogout);
  const dispatch = useAppDispatch();

  const createNote = (note: INewNote) => {
    addNote(note);
    setShowCreateNoteModal(false);
  };

  const handlePickCategory = (id: string) => {
    if (id === currentCategory) {
      return dispatch(NotesActions.pickCurrentCategory({ categoryId: null }));
    }
    dispatch(NotesActions.pickCurrentCategory({ categoryId: id }));
  };

  const logout = async () => {
    await dispatch(authOperations.logout());
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
              isShowArchive ? "bg-sky-500" : "bg-sky-300"
            } `}
            onClick={() => {
              dispatch(NotesActions.toggleShowArchive());
            }}
          >
            <BiArchive className="w-6 h-6 fill-slate-900" />
          </div>

          {/* logout */}
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full mr-2 bg-sky-300 transition-colors hover:bg-sky-500 cursor-pointer"
            onClick={logout}
          >
            {loadingLogout ? (
              <ThreeCircles
                height="20"
                width="20"
                color="black"
                ariaLabel="three-circles-rotating"
              />
            ) : (
              <BiLogOutCircle className="w-6 h-6 fill-slate-900" />
            )}
          </div>
        </div>

        {/* categories */}
        {[...data].map((el) => (
          <div
            key={el._id}
            className={`flex items-center w-full rounded-xl mb-2 px-2 py-1 transition-colors text-xl text-slate-900 cursor-pointer hover:bg-sky-500 focus:bg-sky-500 ${
              currentCategory === el._id ? "bg-sky-500" : "bg-sky-300"
            }`}
            onClick={() => {
              handlePickCategory(el._id);
            }}
          >
            <img
              className="w-6 h-6 mr-2 fill-slate-900"
              src={el.photoURL}
              alt="category-icon"
            />
            <div className="text-lg">{el.name}</div>
          </div>
        ))}
        <p
          className="w-full rounded-xl mt-5 px-2 py-1 text-base text-center transition-colors text-slate-900 cursor-pointer bg-sky-300 hover:bg-sky-500 focus:bg-sky-500"
          onClick={() => {
            dispatch(NotesActions.pickCurrentCategory({ categoryId: null }));
          }}
        >
          Reset filter
        </p>
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
