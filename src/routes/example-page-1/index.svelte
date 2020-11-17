<script>
  import SEO from '~/components/seo.svelte'
  import BoxLearning from '~/components/ui/box-learning.svelte'
  import learnings from './_data.yml'
</script>

<SEO title="Materi Pembelajaran" />

<section class="container prose prose-lg bg-gray-100 min-h-screen py-10 mt-1">
  <header class="text-center">
    <span class="uppercase">Currently learning Svelte?</span>
    <h2 class="heading">Check out some materials:</h2>
  </header>

  <section class="grid grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3">
    {#each learnings as learning}
      <BoxLearning {...learning} />
    {/each}
  </section>
</section>
