import type { ComponentPropsWithoutRef } from 'react';

export interface LogoIconProps
	extends Omit<ComponentPropsWithoutRef<'svg'>, 'viewBox'> {}

export default function LogoIcon(props: LogoIconProps) {
	return (
		<svg viewBox="0 0 48 48" {...props}>
			<g fill="#5d6dbe">
				<path d="m23.502 32.693-11.8-11.8 3.65-3.644 8.15 8.144L43.346 5.542l3.66 3.66-23.504 23.491Z" />
				<path d="m7.444 20.864 16.077 16.077 17.877-17.87c.39 1.58.596 3.23.596 4.929 0 11.322-9.178 20.5-20.5 20.5S.994 35.322.994 24s9.178-20.5 20.5-20.5A20.427 20.427 0 0 1 35.43 8.965L23.52 20.878l-8.05-8.032-8.027 8.018Z" />
			</g>
		</svg>
	);
}
