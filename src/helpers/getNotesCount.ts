import { INote } from "./interfaces";

interface ICategoryCount {
  countActive: number;
  countArchived: number;
}

interface ICategoriesCount {
  [index: string]: ICategoryCount;
}

export function getNotesCount(notes: INote[]) {
  let count: ICategoriesCount = {};

  notes.forEach((el) => {
    if (count[el.categoryId]) {
      el.archived
        ? (count[el.categoryId].countArchived += 1)
        : (count[el.categoryId].countActive += 1);
    }
    if (!count[el.categoryId]) {
      el.archived
        ? (count[el.categoryId] = { countArchived: 1, countActive: 0 })
        : (count[el.categoryId] = { countArchived: 0, countActive: 1 });
    }
  });

  return count;
}
