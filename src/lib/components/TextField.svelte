<script lang="ts">
  export let multiline = false
  export let label: string | undefined = undefined
  export let rows: number | undefined = undefined
</script>

<label>
  {#if label}{label}{/if}
  {#if multiline}
    <textarea on:change {rows} />
  {:else}
    <input on:change />
  {/if}
</label>

<style>

</style>
