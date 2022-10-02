import { MouseEventHandler } from "react";
import { ReactComponent as ShowIcon } from "../../images/show.svg";
import { ReactComponent as EditIcon } from "../../images/edit.svg";
import { ReactComponent as ArchiveIcon } from "../../images/archive.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete.svg";
import { ReactComponent as CloseIcon } from "../../images/close.svg";

interface IconButtonProps {
  handleClick: MouseEventHandler;
  type: "show" | "edit" | "archive" | "delete" | "close";
}

export function IconButton({ handleClick, type }: IconButtonProps) {
  return (
    <button
      className="w-[30] h-[30] bg-transparent cursor-pointer transition-transform hover:scale-110 focus:scale-110"
      onClick={handleClick}
    >
      {type === "show" && <ShowIcon width="30" height="30" />}
      {type === "edit" && <EditIcon width="30" height="30" />}
      {type === "archive" && <ArchiveIcon width="30" height="30" />}
      {type === "delete" && <DeleteIcon width="30" height="30" />}
      {type === "close" && <CloseIcon width="30" height="30" />}
    </button>
  );
}
