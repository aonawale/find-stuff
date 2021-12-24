<script lang="ts">
	import Icon, { IconName } from '$lib/components/Icon/index.svelte'

	export let icon: IconName
</script>

<button class="rounded-full p-2 shadow-md hover:bg-slate-400 focus:outline-none" on:click>
	<Icon name={icon} />
</button>
