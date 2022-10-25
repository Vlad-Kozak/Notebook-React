import { INote } from "../helpers/interfaces";
import { useAppSelector } from "../helpers/hooks";

interface INoteProps {
  note: INote;
  onClick: Function;
}

export function Note({ note, onClick }: INoteProps) {
  const { categories } = useAppSelector((state) => state.notes);
  const category = categories.find((el) => el.id === note.categoryId);

  return (
    <div
      className="relative w-60 h-44 p-2 rounded-xl text-slate-900 bg-sky-300/70 cursor-pointer"
      key={note.id}
      onClick={() => {
        onClick(note);
      }}
    >
      <div className="flex items-center mb-2">
        {/* category icon */}
        <div className="mr-2">{category && <category.imageUrl />}</div>
        {/* title */}
        <div className="text-lg font-bold tracking-wide">
          {note.name.length > 15 ? note.name.slice(0, 15) + "..." : note.name}
        </div>
      </div>
      {/* content */}
      <div className="mb-2 text-base break-words">
        {note.content.length > 110
          ? note.content.slice(0, 110) + "..."
          : note.content}
      </div>
      {/* date */}
      <div className="absolute bottom-2 right-2 text-xs text-right">
        {new Date(note.created).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
