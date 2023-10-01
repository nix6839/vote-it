export interface Poll {
  id: number;
  createdAt: string;
  subject: string;
  expirationDate: string | null;
  picture: string | null;
  participatedCount: number;
  author: Author;
}

export interface Author {
  nickname: string;
}
