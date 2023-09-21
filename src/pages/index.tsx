import LogoIcon from '@/components/LogoIcon.tsx';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <Link href="/" aria-label="메인으로 이동">
          <LogoIcon width="48" height="48" aria-hidden />
        </Link>
      </header>
    </>
  );
}
