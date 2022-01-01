<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import type { Place } from '$lib/types/place'
	export let place: Place

	$: address = [place.location.address, place.location.locality, place.location.region]
		.filter((val) => val)
		.join(', ')
</script>

<Card class="bg-cyan-400 p-4 flex flex-col justify-end cursor-pointer" on:click>
	<h2>{place.name}</h2>
	<h2>{address}</h2>
</Card>
