import { FormEvent, useState, ChangeEvent } from "react";
import { useAppSelector } from "../helpers/hooks";
import { INewNote } from "../helpers/interfaces";

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
    <form className="w-[400px] text-2xl" onSubmit={handleSubmitForm}>
      <label className="flex flex-col mb-5">
        <span className="mb-5 text-white">Name</span>
        <input
          className="p-2 rounded-lg"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="off"
        />
      </label>

      <div className="flex flex-col mb-5 text-white">
        <span className="mb-5 text-white">Category</span>
        {categories.map((el) => {
          if (el.id === categoryId) {
            return (
              <label className="flex" key={el.id}>
                <input
                  className="mr-2 accent-sky-300"
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
              <label className="flex" key={el.id}>
                <input
                  className="mr-2 accent-sky-300"
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

      <label className="flex flex-col mb-5">
        <span className="mb-5 text-white">Content</span>
        <textarea
          className="h-40 p-2 rounded-lg resize-none"
          name="content"
          onChange={onChange}
          value={content}
        ></textarea>
      </label>

      {isEmptyField ? (
        <div className="text-center text-red-600 text-2xl">
          Fill all fields, please
        </div>
      ) : (
        ""
      )}
      {isMoreThanMaxLength ? (
        <div className="text-center text-red-600 text-2xl">
          The maximum number of characters for the name is 50. The maximum
          number of characters for the content is 1000.
        </div>
      ) : (
        ""
      )}

      <button className="block ml-auto cursor-pointer" type="submit">
        {children}
      </button>
    </form>
  );
}
