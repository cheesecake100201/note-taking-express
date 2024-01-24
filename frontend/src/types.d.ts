export type NoteData = {
  id: number;
  userId: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  currentVersion: number;
};

export type NoteInsertData = {
  title: string;
  content: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};

export type NoteVersion = {
  id: number;
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
