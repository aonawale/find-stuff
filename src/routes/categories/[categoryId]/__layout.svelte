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
	import SearchBar from '$lib/components/SearchBar.svelte'
	import type Category from '$lib/types/category'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	export let category: Category | undefined

	$: activities = category.activities || []

	let windowInnerHeight = 0
	let activitiesHeight = windowInnerHeight

	const useSearch = (node: HTMLElement, windowInnerHeight: number) => {
		activitiesHeight = windowInnerHeight - node.clientHeight
		return {
			update(windowInnerHeight) {
				activitiesHeight = windowInnerHeight - node.clientHeight
			}
		}
	}
</script>

<svelte:window bind:innerHeight={windowInnerHeight} />

<div class="flex overflow-hidden">
	<div class="container mx-auto py-4 overflow-hidden">
		<div use:useSearch={windowInnerHeight}>
			<div class="flex items-center">
				<IconButton icon="arrow-back" on:click={() => goto('/', { replaceState: true })} />
				<h2 class="ml-4">{category.name}</h2>
			</div>
			<SearchBar />
		</div>

		<div class={`overflow-y-scroll overflow-x-hidden h-[${activitiesHeight}px]`}>
			<div class="grid grid-cols-4 gap-4 mt-4">
				{#each activities as { id, name } (id)}
					<ActivityCard
						{name}
						on:click={() => goto(`/categories/${category.id}/activities/${id}`)}
					/>
				{/each}
			</div>
		</div>
	</div>

	{#if $page.params.activityId}
		<div class="w-1/3 min-w-[450px]">
			<slot />
		</div>
	{/if}
</div>
