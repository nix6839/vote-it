interface PollOption {
  id: number;
  content: string;
  votedCount: number;
  isVoted: boolean;
}

export interface Poll {
  id: number;
  createdAt: string;
  subject: string;
  isMultiple: boolean;
  expirationDate: string | null;
  picture: string | null;
  participatedCount: number;
  author: Author;
  options: PollOption[];
  isVoted: boolean;
}

export interface Author {
  id: number;
  email: string;
  nickname: string;
  picture: string | null;
}
