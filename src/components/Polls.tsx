import { getPollsInfinite } from '@/api/get-polls.infinite.ts';
import useIntersectionObserver from '@/hooks/use-intersection-observer.ts';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PollCard from './PollCard.tsx';

function PollsLoading() {
  return <p>Loading...</p>;
}

function PollsError() {
  return <p>Error!</p>;
}

function PollsSuccess() {
  const { data, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(getPollsInfinite);

  const { ref: loadingRef } = useIntersectionObserver({
    callback(entry) {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      {data.pages.map((page) =>
        page.polls.map((poll) => <PollCard key={poll.id} poll={poll} />),
      )}
      {hasNextPage && <p ref={loadingRef}>More loading...</p>}
    </>
  );
}

export default function Polls() {
  return (
    <ErrorBoundary fallbackRender={PollsError}>
      <Suspense fallback={<PollsLoading />}>
        <PollsSuccess />
      </Suspense>
    </ErrorBoundary>
  );
}
