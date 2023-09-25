import { getMe } from '@/api/get-me.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GetStartedDialog from './GetStartedDialog.tsx';

function SubMenuLoggedIn() {
  const { data: me } = useSuspenseQuery(getMe);

  return <p>{me.nickname}</p>;
}

function SubMenuNotLoggedIn() {
  const [isGetStartedOpened, setIsGetStartedOpened] = useState(false);

  function handleOpenButtonClick() {
    setIsGetStartedOpened(true);
  }

  function handleGetStartedClose() {
    setIsGetStartedOpened(false);
  }

  function handleDidLogin() {
    setIsGetStartedOpened(false);
  }

  return (
    <>
      <button type="button" onClick={handleOpenButtonClick}>
        시작하기
      </button>
      <GetStartedDialog
        isOpened={isGetStartedOpened}
        onClose={handleGetStartedClose}
        didLogin={handleDidLogin}
      />
    </>
  );
}

function SubMenuLoading() {
  return <div>Loading...</div>;
}

export default function SubMenu() {
  return (
    <ErrorBoundary fallback={<SubMenuNotLoggedIn />}>
      <Suspense fallback={<SubMenuLoading />}>
        <SubMenuLoggedIn />
      </Suspense>
    </ErrorBoundary>
  );
}
