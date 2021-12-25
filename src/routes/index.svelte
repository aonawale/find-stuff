<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const { categories } = await fetch('/categories.json').then((res) => res.json())
		return {
			props: {
				categories
			}
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'
	import type Category from '$lib/types/category'
	import ActivityCard from '$lib/components/ActivityCard.svelte'

	export let categories: Category[]
</script>

<div class="container mx-auto py-4 overflow-hidden">
	<div class="grid grid-cols-4 gap-4">
		{#each categories as category (category.id)}
			<ActivityCard name={category.name} on:click={() => goto(`/categories/${category.id}`)} />
		{/each}
	</div>
</div>
