import request from './request.ts';

import type {
  InfiniteData,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface Author {
  nickname: string;
}

export interface Poll {
  id: number;
  createdAt: string;
  subject: string;
  expirationDate: string | null;
  picture: string | null;
  participatedCount: number;
  author: Author;
}

interface GetPollsResponse {
  polls: Poll[];
  nextCursor?: number;
}

interface GetPollsErrorResponse {
  message: string;
}

export const getPollsInfinite: UseSuspenseInfiniteQueryOptions<
  GetPollsResponse,
  AxiosError<GetPollsErrorResponse>,
  InfiniteData<GetPollsResponse, number>
> = {
  queryKey: ['/polls'],
  initialPageParam: undefined,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  async queryFn({ pageParam }) {
    const res = await request.get('/polls', {
      params: {
        limit: 12,
        cursor: pageParam,
      },
    });
    return res.data;
  },
};
