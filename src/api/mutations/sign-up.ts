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

export const signUpMutation: UseMutationOptions<
  SignUpResponse,
  AxiosError<SignUpErrorResponse>,
  SignUpRequest
> = {
  mutationKey: ['signUp'],
  async mutationFn(variables) {
    const res = await request.post('/auth/signup', variables);
    return res.data;
  },
};
