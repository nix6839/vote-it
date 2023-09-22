import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import GetStartedDialog from './GetStartedDialog.tsx';

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

describe('<GetStartedDialogButton />', () => {
  test('닫기 버튼 클릭 시 `onClose()`가 실행돼야 함', async () => {
    const onClose = vi.fn();
    render(<GetStartedDialog isOpened onClose={onClose} />);

    await userEvent.click(getCloseModalButton());
    expect(onClose).toHaveBeenCalled();
  });

  test('회원가입 창으로 전환 버튼을 누를 시 변경돼야 함', async () => {
    render(<GetStartedDialog isOpened />);

    await userEvent.click(getWindowToSignUpButton());
    expect(getSignUpButton()).toBeInTheDocument();
  });

  test('로그인 창으로 전환 버튼을 누를 시 변경돼야 함', async () => {
    render(<GetStartedDialog isOpened />);
    await userEvent.click(getWindowToSignUpButton());

    await userEvent.click(getWindowToLoginButton());
    expect(getLoginButton()).toBeInTheDocument();
  });

  test('로그인과 비밀번호의 이메일과 비밀번호 입력칸의 값은 공유 돼야 함', async () => {
    render(<GetStartedDialog isOpened />);

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
});
