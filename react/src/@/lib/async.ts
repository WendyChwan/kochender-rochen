export const Async = (promise: (signal: AbortSignal) => Promise<void>): (() => void) => {
	const controller = new AbortController();

	promise(controller.signal).catch(() => { });

	return () => controller.abort();
}