import request from './request.ts';

import type {
  InfiniteData,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Poll } from './types.ts';

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
