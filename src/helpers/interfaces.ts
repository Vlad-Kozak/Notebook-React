export interface INote {
  id: string;
  name: string;
  categoryId: string;
  content: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISmallNote {
  id: string;
  name: string;
  categoryId: string;
  content: string;
}

export interface INewNote {
  name: string;
  categoryId: string;
  content: string;
}

export interface IUpdatedNote {
  id: string;
  name?: string;
  categoryId?: string;
  content?: string;
  archived?: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  photoURL: string;
}
