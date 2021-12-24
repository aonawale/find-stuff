<script lang="ts">
	export let multiline = false
	export let label: string | undefined = undefined
	export let rows: number | undefined = undefined
	export let placeholder: string | undefined = undefined
	export let value: string | undefined = undefined
	let className: string = undefined
	export { className as class }

	const classes =
		'appearance-none relative block w-full px-4 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="z-0">
	{#if label}{label}{/if}
	{#if multiline}
		<textarea class="{classes} {className}" {rows} {placeholder} bind:value on:change />
	{:else}
		<input class="{classes} {className}" {placeholder} bind:value on:change />
	{/if}
</label>
