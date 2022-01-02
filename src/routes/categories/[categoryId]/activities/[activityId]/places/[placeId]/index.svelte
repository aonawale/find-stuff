<script context="module" lang="ts">
	import { fetchData } from '$lib/utils/utils'

	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ page, fetch }) => {
		const { categoryId, activityId, placeId } = page.params
		try {
			const { place, photos } = await fetchData(
				fetch,
				`/categories/${categoryId}/activities/${activityId}/places/${placeId}.json?include=photos`
			)
			return {
				props: {
					place,
					photos,
					activityId,
					categoryId
				}
			}
		} catch (error) {
			return error
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation'
	import IconButton from '$lib/components/IconButton.svelte'
	import PlacePhoto from '$lib/components/PlacePhoto.svelte'
	import { Photo, Place, placeAddress } from '$lib/types/place'

	export let place: Place
	export let photos: Photo[]
	export let activityId: string
	export let categoryId: string
</script>

<div class="p-4 bg-slate-50 h-full w-full">
	<IconButton
		icon="back"
		on:click={() =>
			goto(`/categories/${categoryId}/activities/${activityId}`, { replaceState: true })}
	/>
	<div class="py-4">
		<h2>{place.name}</h2>
		<h4>{placeAddress(place)}</h4>
		<div class="mt-4 grid grid-cols-1 gap-4">
			{#each photos as photo (photo.id)}
				<PlacePhoto alt={photo.id} src={`${photo.prefix}500x300${photo.suffix}`} />
			{/each}
		</div>
	</div>
</div>
