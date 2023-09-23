import request from '../request.js';

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

export const loginMutation = {
  mutationKey: ['login'],
  mutationFn(variables) {
    return request.post('/auth/login', variables);
  },
} satisfies UseMutationOptions<
  LoginResponse,
  AxiosError<LoginErrorResponse>,
  LoginRequest
>;
