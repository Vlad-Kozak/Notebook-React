export interface INote {
  id: string;
  name: string;
  created: number;
  categoryId: string;
  content: string;
  archived: boolean;
}

export interface INewNote {
  id: string;
  name: string;
  categoryId: string;
  content: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}
