export async function getRandomNumber() {
	// Fetch a random number between 0 and 100
	// (with a delay, so that we can see it)
	const res = await new Promise((resolve) => {
		setTimeout(() => resolve({ ok: true }), 3000);
	});

	if (res.ok) {
		return Math.floor(Math.random() * 100);
	} else {
		// Sometimes the API will fail!
		throw new Error('Request failed');
	}
}
