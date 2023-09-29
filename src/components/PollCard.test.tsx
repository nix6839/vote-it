import { expect, test } from '@tests/index.ts';
import { polls } from '@tests/mocks/handlers.ts';
import PollCard from './PollCard.tsx';

test.describe('<PollCard />', () => {
  test('날짜가 YYYY년 MM월 DD일 형식으로 표시 돼야 함.', async ({ mount }) => {
    const component = await mount(
      <PollCard
        poll={{ ...polls[0], createdAt: '2023-09-29T07:32:11.457Z' }}
      />,
    );

    const createdAt = component.getByRole('time');
    await expect(createdAt).toHaveText('2023년 09월 29일');
  });
});
