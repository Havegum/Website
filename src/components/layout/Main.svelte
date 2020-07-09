<script>
export let background = true;
export let padding = true;
</script>

<main class:background class:padding>
  <slot></slot>
</main>

<style lang="scss">
@import '../../profile.scss';

main {
  width: 100%;
  max-width: 47em;
  margin: 0 auto;
}

.background {
  background-color: $lighter;
}

.padding {
  padding: 1em;
}
</style>
