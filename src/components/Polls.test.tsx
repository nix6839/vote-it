import { apiURL } from '@/api/request.ts';
import { expect, test } from '@tests/index.ts';
import { rest } from 'msw';
import Polls from './Polls.tsx';

test.describe('<Polls />', () => {
  test('처음 투표들을 로딩할 때 로딩 상태가 보여야 함', async ({
    mount,
    worker,
  }) => {
    worker.use(
      rest.get(apiURL('/polls'), (req, res, ctx) => {
        return res(ctx.delay('infinite'));
      }),
    );
    const component = await mount(<Polls />);

    await expect(component.getByText('Loading...')).toBeVisible();
  });

  test('스크롤을 내리면 다음 투표들이 로딩 돼야 함', async ({ mount }) => {
    const component = await mount(<Polls />);
    const polls = component.getByRole('article');
    await expect(polls).toHaveCount(12);
    await component.getByText('More loading...').scrollIntoViewIfNeeded();
    await expect(polls).toHaveCount(24);
  });
});
