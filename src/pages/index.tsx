import GetStartedDialog from '@/components/GetStartedDialog';
import LogoIcon from '@/components/LogoIcon.tsx';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isGetStartedOpened, setIsGetStartedOpened] = useState(false);

  function handleOpenButtonClick() {
    setIsGetStartedOpened((prev) => !prev);
  }

  function onGetStartedClose() {
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
          onClose={onGetStartedClose}
        />
      </header>
    </>
  );
}
