<script>
  import { onMount } from 'svelte'
  import SEO from '~/components/seo.svelte'

  const title = 'Home'

  onMount(() => {
    const timeout = setTimeout(() => {
      iconVisible = true
    }, 850)

    return () => {
      clearTimeout(timeout)
    }
  })
</script>

<SEO {title} />

<section>
  <div class="text-center mt-20">
    <div class="text-xl md:text-4xl">
      Hello, you are using
      <span class="text-primary">Sapper</span>
      +
      <span class="text-teal-600">TailwindCSS</span>
      with
      <strong class="text-blue-700">TypeScript</strong>
      template.
    </div>
    <div class="mt-4 text-3xl md:mt-0 md:text-6xl">Have fun! 🎉</div>
  </div>
</section>
