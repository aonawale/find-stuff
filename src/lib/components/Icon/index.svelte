<script context="module" lang="ts">
	import iconsMap from './icons'

	export type IconName = keyof typeof iconsMap

	const icons = Object.entries(iconsMap).reduce(
		(accum, [name, svg]) => ({ ...accum, [name]: { box: 24, name, svg } }),
		{}
	)
</script>

<script lang="ts">
	export let name: IconName
	export let width = '24px'
	export let height = '24px'
	let className: string = undefined
	export { className as class }

	const icon = icons[name]
</script>

{#if icon}
	<svg class={className} {width} {height} viewBox="0 0 {icon.box} {icon.box}">{@html icon.svg}</svg>
{/if}
