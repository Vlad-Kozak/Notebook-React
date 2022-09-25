import { FormEvent, useState, ChangeEvent } from "react";
import { useAppSelector } from "../../helpers/hooks";
import { INewNote } from "../../helpers/interfaces";
import s from "./NoteForm.module.css";

interface INoteFormProps {
  handleSubmit: Function;
  currentNote?: INewNote;
  children: JSX.Element;
}

export function NoteForm({
  handleSubmit,
  currentNote,
  children,
}: INoteFormProps) {
  const categories = useAppSelector((state) => state.notes.categories);
  const [name, setName] = useState(currentNote?.name ? currentNote.name : "");
  const [categoryId, setCategoryId] = useState(
    currentNote?.categoryId ? currentNote.categoryId : ""
  );
  const [content, setContent] = useState(
    currentNote?.content ? currentNote.content : ""
  );
  const [isEmptyField, setIsEmptyField] = useState(false);
  const [isMoreThanMaxLength, setIsMoreThanMaxLength] = useState(false);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !categoryId || !content.trim()) {
      return setIsEmptyField(true);
    }

    if (name.trim().length > 50 || content.trim().length > 1000) {
      return setIsMoreThanMaxLength(true);
    }

    handleSubmit({
      id: currentNote?.id,
      name: name.trim(),
      categoryId,
      content: content.trim(),
    });
    setIsEmptyField(false);
  };

  const onChange = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;

      case "category":
        setCategoryId(e.currentTarget.value);
        break;

      case "content":
        setContent(e.currentTarget.value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmitForm}>
      <label className={s.label}>
        <span className={s.title}>Name</span>
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="off"
        />
      </label>

      <div className={s.categories}>
        <span className={s.title}>Category</span>
        {categories.map((el) => {
          if (el.id === categoryId) {
            return (
              <label className={s.categoryLabel} key={el.id}>
                <input
                  className={s.categoryInput}
                  name="category"
                  type="radio"
                  value={el.id}
                  onChange={onChange}
                  checked
                />
                {el.name}
              </label>
            );
          } else {
            return (
              <label className={s.categoryLabel} key={el.id}>
                <input
                  className={s.categoryInput}
                  name="category"
                  type="radio"
                  value={el.id}
                  onChange={onChange}
                />
                {el.name}
              </label>
            );
          }
        })}
      </div>

      <label className={s.label}>
        <span className={s.title}>Content</span>
        <textarea
          className={s.textarea}
          name="content"
          onChange={onChange}
          value={content}
        ></textarea>
      </label>

      {isEmptyField ? (
        <div className={s.error}>Fill all fields, please</div>
      ) : (
        ""
      )}
      {isMoreThanMaxLength ? (
        <div className={s.error}>
          The maximum number of characters for the name is 50. The maximum
          number of characters for the content is 1000.
        </div>
      ) : (
        ""
      )}

      <button className={s.submit} type="submit">
        {children}
      </button>
    </form>
  );
}
