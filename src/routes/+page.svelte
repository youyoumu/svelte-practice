<script>
	import PackageInfo from './PackageInfo.svelte';
	import Nested from './Nested.svelte';
	import Thing from './Thing.svelte';
	import { getRandomNumber } from './utils.js';
	import Inner from './Inner.svelte';
	import Outer from './Outer.svelte';
	import { paint } from './gradient.js';
	import { onMount } from 'svelte';
	import { time, elapsed, count, name3, greeting } from './stores.js';

	let name = 'youyoumu';
	const src =
		'https://avatars.githubusercontent.com/u/19760884?s=400&u=6762f1be1dfc466fc31654873d46722d40537392&v=4';
	let string = `asdasd asdasdasd asdasdasd asdasda <strong>HTML!!</strong>`;
	let count2 = 4;

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

	// let a = numbersObj.a;

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

	function handleMessage(event) {
		alert(event.detail.text);
	}

	let name2 = 'world';

	let a = 1;
	let b = 2;

	let yes = false;

	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];

	let selected;

	let answer = '';

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}

	let scoops = 1;
	let flavours = [];

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
	$: console.log(scoops, flavours);

	onMount(() => {
		const canvas = document.querySelector('canvas');
		const context = canvas.getContext('2d');

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		return () => cancelAnimationFrame(frame);
	});

	const formatter2 = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<h1>{$greeting}</h1>
<input bind:value={$name3} />

<button on:click={() => ($name3 += '!')}> Add exclamation mark! </button>

<h1>The count is {$count}</h1>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>

<p>
	This page has been open for
	{$elapsed}
	{$elapsed === 1 ? 'second' : 'seconds'}
</p>
<h1>The time is {formatter2.format($time)}</h1>

<canvas width={32} height={32}></canvas>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input type="radio" name="scoops" value={number} bind:group={scoops} />

		{number}
		{number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<option>{flavour} </option>{/each}
</select>

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<h2>Insecurity questions</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select bind:value={selected} on:change={() => (answer = '')}>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit"> Submit </button>
</form>

<p>
	selected question {selected ? selected.id : '[waiting...]'}
</p>

<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>Subscribe</button>

<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>

<input bind:value={name2} />
<h1>Hello {name2}!</h1>

<Outer on:message={handleMessage} />
<Inner on:message={handleMessage} />

<button on:click|once={() => alert('clicked')}> Click me </button>

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
	canvas {
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		-webkit-mask-size: 60vmin;
	}
	p {
		color: red;
		font-size: 1.5rem;
	}
</style>
