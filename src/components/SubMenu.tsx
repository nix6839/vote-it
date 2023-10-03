import { getMe } from '@/api/get-me.ts';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import GetStartedDialog from './GetStartedDialog.tsx';

function SubMenuLoading() {
  return <div>Loading...</div>;
}

function SubMenuNotLoggedIn() {
  const [isGetStartedOpened, setIsGetStartedOpened] = useState(false);
  const queryClient = useQueryClient();

  function openGetStarted() {
    setIsGetStartedOpened(true);
  }

  function closeGetStarted() {
    setIsGetStartedOpened(false);
  }

  async function handleDidLogin() {
    await queryClient.refetchQueries();
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

function SubMenuMain() {
  const { data: me } = useSuspenseQuery(getMe);

  if (!me.isLoggedIn) {
    return <SubMenuNotLoggedIn />;
  }

  return <p>{me.nickname}</p>;
}

export default function SubMenu() {
  return (
    <Suspense fallback={<SubMenuLoading />}>
      <SubMenuMain />
    </Suspense>
  );
}
