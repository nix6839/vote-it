// TODO: use faker.js for mock generate.

import { apiURL } from '@/api/request.ts';
import isInteger from '@/utils/is-integer.ts';
import { rest } from 'msw';

import type { Poll } from '@/api/types.ts';

const poll: Poll = {
	id: 1,
	createdAt: '2023-09-25T15:58:24.725Z',
	subject: 'asdf',
	expirationDate: null,
	picture: null,
	participatedCount: 0,
	isMultiple: false,
	isVoted: false,
	options: [
		{
			id: 1,
			content: 'asdf',
			votedCount: 0,
			isVoted: false,
		},
		{
			id: 2,
			content: 'qwer',
			votedCount: 0,
			isVoted: false,
		},
	],
	author: {
		id: 1,
		email: 'user1@example.com',
		nickname: 'nickname1',
		picture: null,
	},
};

export const polls: Poll[] = Array.from({ length: 50 }, (_, i) => ({
	...poll,
	id: i + 1,
	author: {
		id: i + 1,
		email: `user${i + 1}@example.com`,
		nickname: `Nick${i + 1}`,
		picture: null,
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
				ctx.json({
					isLoggedIn: false,
					message: '로그인이 필요합니다.',
				}),
			);
		}

		return res(
			ctx.status(200),
			ctx.json({
				isLoggedIn: true,
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
