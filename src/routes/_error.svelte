<script lang="ts">
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="text-center mt-20">
  <div class="text-6xl font-bold">-== {status} ==-</div>
  <div class="text-lg text-primary">{error.message}</div>

  {#if status === 404}
    <div class="text-sm">Cannot find page that you are looking for.</div>
  {/if}

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
