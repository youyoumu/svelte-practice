import { readable } from 'svelte/store';

export const time = readable(new Date(), function start(set) {
	// setup code goes here
	const interval = setInterval(() => {
		set(new Date());
	}, 2000);
	return function stop() {
		clearInterval(interval);
	};
});
