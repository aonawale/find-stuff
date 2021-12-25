<script lang="ts">
	import '../app.css'
	import SearchBar from '$lib/components/SearchBar.svelte'
</script>

<div class="container mx-auto py-4 overflow-hidden">
	<SearchBar />
</div>

<slot />
