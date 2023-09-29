import { apiURL } from '@/api/request.ts';
import { rest } from 'msw';

import type { Poll } from '@/api/get-polls.infinite.ts';

const poll: Poll = {
  id: 1,
  createdAt: '2023-09-25T15:58:24.725Z',
  subject: 'asdf',
  expirationDate: null,
  picture: null,
  participatedCount: 0,
  author: {
    nickname: 'nickname1',
  },
};

export const polls: Poll[] = Array.from({ length: 50 }, (_, i) => ({
  ...poll,
  id: i + 1,
  author: {
    nickname: `Nick${i + 1}`,
  },
}));

export const handlers = [
  rest.post(apiURL('/auth/signup'), async (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.post(apiURL('/auth/login'), async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email !== 'user@example.com' || password !== 'password1234') {
      return res(
        ctx.status(404),
        ctx.json({
          message: '이메일이 존재하지 않거나 비밀번호가 틀렸습니다.',
        }),
      );
    }
    return res(ctx.status(200), ctx.cookie('accessToken', 'abc-123'));
  }),

  rest.get(apiURL('/users/me'), (req, res, ctx) => {
    const { accessToken } = req.cookies;

    if (accessToken !== 'abc-123') {
      return res(
        ctx.status(401),
        ctx.json({ message: '로그인이 필요합니다.' }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        email: 'user@example.com',
        nickname: '닉네임1234',
      }),
    );
  }),

  rest.get(apiURL('/polls'), (req, res, ctx) => {
    const limitStr = req.url.searchParams.get('limit');
    const cursorStr = req.url.searchParams.get('cursor') ?? '1';

    if (limitStr === null || !isInteger(limitStr) || !isInteger(cursorStr)) {
      return res(ctx.status(400));
    }

    const limit = parseInt(limitStr, 10);
    const cursor = parseInt(cursorStr, 10);

    const cursorPollIdx = polls.findIndex((poll) => poll.id === cursor);
    const nextStartPollIdx = cursorPollIdx + limit;
    const resPolls = polls.slice(cursorPollIdx, nextStartPollIdx);
    const nextCursor = polls[nextStartPollIdx]?.id;

    return res(
      ctx.json({
        polls: resPolls,
        nextCursor,
      }),
    );
  }),
];

function isInteger(s: string) {
  return /^\+?[1-9]\d*$/.test(s);
}
