<script>
import { onMount } from 'svelte';
import pell from 'pell';

let element;

onMount(() => {
  pell.init({
    element,
    onChange: html => console.log(html)
  })
});
</script>

<!-- <svelte:head>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/pell/dist/pell.min.css">
</svelte:head> -->

<div class="texteditor" bind:this={element}></div>

<style lang="scss">
@import '../profile.scss';

:global(.texteditor) {
  @import '../../node_modules/pell/src/pell';
}

:global(.pell-actionbar) {
  display: flex;
}

:global(.pell-content) {
  blockquote {
    color: $primary;
  }
}

div {
  width: 100%;
  min-height: 10em;
}
</style>
