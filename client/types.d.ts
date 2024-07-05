type TUser = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  avatar: string;
};

type TComment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  parentId: number;
  author: TUser;
  children: TComment[];
};
