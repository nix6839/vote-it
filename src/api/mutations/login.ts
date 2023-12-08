import request from '../request.ts';

import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface LoginResponse {}

interface LoginErrorResponse {
	message: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

export const loginMutation: UseMutationOptions<
	LoginResponse,
	AxiosError<LoginErrorResponse>,
	LoginRequest
> = {
	mutationKey: ['login'],
	async mutationFn(variables) {
		const res = await request.post('/auth/login', variables);
		return res.data;
	},
};
