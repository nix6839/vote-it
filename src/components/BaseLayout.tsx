import dynamic from 'next/dynamic';
import Link from 'next/link';
import LogoIcon from './LogoIcon.tsx';
import SubMenu from './SubMenu.tsx';

import type { ReactNode } from 'react';

const DynamicThemeSelector = dynamic(
	() => import('@/components/ThemeSelector.tsx'),
	{
		ssr: false,
	},
);

interface BaseLayoutProps {
	children: ReactNode;
}

export default function BaseLayout(props: BaseLayoutProps) {
	const { children } = props;

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
			{children}
		</>
	);
}
