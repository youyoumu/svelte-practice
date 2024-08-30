<script>
	import Nested from './Nested.svelte';
	let name = 'youyoumu';
	const src =
		'https://avatars.githubusercontent.com/u/19760884?s=400&u=6762f1be1dfc466fc31654873d46722d40537392&v=4';
	let string = `asdasd asdasdasd asdasdasd asdasda <strong>HTML!!</strong>`;
	let count = 4;

	function increment() {
		count += 1;
	}

	let doubled = 1;
	$: doubled = count * 2;
	let tripled = count * 3;
	const doubledTimes5 = doubled * 5;
</script>

<h1>Hello {name.toUpperCase()}!</h1>
<img {src} alt="profile" />
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium atque odit ducimus!</p>
<Nested />
<p>
	{string}
</p>
<p>
	{@html string}
</p>
<button on:click={increment}>
	clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
<p>doubled: {doubled}</p>
<p>tripled: {tripled}</p>
<p>quadrupled: {count * 4}</p>
<p>doubledTimes5: {doubledTimes5}</p>

<style>
	p {
		color: red;
		font-size: 1.5rem;
	}
</style>
