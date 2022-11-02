import { FormEvent, useState, ChangeEvent } from "react";
import { ISmallNote } from "../helpers/interfaces";
import { useGetCategoriesQuery } from "../redux/categoriesApi";

interface INoteFormProps {
  handleSubmit: Function;
  currentNote?: ISmallNote;
  children: JSX.Element;
}

export function NoteForm({
  handleSubmit,
  currentNote,
  children,
}: INoteFormProps) {
  const { data = [] } = useGetCategoriesQuery();
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
        {[...data].map((el) => {
          return (
            <label className="flex" key={el._id}>
              <input
                className="mr-2 accent-sky-300"
                name="category"
                type="radio"
                value={el._id}
                onChange={onChange}
                checked={el._id === categoryId}
              />
              {el.name}
            </label>
          );
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

      {isEmptyField && (
        <div className="text-center text-white text-xl">
          Fill all fields, please
        </div>
      )}
      {isMoreThanMaxLength && (
        <div className="text-center text-white text-lg">
          The maximum number of letters for the name is 50. The maximum number
          of letters for the content is 1000.
        </div>
      )}

      <button className="block ml-auto cursor-pointer" type="submit">
        {children}
      </button>
    </form>
  );
}
