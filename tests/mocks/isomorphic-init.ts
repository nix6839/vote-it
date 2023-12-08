if (typeof window === 'undefined') {
	const { server } = await import('./server.ts');
	server.listen();
} else {
	const { worker } = await import('./browser.ts');
	worker.start({ onUnhandledRequest: 'bypass' });
}

export {};
