<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const { categoryId, activityId } = page.params
		const { activity } = await fetch(
			`/categories/${categoryId}/activities/${activityId}.json`
		).then((res) => res.json())
		return {
			props: {
				activity
			}
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'
	import IconButton from '$lib/components/IconButton.svelte'
	import PlaceCard from '$lib/components/PlaceCard.svelte'
	import SearchBar from '$lib/components/SearchBar.svelte'
	import { search } from '$lib/db/places'
	import type { Activity } from '$lib/types/category'
	import type { Place } from '$lib/types/place'

	export let activity: Activity

	$: {
		searchPlaces(activity.id)
	}

	let searchValue = 'south africa'
	let places: Place[] = []

	const searchPlaces = async (activityId: string = activity.id, near: string = searchValue) => {
		if (!activityId || !near) return
		places = await search(activityId, near)
	}
</script>

<div class="p-4 bg-slate-50 h-full w-full">
	<div class="flex items-center">
		<IconButton
			icon="close"
			on:click={() => goto(`/categories/${activity.categoryId}`, { replaceState: true })}
		/>
		<h2 class="ml-2">{activity.name}</h2>
	</div>
	<form on:submit|preventDefault={() => searchPlaces()}>
		<SearchBar bind:value={searchValue} />
	</form>
	<div class="mt-4 grid grid-cols-1 gap-4">
		{#each places as place (place.fsqId)}
			<PlaceCard
				{place}
				on:click={() =>
					goto(
						`/categories/${activity.categoryId}/activities/${activity.id}/places/${place.fsqId}`
					)}
			/>
		{/each}
	</div>
</div>
