import { X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { Dispatch, MouseEvent, SetStateAction } from 'react';

interface FormValues {
  email: string;
  password: string;
}

interface GetStartedDialogProps {
  /**
   * @default false
   */
  isOpened?: boolean;
  onClose?: () => void;
}

type Window = 'login' | 'signUp';

export default function GetStartedDialog(props: GetStartedDialogProps) {
  const { isOpened = false, onClose } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [currentWindow, setCurrentWindow] = useState<Window>('login');

  const email = useRef('');
  const password = useRef('');

  function setEmail(newEmail: string) {
    email.current = newEmail;
  }
  function setPassword(newPassword: string) {
    password.current = newPassword;
  }

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpened]);

  function handleDialogClick(e: MouseEvent) {
    const isBackdropClicked = e.target === e.currentTarget;
    if (isBackdropClicked) {
      onClose?.();
    }
  }

  const CurrentForm = currentWindow === 'login' ? LoginForm : SignUpForm;
  const CurrentFooter = currentWindow === 'login' ? LoginFooter : SignUpFooter;

  return (
    <dialog ref={dialogRef} onClose={onClose} onClick={handleDialogClick}>
      <div>
        <CurrentForm
          initialEmail={email.current}
          initialPassword={password.current}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <CurrentFooter setCurrentWindow={setCurrentWindow} />
        <button type="button" aria-label="모달 닫기" onClick={onClose}>
          <X aria-hidden />
        </button>
      </div>
    </dialog>
  );
}

interface FormProps {
  initialEmail: string;
  initialPassword: string;
  setEmail: (newEmail: string) => void;
  setPassword: (newPassword: string) => void;
}

function LoginForm(props: FormProps) {
  const { initialEmail, initialPassword, setEmail, setPassword } = props;

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      email: initialEmail,
      password: initialPassword,
    },
  });

  function handleValidatedSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleValidatedSubmit)}>
      <label>
        이메일
        <input
          type="email"
          inputMode="email"
          {...register('email', {
            onChange(event) {
              setEmail(event.target.value);
            },
          })}
        />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          {...register('password', {
            onChange(event) {
              setPassword(event.target.value);
            },
          })}
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  );
}

function SignUpForm(props: FormProps) {
  const { initialEmail, initialPassword, setEmail, setPassword } = props;

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      email: initialEmail,
      password: initialPassword,
    },
  });

  function handleValidatedSubmit(data: FormValues) {
    console.log(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleValidatedSubmit)}>
      <label>
        이메일
        <input
          type="email"
          inputMode="email"
          {...register('email', {
            onChange(event) {
              setEmail(event.target.value);
            },
          })}
        />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          {...register('password', {
            onChange(event) {
              setPassword(event.target.value);
            },
          })}
        />
      </label>
      <button type="submit">회원가입</button>
    </form>
  );
}

interface FooterProps {
  setCurrentWindow: Dispatch<SetStateAction<Window>>;
}

function LoginFooter(props: FooterProps) {
  const { setCurrentWindow } = props;

  return (
    <p>
      계정이 없으시다면?{' '}
      <button
        type="button"
        onClick={() => {
          setCurrentWindow('signUp');
        }}
      >
        회원가입!
      </button>
    </p>
  );
}
function SignUpFooter(props: FooterProps) {
  const { setCurrentWindow } = props;

  return (
    <p>
      이미 계정이 있으시다면?{' '}
      <button
        type="button"
        onClick={() => {
          setCurrentWindow('login');
        }}
      >
        로그인!
      </button>
    </p>
  );
}
