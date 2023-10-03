import { isAxiosError } from 'axios';
import request from './request.ts';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface GetMeResponse {
  isLoggedIn: true;
  id: number;
  email: string;
  nickname: string;
}

interface GetMeErrorResponse {
  message: string;
}

interface GetMeNotLoggedInErrorResponse extends GetMeErrorResponse {
  isLoggedIn: false;
}

type GetMeQueryResponse = GetMeResponse | GetMeNotLoggedInErrorResponse;

export const getMe: UseQueryOptions<
  GetMeQueryResponse,
  AxiosError<GetMeErrorResponse>
> = {
  queryKey: ['/users/me'],
  async queryFn() {
    try {
      const res = await request.get<GetMeResponse>('/users/me', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      // 만약 "로그인 되지 않음" 에러라면 데이터 반환
      if (
        isAxiosError(err) &&
        err.response !== undefined &&
        err.response.status === 401
      ) {
        return err.response.data;
      }
      throw err;
    }
  },
};
