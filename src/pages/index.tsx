import GetStartedDialog from '@/components/GetStartedDialog.tsx';
import LogoIcon from '@/components/LogoIcon.tsx';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
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
      <header>
        <Link href="/" aria-label="메인으로 이동">
          <LogoIcon width="48" height="48" aria-hidden />
        </Link>
        <button type="button" onClick={handleOpenButtonClick}>
          시작하기
        </button>
        <GetStartedDialog
          isOpened={isGetStartedOpened}
          onClose={handleGetStartedClose}
          didLogin={handleDidLogin}
        />
      </header>
    </>
  );
}
