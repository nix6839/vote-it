import request from './request.ts';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface GetMeResponse {
  id: number;
  email: string;
  nickname: string;
}

interface GetMeErrorResponse {
  message: string;
}

export const getMe: UseQueryOptions<
  GetMeResponse,
  AxiosError<GetMeErrorResponse>
> = {
  queryKey: ['/users/me'],
  async queryFn() {
    const res = await request.get('/users/me', { withCredentials: true });
    return res.data;
  },
  retry(failureCount, error) {
    // Should don't retry, if not logged in error
    if (error.response?.status === 401) {
      return false;
    }
    return failureCount < 3;
  },
};
