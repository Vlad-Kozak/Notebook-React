import { useState } from "react";
import { NoteForm } from "../NoteForm/NoteForm";
import { Modal } from "../Modal/Modal";
import { IconButton } from "../IconButton/IconButton";
import { ReactComponent as ConfirmIcon } from "../../images/confirm.svg";
import { ICategory, INewNote, INote } from "../../helpers/interfaces";
import { getDatesFromText } from "../../helpers/getDatesFromText";
import { getNotesCount } from "../../helpers/getNotesCount";
import { useAppDispatch } from "../../helpers/hooks";
import {
  deleteNote,
  editNote,
  toggleArchiveNote,
} from "../../redux/notesRedux";

interface ITableProps {
  notes: Array<INote>;
  categories: Array<ICategory>;
  type: "notes" | "categories";
}

export function Table({ notes, categories, type }: ITableProps) {
  const dispatch = useAppDispatch();
  const [showModalEditNote, setShowModalEditNote] = useState(false);
  const [showModalShowNote, setShowModalShowNote] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    name: "",
    categoryId: "",
    content: "",
  });
  const handleShowClick = ({ id, name, categoryId, content }: INewNote) => {
    id && setCurrentNote({ id, name, categoryId, content });
    handleToggleShowModal();
  };
  const handleEditClick = ({ id, name, categoryId, content }: INewNote) => {
    id && setCurrentNote({ id, name, categoryId, content });
    handleToggleEditModal();
  };
  const handleArchiveClick = (id: string) => {
    dispatch(toggleArchiveNote(id));
  };
  const handleDeleteClick = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleToggleShowModal = () => {
    showModalShowNote
      ? setShowModalShowNote(false)
      : setShowModalShowNote(true);
  };

  const handleToggleEditModal = () => {
    showModalEditNote
      ? setShowModalEditNote(false)
      : setShowModalEditNote(true);
  };

  const handleSubmitEditForm = (note: INewNote) => {
    const sameNote = notes.find(
      (el) => el.name.toLowerCase() === note.name.toLowerCase()
    );

    if (sameNote && note.name !== currentNote.name) {
      return alert("Note with the same name already exists");
    }

    dispatch(editNote(note));
    handleToggleEditModal();
  };

  if (type === "categories") {
    const count = getNotesCount(notes);
    return (
      <table>
        <tr>
          <th></th>
          <th>Note Category</th>
          <th>Active</th>
          <th>Archived</th>
        </tr>
        {categories.map((el) => {
          if (!count[el.id]) {
            count[el.id] = { countActive: 0, countArchived: 0 };
          }
          return (
            <tr key={el.id}>
              <td>
                <div className="flex items-center justify-center w-10 h-10 mx-auto bg-slate-500 rounded-full">
                  {<el.imageUrl />}
                </div>
              </td>
              <td>{el.name}</td>
              <td>{count[el.id].countActive}</td>
              <td>{count[el.id].countArchived}</td>
            </tr>
          );
        })}
      </table>
    );
  }

  return (
    <>
      <table>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Created</th>
          <th>Category</th>
          <th>Content</th>
          <th>Dates</th>
          <th></th>
        </tr>
        {notes.map((note) => {
          const category = categories.find((el) => el.id === note.categoryId);
          const dates = getDatesFromText(note.content);
          return (
            <tr key={note.id}>
              <td>
                <div className="flex items-center justify-center w-10 h-10 mx-auto bg-slate-500 rounded-full">
                  {category && <category.imageUrl />}
                </div>
              </td>
              <td className="font-medium">
                {note.name.length > 20
                  ? note.name.slice(0, 20) + "..."
                  : note.name}
              </td>
              <td>
                {new Date(note.created).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })}
              </td>
              <td>{category && category.name}</td>
              <td>
                {note.content.length > 30
                  ? note.content.slice(0, 30) + "..."
                  : note.content}
              </td>
              <td>{dates.length > 18 ? dates.slice(0, 18) + "..." : dates}</td>
              <td>
                <div className="flex justify-center">
                  <div className="mr-1">
                    <IconButton
                      handleClick={() => {
                        handleShowClick({
                          id: note.id,
                          name: note.name,
                          categoryId: note.categoryId,
                          content: note.content,
                        });
                      }}
                      type="show"
                    />
                  </div>
                  <div className="mr-1">
                    <IconButton
                      handleClick={() => {
                        handleEditClick({
                          id: note.id,
                          name: note.name,
                          categoryId: note.categoryId,
                          content: note.content,
                        });
                      }}
                      type="edit"
                    />
                  </div>
                  <div className="mr-1">
                    <IconButton
                      handleClick={() => {
                        handleArchiveClick(note.id);
                      }}
                      type="archive"
                    />
                  </div>
                  <div>
                    <IconButton
                      handleClick={() => {
                        handleDeleteClick(note.id);
                      }}
                      type="delete"
                    />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {showModalShowNote ? (
        <Modal handleClickCloseModal={handleToggleShowModal}>
          <div className="w-[400px] text-2xl text-white">
            <div className="mb-5 font-bold break-words">{currentNote.name}</div>
            <div className="break-words text-xl">{currentNote.content}</div>
          </div>
        </Modal>
      ) : (
        <></>
      )}

      {showModalEditNote ? (
        <Modal handleClickCloseModal={handleToggleEditModal}>
          <NoteForm
            handleSubmit={handleSubmitEditForm}
            currentNote={currentNote}
          />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
