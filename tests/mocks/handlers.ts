import { rest } from 'msw';

export const handlers = [
  rest.get('/asdf', (req, res, ctx) => {
    return res(ctx.text('asdf'));
  }),
];
