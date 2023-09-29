import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import LogoIcon from './LogoIcon.tsx';

import type { Poll } from '@/api/get-polls.infinite.ts';

interface PollCardProps {
  poll: Poll;
}

export default function PollCard(props: PollCardProps) {
  const { poll } = props;

  return (
    <Link href={`/polls/${poll.id}`}>
      <article>
        {poll.picture === null ? (
          <LogoIcon width="48" height="48" />
        ) : (
          <Image src={poll.picture} alt="썸네일" aria-hidden="true" />
        )}
        <p>{poll.subject}</p>
        <p>참여인원 {poll.participatedCount}명</p>
        <p>
          시작일{' '}
          <time dateTime={poll.createdAt}>
            {dayjs(poll.createdAt).format('YYYY년 MM월 DD일')}
          </time>
        </p>
        <p>{poll.author.nickname}</p>
      </article>
    </Link>
  );
}
