import { readable, derived, writable } from 'svelte/store';

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

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => {
			update((n) => n + 1);
		},
		decrement: () => {
			update((n) => n - 1);
		},
		reset: () => {
			set(0);
		}
	};
}

export const count = createCount();

export const name3 = writable('world');

export const greeting = derived(name3, ($name3) => `Hello ${$name3}!`);
