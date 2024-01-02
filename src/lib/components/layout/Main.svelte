<script lang="ts">
export let background: string | boolean = true;
export let padding: string | boolean = true;
export let transitionIn = () => {};
export let transitionOut = () => {};
</script>

<main
  class="mx-auto w-full h-full max-w-3xl row-start-2 row-end-3 col-span-full"
  class:bg-white-100={background && background !== 'light'}
  class:bg-white={background === 'light'}
  class:p-4={padding}
  in:transitionIn
  out:transitionOut
>
  <slot />
</main>
