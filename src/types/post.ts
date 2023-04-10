export type comment = {
  comment: string;
  username: string;
};

export type Post = {
  avatarUrl: string;
  comments?: comment[];
  caption?: string;
  username: string;
  dateCreated: number;
  likes: string[];
  postId: string;
  userId: string;
  [key: string]: any;
};
