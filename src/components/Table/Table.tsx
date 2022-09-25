import { useState } from "react";
import s from "./Table.module.css";
import { NoteForm } from "../NoteForm/NoteForm";
import { Modal } from "../Modal/Modal";
import { IconButton } from "../IconButton/IconButton";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as ArchiveIcon } from "../../images/archive.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { ReactComponent as ConfirmIcon } from "../../images/confirm.svg";
import { ReactComponent as EyeIcon } from "../../images/eye.svg";
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
      <table className={s.table}>
        <tr className={s.titles}>
          <th className={s.titleIcon}></th>
          <th className={s.titleNoteCategory}>Note Category</th>
          <th className={s.titleActive}>Active</th>
          <th className={s.titleArchived}>Archived</th>
        </tr>
        {categories.map((el) => {
          if (!count[el.id]) {
            count[el.id] = { countActive: 0, countArchived: 0 };
          }
          return (
            <tr className={s.line} key={el.id}>
              <td className={s.icon}>
                <div className={s.iconWrap}>{<el.imageUrl />}</div>
              </td>
              <td className={s.noteCategory}>{el.name}</td>
              <td className={s.active}>{count[el.id].countActive}</td>
              <td className={s.archived}>{count[el.id].countArchived}</td>
            </tr>
          );
        })}
      </table>
    );
  }

  return (
    <>
      <table className={s.table}>
        <tr className={s.titles}>
          <th className={s.titleIcon}></th>
          <th className={s.titleName}>Name</th>
          <th className={s.titleCreated}>Created</th>
          <th className={s.titleCategory}>Category</th>
          <th className={s.titleContent}>Content</th>
          <th className={s.titleDates}>Dates</th>
          <th className={s.titleButtons}></th>
        </tr>
        {notes.map((note) => {
          const category = categories.find((el) => el.id === note.categoryId);
          const dates = getDatesFromText(note.content);
          return (
            <tr className={s.line} key={note.id}>
              <td className={s.icon}>
                <div className={s.iconWrap}>
                  {category && <category.imageUrl />}
                </div>
              </td>
              <td className={s.name}>
                {note.name.length > 20
                  ? note.name.slice(0, 20) + "..."
                  : note.name}
              </td>
              <td className={s.created}>
                {new Date(note.created).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })}
              </td>
              <td className={s.category}>{category && category.name}</td>
              <td className={s.content}>
                {note.content.length > 30
                  ? note.content.slice(0, 30) + "..."
                  : note.content}
              </td>
              <td className={s.dates}>
                {dates.length > 18 ? dates.slice(0, 18) + "..." : dates}
              </td>
              <td className={s.buttons}>
                <div className={s.buttonsWrap}>
                  <div className={s.buttonWrap}>
                    <IconButton
                      handleClick={() => {
                        handleShowClick({
                          id: note.id,
                          name: note.name,
                          categoryId: note.categoryId,
                          content: note.content,
                        });
                      }}
                    >
                      <EyeIcon width="30" height="30" />
                    </IconButton>
                  </div>
                  <div className={s.buttonWrap}>
                    <IconButton
                      handleClick={() => {
                        handleEditClick({
                          id: note.id,
                          name: note.name,
                          categoryId: note.categoryId,
                          content: note.content,
                        });
                      }}
                    >
                      <EditIcon width="30" height="30" />
                    </IconButton>
                  </div>
                  <div className={s.buttonWrap}>
                    <IconButton
                      handleClick={() => {
                        handleArchiveClick(note.id);
                      }}
                    >
                      <ArchiveIcon width="30" height="30" />
                    </IconButton>
                  </div>
                  <div className={s.buttonWrap}>
                    <IconButton
                      handleClick={() => {
                        handleDeleteClick(note.id);
                      }}
                    >
                      <DeleteIcon width="30" height="30" />
                    </IconButton>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {showModalShowNote ? (
        <Modal handleClickCloseModal={handleToggleShowModal}>
          <div className={s.showModal}>
            <div className={s.showModalName}>{currentNote.name}</div>
            <div className={s.showModalContent}>{currentNote.content}</div>
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
          >
            <ConfirmIcon width="50" height="50" />
          </NoteForm>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
