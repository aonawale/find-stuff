<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import { Place, placeAddress } from '$lib/types/place'
	export let place: Place
</script>

<Card class="bg-cyan-400 p-4 flex flex-col justify-end cursor-pointer" on:click>
	<h2>{place.name}</h2>
	<h2>{placeAddress(place)}</h2>
</Card>
