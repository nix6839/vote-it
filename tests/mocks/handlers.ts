import { apiURL } from '@/api/request.ts';
import { rest } from 'msw';

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
];
