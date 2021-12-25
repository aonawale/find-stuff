<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	export let name: string
</script>

<Card class="bg-cyan-200 p-4 flex flex-col justify-end cursor-pointer aspect-square" on:click>
	<h2>{name}</h2>
</Card>
