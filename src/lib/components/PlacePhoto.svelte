<script lang="ts">
	export let src: string
	export let alt: string
</script>

<img {src} {alt} class="w-full rounded-2xl aspect-auto" />
<!-- <div style="background-image: src({src});" class="w-full h-52" /> -->
