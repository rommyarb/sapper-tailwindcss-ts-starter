<script>
  import { onMount } from 'svelte'
  import SEO from '~/components/seo.svelte'
  import { fade, draw } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { expand } from '~/utils/custom-transition.ts'

  const title = 'Home'
  const inner = `M45.41,108.86A21.81,21.81,0,0,1,22,100.18,20.2,20.2,0,0,1,18.53,84.9a19,19,0,0,1,.65-2.57l.52-1.58,1.41,1a35.32,35.32,0,0,0,10.75,5.37l1,.31-.1,1a6.2,6.2,0,0,0,1.11,4.08A6.57,6.57,0,0,0,41,95.19a6,6,0,0,0,1.68-.74L70.11,76.94a5.76,5.76,0,0,0,2.59-3.83,6.09,6.09,0,0,0-1-4.6,6.58,6.58,0,0,0-7.06-2.62,6.21,6.21,0,0,0-1.69.74L52.43,73.31a19.88,19.88,0,0,1-5.58,2.45,21.82,21.82,0,0,1-23.43-8.68A20.2,20.2,0,0,1,20,51.8a19,19,0,0,1,8.56-12.7L56,21.59a19.88,19.88,0,0,1,5.58-2.45A21.81,21.81,0,0,1,85,27.82,20.2,20.2,0,0,1,88.47,43.1a19,19,0,0,1-.65,2.57l-.52,1.58-1.41-1a35.32,35.32,0,0,0-10.75-5.37l-1-.31.1-1a6.2,6.2,0,0,0-1.11-4.08,6.57,6.57,0,0,0-7.06-2.62,6,6,0,0,0-1.68.74L36.89,51.06a5.71,5.71,0,0,0-2.58,3.83,6,6,0,0,0,1,4.6,6.58,6.58,0,0,0,7.06,2.62,6.21,6.21,0,0,0,1.69-.74l10.48-6.68a19.88,19.88,0,0,1,5.58-2.45,21.82,21.82,0,0,1,23.43,8.68A20.2,20.2,0,0,1,87,76.2a19,19,0,0,1-8.56,12.7L51,106.41a19.88,19.88,0,0,1-5.58,2.45`
  const outer = `M65,34 L37,52 A1 1 0 0 0 44 60 L70.5,44.5 A1 1 0 0 0 65,34Z M64,67 L36,85 A1 1 0 0 0 42 94 L68,77.5 A1 1 0 0 0 64,67Z`
  let iconVisible = false

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
  <div class="text-center mt-6">
    {#if iconVisible}
      <div class="w-20 md:w-32 inline-block">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124" id="svelte-logo">
            <g out:fade={{ duration: 200 }}>
              <path
                in:expand={{ duration: 400, delay: 1000, easing: quintOut }}
                class="text-primary stroke-current fill-current stroke-50"
                d={outer} />
              <path in:draw={{ duration: 1000 }} class="text-primary stroke-current stroke-1" fill="white" d={inner} />
            </g>
          </svg>
        </div>
      </div>
    {/if}

    <div class="text-xl md:w-1/2 md:text-4xl mt-5 mx-auto">
      Hello, you are using
      <span class="text-primary">Sapper</span>
      +
      <span class="text-teal-600">TailwindCSS</span>
      with
      <strong class="text-blue-700">TypeScript</strong>.
    </div>
    <div class="mt-4 text-3xl md:mt-0 md:text-6xl">🎉🎉🎉</div>
  </div>
</section>
