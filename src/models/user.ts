export type User = {
  avatarUrl: string | null;
  dateCreated: number;
  email: string;
  following: string[];
  folowers: string[];
  fullName: string;
  userId: string;
  username: string;
  [key: string]: any;
};
