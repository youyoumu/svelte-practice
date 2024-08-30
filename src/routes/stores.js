import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	// setup code goes here
	const interval = setInterval(() => {
		set(new Date());
	}, 2000);
	return function stop() {
		clearInterval(interval);
	};
});

const start = new Date();
export const elapsed = derived(time, ($time) => {
	return Math.round(($time - start) / 1000);
});
