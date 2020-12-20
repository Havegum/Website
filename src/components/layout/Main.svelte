<script>
export let background = true;
export let padding = true;
export let transitionIn = () => {};
export let transitionOut = () => {};
</script>

<main
  class:background
  class:light={background === 'light'}
  class:padding
  in:transitionIn
  out:transitionOut
>
  <slot></slot>
</main>


<style>
main {
  grid-row: 2;
  grid-column: 1;
  height: 100%;
  width: 100%;
  max-width: 47em;
  margin: 0 auto;
}

.background {
  background-color: var(--light);
}

.light {
  background-color: var(--lighter);
}

.padding {
  padding: 1em;
}
</style>
