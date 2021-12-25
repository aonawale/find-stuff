<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const { categoryId, activityId } = page.params
		const { activity } = await fetch(
			`/categories/${categoryId}/activities/${activityId}.json`
		).then((res) => res.json())
		return {
			props: {
				activity,
				categoryId
			}
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'

	import IconButton from '$lib/components/IconButton.svelte'
	import SearchBar from '$lib/components/SearchBar.svelte'
	import type { Activity } from '$lib/types/category'

	export let categoryId: string
	export let activity: Activity
</script>

<div class="fixed top-0 right-0 bottom-0 w-96 p-4 bg-slate-50">
	<div class="flex items-center">
		<IconButton
			icon="close"
			on:click={() => goto(`/categories/${categoryId}`, { replaceState: true })}
		/>
		<h2 class="ml-2">{activity.name}</h2>
	</div>
	<SearchBar />
</div>
