<script lang="ts">
	let className: string = undefined
	export { className as class }
</script>

<button
	type="button"
	class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 {className}"
	on:click
>
	<slot />
</button>
