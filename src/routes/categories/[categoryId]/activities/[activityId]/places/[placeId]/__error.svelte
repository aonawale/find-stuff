<script context="module" lang="ts">
	/** @typedef {import('@sveltejs/kit').Load} Load */
	export const load = async ({ page }) => {
		const { categoryId, activityId } = page.params
		return {
			props: {
				activityId,
				categoryId
			}
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'
	import IconButton from '$lib/components/IconButton.svelte'

	export let activityId: string
	export let categoryId: string
</script>

<div class="p-4 bg-slate-50 h-full w-full">
	<div class="flex items-center">
		<IconButton
			icon="back"
			on:click={() =>
				goto(`/categories/${categoryId}/activities/${activityId}`, { replaceState: true })}
		/>
	</div>
	<h2>Cannot find place</h2>
</div>
