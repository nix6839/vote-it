import { apiURL } from '@/api/request';
import { expect, test } from '@tests/index.ts';
import { rest } from 'msw';
import SubMenu from './SubMenu.tsx';

import type { Locator } from '@playwright/test';

class Locators {
  readonly nickname: Locator;
  readonly getStartedOpenButton: Locator;
  readonly loadingText: Locator;

  constructor(component: Locator) {
    this.nickname = component.getByText('닉네임1234');
    this.getStartedOpenButton = component.getByRole('button', {
      name: '시작하기',
    });
    this.loadingText = component.getByText('Loading...');
  }
}

test.describe('<SubMenu />', () => {
  test('로그인이 되어 있을 때 닉네임이 보여야 함', async ({
    mount,
    worker,
  }) => {
    worker.use(
      rest.get(apiURL('/users/me'), (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            email: 'user@example.com',
            nickname: '닉네임1234',
          }),
        );
      }),
    );
    const component = await mount(<SubMenu />);
    const { nickname } = new Locators(component);

    await expect(nickname).toBeVisible();
  });

  test('로그인이 안 되어 있을 때 시작하기 버튼이 보여야 함', async ({
    mount,
    worker,
  }) => {
    worker.use(
      rest.get(apiURL('/users/me'), (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ message: '로그인이 필요합니다.' }),
        );
      }),
    );
    const component = await mount(<SubMenu />);
    const { getStartedOpenButton } = new Locators(component);

    await expect(getStartedOpenButton).toBeVisible();
  });

  test('API 요청이 오는 동안 로딩 상태가 보여야 함', async ({
    mount,
    worker,
  }) => {
    worker.use(
      rest.get(apiURL('/users/me'), (req, res, ctx) => {
        return res(ctx.delay(1 * 1000));
      }),
    );
    const component = await mount(<SubMenu />);
    const { loadingText } = new Locators(component);

    await expect(loadingText).toBeVisible();
  });

  test('시작하기 버튼을 누르면 모달이 보여야 함', async ({ mount, worker }) => {
    worker.use(
      rest.get(apiURL('/users/me'), (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ message: '로그인이 필요합니다.' }),
        );
      }),
    );
    const component = await mount(<SubMenu />);
    const { getStartedOpenButton } = new Locators(component);

    await getStartedOpenButton.click();
    await expect(component.getByRole('dialog')).toBeVisible();
  });
});
