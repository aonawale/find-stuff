<script lang="ts">
	import Icon from '$lib/components/Icon/index.svelte'
	import TextField from '$lib/components/TextField.svelte'

	export let placeholder = 'Search'
	export let value: string | undefined = undefined
</script>

<div class="relative flex flex-col justify-center">
	<Icon name="search" class="absolute z-10 left-2" />
	<TextField class="pl-8" {placeholder} bind:value on:change />
</div>
