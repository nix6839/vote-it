import { useTheme } from '@/core/theme.tsx';
import { Monitor, Moon, SunDim } from '@phosphor-icons/react';

import type { Theme } from '@/core/theme.tsx';
import type { Icon } from '@phosphor-icons/react';

const themeIcons: Record<Theme, Icon> = {
	system: Monitor,
	dark: Moon,
	light: SunDim,
};

/**
 * 브라우저의 localStorage에서 데이터를 받아 테마를 초기화 하기 때문에
 * 처음에 플리커링이 발생하여 이 컴포넌트를 사용할 때는 Lazy loading을
 * 이용해야 함
 */
export default function ThemeSelector() {
	const [theme, setTheme] = useTheme();

	function setNextTheme() {
		if (theme === 'system') {
			setTheme('dark');
		} else if (theme === 'dark') {
			setTheme('light');
		} else if (theme === 'light') {
			setTheme('system');
		}
	}

	const ThemeIcon = themeIcons[theme];

	return (
		<button type="button" onClick={setNextTheme} aria-label="테마 전환">
			<ThemeIcon size={44} aria-hidden />
		</button>
	);
}
