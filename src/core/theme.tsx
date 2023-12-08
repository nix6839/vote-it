import { useEffect, useSyncExternalStore } from 'react';

const isDarkModeEnabledQuery = '(prefers-color-scheme: dark)';

export type Theme = 'dark' | 'light' | 'system';
type OnStoreChange = () => void;

class ThemeManager {
	public static readonly KEY = 'VOTE_IT_THEME';
	private static _notifiers = new Set<OnStoreChange>();

	public static subscribe(notify: OnStoreChange) {
		ThemeManager._notifiers.add(notify);
		return () => {
			ThemeManager._notifiers.delete(notify);
		};
	}

	public static applyThemeChange() {
		ThemeManager.updateThemeClass();
		ThemeManager._notifyAll();
	}

	public static setTheme(theme: Theme) {
		localStorage.setItem(ThemeManager.KEY, theme);
		ThemeManager.applyThemeChange();
	}

	public static getTheme(): Theme {
		const item = localStorage.getItem(ThemeManager.KEY);
		if (item === 'dark' || item === 'light') {
			return item;
		}
		return 'system';
	}

	public static updateThemeClass() {
		const theme = ThemeManager.getTheme();
		const root = document.documentElement;
		if (
			theme === 'dark' ||
			(theme === 'system' && window.matchMedia(isDarkModeEnabledQuery).matches)
		) {
			root.classList.add('dark');
			root.style.colorScheme = 'dark';
		} else {
			root.classList.remove('dark');
			root.style.colorScheme = 'light';
		}
	}

	private static _notifyAll() {
		for (const notify of ThemeManager._notifiers) {
			notify();
		}
	}
}

export function useTheme() {
	const theme = useSyncExternalStore<Theme>(
		ThemeManager.subscribe,
		ThemeManager.getTheme,
		() => 'system',
	);

	return [theme, ThemeManager.setTheme] as const;
}

/**
 * Sync change across other tabs, windows and iframes.
 * Use it once at the top of app.
 */
export function useSyncThemeAcrossInstances() {
	useEffect(() => {
		function onStorage(event: StorageEvent) {
			if (
				event.storageArea === localStorage &&
				event.key === ThemeManager.KEY
			) {
				ThemeManager.applyThemeChange();
			}
		}
		window.addEventListener('storage', onStorage);
		return () => {
			window.removeEventListener('storage', onStorage);
		};
	}, []);
}

export function useSyncThemeWithSystem() {
	useEffect(() => {
		function onMediaChange() {
			if (ThemeManager.getTheme() === 'system') {
				ThemeManager.updateThemeClass();
			}
		}
		const mql = window.matchMedia(isDarkModeEnabledQuery);
		mql.addEventListener('change', onMediaChange);
		return () => {
			mql.removeEventListener('change', onMediaChange);
		};
	});
}

function initTheme() {
	const theme = localStorage.getItem('VOTE_IT_THEME');
	const root = document.documentElement;
	if (
		theme === 'dark' ||
		(theme !== 'light' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		root.classList.add('dark');
		root.style.colorScheme = 'dark';
	} else {
		root.classList.remove('dark');
		root.style.colorScheme = 'light';
	}
}
export const initThemeInlineScript = `(${initTheme})()`;
