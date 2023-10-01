import LogoIcon from '@/components/LogoIcon.tsx';
import Polls from '@/components/Polls.tsx';
import SubMenu from '@/components/SubMenu.tsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicThemeSelector = dynamic(
  () => import('@/components/ThemeSelector.tsx'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <>
      <header>
        <Link href="/" aria-label="메인으로 이동">
          <LogoIcon width="48" height="48" aria-hidden />
        </Link>
        <div>
          <DynamicThemeSelector />
          <SubMenu />
        </div>
      </header>
      <main>
        <Polls />
      </main>
    </>
  );
}
