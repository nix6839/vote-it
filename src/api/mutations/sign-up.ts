import request from '../request.ts';

import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

interface SignUpResponse {}

interface SignUpErrorResponse {
  message: string;
}

interface SignUpRequest {
  email: string;
  password: string;
}

export const signUpMutation = {
  mutationKey: ['signUp'],
  mutationFn(variables) {
    return request.post('/auth/signup', variables);
  },
} satisfies UseMutationOptions<
  SignUpResponse,
  AxiosError<SignUpErrorResponse>,
  SignUpRequest
>;
