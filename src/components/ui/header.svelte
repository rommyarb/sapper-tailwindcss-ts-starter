<script lang="ts">
  const links = [
    { href: '/mdsvex', text: 'Markdown' },
    { href: '/example-page-1', text: 'Example 1' },
    { href: '/example-page-2', text: 'Example 2' },
    { href: '/example-page-3', text: 'Example 3' }
  ]
</script>

<header class="shadow-md bg-white">
  <nav class="container max-w-full md:flex md:flex-row md:justify-between">
    <div class="h-16 p-4 flex gap-3 items-center">
      <img src="images/logo.png" class="h-full object-contain" alt="" />
      <a href="/" class="text-center text-xl ml-2 text-primary flex-no-wrap">Sapper<span
          class="text-black">+</span><span class="text-teal-600">TailwindCSS</span></a>
    </div>

    <ul class="list-none flex justify-between items-center">
      {#each links as { href, text }}
        <li class="m-4 text-teal-700"><a {href}>{text}</a></li>
      {/each}
    </ul>
  </nav>
</header>
