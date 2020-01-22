<script>
export let category = 'primary';
export let outline = false;
export let disabled = false;

$: cat = category && category.toLowerCase();

</script>

<style lang="scss">
@import '../profile.scss';

button {
  cursor: pointer;
  font-size: 1em;
  font-family: $sans;

  display: block;
  border: none;
  background: none;
  text-decoration: none;

  padding: .3em .5em .15em;
  border-radius: 3px;

  &.primary {
    background-color: $primary;
    color: $button-text;

    &.outline {
      background-color: transparent;
      border: 1px solid $primary;
      color: $primary;

      &:hover, &:focus {
        background-color: $primary;
        color: $button-text;
      }

      &:active {
        font-weight: 600;
      }
    }
  }
}

button:disabled {
  cursor: default;
  // TODO: style
}


</style>


<button type="button"
    class="{$$props.class}"
    on:click
    {disabled}
    class:primary={cat === 'primary'}
    class:secondary={cat === 'secondary'}
    class:tertiary={cat === 'tertiary'}
    class:outline={!!outline}
    class:disabled
    >
  <slot>
    Button
  </slot>
</button>
