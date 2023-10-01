import { getMe } from '@/api/get-me.ts';
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GetStartedDialog from './GetStartedDialog.tsx';

import type { FallbackProps } from 'react-error-boundary';

function SubMenuLoggedIn() {
  const { data: me } = useSuspenseQuery(getMe);

  return <p>{me.nickname}</p>;
}

function SubMenuNotLoggedIn(props: FallbackProps) {
  const { resetErrorBoundary } = props;

  const [isGetStartedOpened, setIsGetStartedOpened] = useState(false);

  function openGetStarted() {
    setIsGetStartedOpened(true);
  }

  function closeGetStarted() {
    setIsGetStartedOpened(false);
  }

  async function handleDidLogin() {
    resetErrorBoundary();
    setIsGetStartedOpened(false);
  }

  return (
    <>
      <button type="button" onClick={openGetStarted}>
        시작하기
      </button>
      <GetStartedDialog
        isOpened={isGetStartedOpened}
        onClose={closeGetStarted}
        didLogin={handleDidLogin}
      />
    </>
  );
}

function SubMenuLoading() {
  return <div>Loading...</div>;
}

export default function SubMenu() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={SubMenuNotLoggedIn}>
      <Suspense fallback={<SubMenuLoading />}>
        <SubMenuLoggedIn />
      </Suspense>
    </ErrorBoundary>
  );
}
