import { apiURL } from '@/api/request.ts';
import { expect, test } from '@tests/index.ts';
import GetStartedDialogLocators from '@tests/utils/GetStartedDialogLocators.ts';
import { rest } from 'msw';
import GetStartedDialog from './GetStartedDialog.tsx';

test.describe('<GetStartedDialog />', () => {
  test('닫기 버튼 클릭 시 `onClose()`가 실행돼야 함', async ({ mount }) => {
    let onClose = false;
    const component = await mount(
      <GetStartedDialog
        isOpened
        onClose={() => {
          onClose = true;
        }}
      />,
    );
    const { closeDialogButton } = new GetStartedDialogLocators(component);

    await closeDialogButton.click();
    expect(onClose).toBe(true);
  });

  test('로그인과 회원가입 창들의 이메일과 비밀번호 입력칸의 값은 공유돼야 함', async ({
    mount,
  }) => {
    const component = await mount(<GetStartedDialog isOpened />);
    const {
      emailInput,
      passwordInput,
      windowToSignUpButton,
      windowToLoginButton,
    } = new GetStartedDialogLocators(component);

    await emailInput.fill('login@example.com');
    await passwordInput.fill('login1234');
    await windowToSignUpButton.click();
    await expect(emailInput).toHaveValue('login@example.com');
    await expect(passwordInput).toHaveValue('login1234');

    await emailInput.fill('signup@example.com');
    await passwordInput.fill('signup1234');
    await windowToLoginButton.click();
    await expect(emailInput).toHaveValue('signup@example.com');
    await expect(passwordInput).toHaveValue('signup1234');
  });

  test.describe('로그인 창', () => {
    test('회원가입 창으로 전환 버튼을 누를 시 변경돼야 함', async ({
      mount,
    }) => {
      const component = await mount(<GetStartedDialog isOpened />);
      const { windowToSignUpButton, signUpButton } =
        new GetStartedDialogLocators(component);

      await windowToSignUpButton.click();
      await expect(signUpButton).toBeVisible();
    });

    test('로그인 버튼을 누를 시 API 응답이 올 동안 비활성화 상태여야 함', async ({
      mount,
      worker,
    }) => {
      worker.use(
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          return res(ctx.delay(1 * 1000));
        }),
      );
      const component = await mount(<GetStartedDialog isOpened />);
      const { emailInput, passwordInput, loginButton } =
        new GetStartedDialogLocators(component);

      await emailInput.fill('login@example.com');
      await passwordInput.fill('login1234');
      await loginButton.click();
      await expect(loginButton).toBeDisabled();
      await expect(loginButton).toBeEnabled();
    });

    test('로그인 완료 시 `didLogin()`가 실행 돼야 함', async ({
      mount,
      worker,
    }) => {
      worker.use(
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      );
      let didLogin = false;
      const component = await mount(
        <GetStartedDialog
          isOpened
          didLogin={() => {
            didLogin = true;
          }}
        />,
      );
      const { loginButton } = new GetStartedDialogLocators(component);

      await loginButton.click();
      await expect.poll(() => didLogin).toBe(true);
    });
  });

  test.describe('회원가입 창', () => {
    test('로그인 창으로 전환 버튼을 누를 시 변경돼야 함', async ({ mount }) => {
      const component = await mount(<GetStartedDialog isOpened />);
      const { windowToSignUpButton, windowToLoginButton, loginButton } =
        new GetStartedDialogLocators(component);
      await windowToSignUpButton.click();

      await windowToLoginButton.click();
      await expect(loginButton).toBeVisible();
    });

    test('회원가입 버튼을 누를 시 API 응답이 올 동안 비활성화 상태여야 함', async ({
      mount,
      worker,
    }) => {
      worker.use(
        rest.post(apiURL('/auth/signup'), (req, res, ctx) => {
          return res(ctx.delay(1 * 1000));
        }),
      );
      const component = await mount(<GetStartedDialog isOpened />);
      const { windowToSignUpButton, signUpButton, emailInput, passwordInput } =
        new GetStartedDialogLocators(component);
      await windowToSignUpButton.click();

      await emailInput.fill('login@example.com');
      await passwordInput.fill('login1234');
      await signUpButton.click();
      await expect(signUpButton).toBeDisabled();
      await expect(signUpButton).toBeEnabled();
    });

    test('회원가입 완료 시 로그인을 수행하고 `didLogin()`가 실행 돼야 함.', async ({
      mount,
      worker,
    }) => {
      let loginCalled = false;
      worker.use(
        rest.post(apiURL('/auth/signup'), (req, res, ctx) => {
          return res(ctx.status(201));
        }),
        rest.post(apiURL('/auth/login'), (req, res, ctx) => {
          loginCalled = true;
          return res();
        }),
      );
      let didLogin = false;
      const component = await mount(
        <GetStartedDialog
          isOpened
          didLogin={() => {
            didLogin = true;
          }}
        />,
      );
      const { windowToSignUpButton, signUpButton } =
        new GetStartedDialogLocators(component);
      await windowToSignUpButton.click();

      await signUpButton.click();
      await expect.poll(() => loginCalled).toBe(true);
      await expect.poll(() => didLogin).toBe(true);
    });
  });
});
