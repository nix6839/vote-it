import { apiURL } from '@/api/request.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import { server } from '../../tests/mocks/server.ts';
import GetStartedDialog from './GetStartedDialog.tsx';

import type { ReactNode } from 'react';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('<GetStartedDialogButton />', () => {
  it('닫기 버튼 클릭 시 `onClose()`가 실행돼야 함', async () => {
    const onClose = vi.fn();
    render(<GetStartedDialog isOpened onClose={onClose} />, { wrapper });

    await userEvent.click(getCloseModalButton());
    expect(onClose).toHaveBeenCalled();
  });

  it('로그인과 회원가입 창들의 이메일과 비밀번호 입력칸의 값은 공유 돼야 함', async () => {
    render(<GetStartedDialog isOpened />, { wrapper });

    await userEvent.type(getEmailInput(), 'login@example.com');
    await userEvent.type(getPasswordInput(), 'login1234');
    await userEvent.click(getWindowToSignUpButton());
    expect(getEmailInput()).toHaveValue('login@example.com');
    expect(getPasswordInput()).toHaveValue('login1234');

    await userEvent.clear(getEmailInput());
    await userEvent.clear(getPasswordInput());

    await userEvent.type(getEmailInput(), 'signUp@example.com');
    await userEvent.type(getPasswordInput(), 'signUp1234');
    await userEvent.click(getWindowToLoginButton());
    expect(getEmailInput()).toHaveValue('signUp@example.com');
    expect(getPasswordInput()).toHaveValue('signUp1234');
  });

  describe('로그인 창', () => {
    it('회원가입 창으로 전환 버튼을 누를 시 변경돼야 함', async () => {
      render(<GetStartedDialog isOpened />, { wrapper });

      await userEvent.click(getWindowToSignUpButton());
      expect(getSignUpButton()).toBeInTheDocument();
    });

    it('로그인 버튼을 누를 시 API 응답이 올 동안 비활성화 상태여야 함', async () => {
      server.use(
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          return res(ctx.delay());
        }),
      );
      render(<GetStartedDialog isOpened />, { wrapper });

      const loginButton = getLoginButton();

      await userEvent.type(getEmailInput(), 'login@example.com');
      await userEvent.type(getPasswordInput(), 'login1234');
      await userEvent.click(loginButton);

      expect(loginButton).toBeDisabled();
      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });
    });

    it('로그인 완료 시 `didLogin()`가 실행 돼야 함', async () => {
      const didLogin = vi.fn();
      render(<GetStartedDialog isOpened didLogin={didLogin} />, { wrapper });
      server.use(
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );

      await userEvent.click(getLoginButton());
      expect(didLogin).toHaveBeenCalled();
    });
  });

  describe('회원가입 창', () => {
    it('로그인 창으로 전환 버튼을 누를 시 변경돼야 함', async () => {
      render(<GetStartedDialog isOpened />, { wrapper });
      await userEvent.click(getWindowToSignUpButton());

      await userEvent.click(getWindowToLoginButton());
      expect(getLoginButton()).toBeInTheDocument();
    });

    it('회원가입 버튼을 누를 시 API 응답이 올 동안 비활성화 상태여야 함', async () => {
      server.use(
        rest.post(apiURL('/auth/signup'), (req, res, ctx) => {
          return res(ctx.delay());
        }),
      );
      render(<GetStartedDialog isOpened />, { wrapper });
      await userEvent.click(getWindowToSignUpButton());

      const signUpButton = getSignUpButton();

      await userEvent.type(getEmailInput(), 'login@example.com');
      await userEvent.type(getPasswordInput(), 'login1234');
      await userEvent.click(signUpButton);

      expect(signUpButton).toBeDisabled();
      await waitFor(() => {
        expect(signUpButton).not.toBeDisabled();
      });
    });

    it('회원가입 완료 시 로그인을 수행하고 `didLogin()`가 실행 돼야 함.', async () => {
      const loginCalled = vi.fn();
      server.use(
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          loginCalled();
          return res();
        }),
        rest.post(apiURL('/auth/signup'), (req, res, ctx) => {
          return res(ctx.status(201));
        }),
      );
      const didLogin = vi.fn();
      render(<GetStartedDialog isOpened didLogin={didLogin} />, { wrapper });
      await userEvent.click(getWindowToSignUpButton());

      await userEvent.click(getSignUpButton());
      expect(loginCalled).toHaveBeenCalled();
      expect(didLogin).toHaveBeenCalled();
    });
  });
});

function getCloseModalButton() {
  return screen.getByRole('button', { name: '모달 닫기' });
}

function getEmailInput() {
  return screen.getByRole('textbox', { name: '이메일' });
}

function getPasswordInput() {
  return screen.getByLabelText('비밀번호');
}

function getSignUpButton() {
  return screen.getByRole('button', { name: '회원가입' });
}

function getLoginButton() {
  return screen.getByRole('button', { name: '로그인' });
}

function getWindowToSignUpButton() {
  return screen.getByRole('button', { name: '회원가입!' });
}

function getWindowToLoginButton() {
  return screen.getByRole('button', { name: '로그인!' });
}
