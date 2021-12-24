<script lang="ts">
	let className: string | undefined = undefined
	export { className as class }
</script>

<div class="overflow-hidden rounded-2xl relative shadow-md {className}" on:click>
	<slot />
</div>
