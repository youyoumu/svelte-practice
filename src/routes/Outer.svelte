<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('message', event.detail);
	}
	import Inner from './Inner.svelte';
</script>

<!-- <Inner on:message={forward} /> -->
<Inner on:message />
