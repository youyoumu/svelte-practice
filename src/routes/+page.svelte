<script>
	import PackageInfo from './PackageInfo.svelte';
	import Nested from './Nested.svelte';
	import Thing from './Thing.svelte';
	import { getRandomNumber } from './utils.js';

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
	$: {
		console.log(count);
		console.log('wow');
	}

	$: if (count % 2 === 0) {
		console.log('count is even');
	}

	let numbers = [1, 2, 3, 4, 5];

	function addNumbers() {
		// numbers.push(numbers.length + 1);
		// numbers = numbers;

		// numbers = [...numbers, numbers.length + 1];

		numbers[numbers.length] = numbers.length + 1;
	}

	$: sum = numbers.reduce((acc, n) => acc + n, 0);

	let numbersObj = {
		a: 1
	};

	let a = numbersObj.a;

	function addNumbersObj() {
		numbersObj.a = numbersObj.a + 1;
	}

	const pkg = {
		name: 'svelte',
		speed: 'blazing',
		version: 4,
		website: 'https://svelte.dev'
	};

	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];

	function handleClick() {
		things = things.slice(1);
	}

	let promise = getRandomNumber();

	function handleClick2() {
		promise = getRandomNumber();
	}

	let m = { x: 0, y: 0 };
	let handleMoveCount = 0;

	function handleMove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
		handleMoveCount += 1;
	}
</script>

<div
	on:pointermove={(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
		handleMoveCount += 1;
	}}
>
	The pointer is at {m.x} x {m.y}
	<p>handleMoveCount: {handleMoveCount}</p>
</div>
<button on:click={handleClick2}> generate random number </button>

{#await promise}
	<p>loading</p>
{:then number}
	<p>{number}</p>
{/await}

<button on:click={handleClick}> Remove first thing </button>

{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

{#each numbers as n, i}
	<span>{n}{i},</span>
{/each}

<p>{numbers.join(' + ')} = {sum}</p>
{#if sum % 2 === 0}
	<p>sum is even</p>
{:else if sum % 3 === 0}
	<p>sum is multiple of 3</p>
{:else}
	<p>sum is odd</p>
{/if}
<button on:click={addNumbers}>Add</button>
<p>{numbersObj.a}</p>
<p>a: {a}</p>
<button on:click={addNumbersObj}>Add</button>
<Nested name={'test' + sum} />
<Nested />
<PackageInfo {...pkg} />

<div style="display:none;">
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
</div>

<style>
	p {
		color: red;
		font-size: 1.5rem;
	}
</style>
