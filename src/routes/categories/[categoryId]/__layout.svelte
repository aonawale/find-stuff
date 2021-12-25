<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const { categoryId } = page.params
		const { category } = await fetch(`/categories/${categoryId}.json`).then((res) => res.json())
		return {
			props: {
				category
			}
		}
	}
</script>

<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte'
	import ActivityCard from '$lib/components/ActivityCard.svelte'
	import type Category from '$lib/types/category'
	import { goto } from '$app/navigation'

	export let category: Category | undefined

	$: activities = category.activities || []
</script>

<div class="container mx-auto py-4 overflow-hidden">
	<div class=" flex items-center">
		<IconButton icon="arrow-back" on:click={() => goto('/', { replaceState: true })} />
		<h2 class="ml-4">{category.name}</h2>
	</div>

	<div class="grid grid-cols-4 gap-4 mt-4">
		{#each activities as { id, name } (id)}
			<ActivityCard {name} on:click={() => goto(`/categories/${category.id}/activities/${id}`)} />
		{/each}
	</div>
</div>

<slot />
