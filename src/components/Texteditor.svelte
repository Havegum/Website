<script>
import { onMount } from 'svelte';
import pell from 'pell';
// TODO:
// Use showdown and edit in markdown instead ...
// Convert to HTML on save, convert back when editing

export let value;

let element;

onMount(() => {
  pell.init({
    element,
    onChange: html => value = html
  })
});
</script>

<div class="texteditor">
  <div bind:this={element}></div>
</div>

<style lang="scss">
@import '../profile.scss';

:global(.texteditor) {
  @import '../../node_modules/pell/src/pell';
}

:global(.pell-actionbar) {
  display: flex;
}

:global(.pell-content) {
  border-bottom: 2px solid $secondary-dark;
  margin-bottom: 1em;

  blockquote {
    color: $primary;
  }
}

div {
  width: 100%;
  min-height: 10em;
}
</style>
