<script>
export let category = 'primary';
export let outline = false;
export let disabled = false;
export let href = '';
export let small = false;
</script>

<style lang="scss">
@import '../profile.scss';
button, a {
  display: block;
  border: none;
  background: none;
  text-decoration: none;

  flex-shrink: 0;

  font-family: $sans;
  font-size: 1em;

  &.small { font-size: .8em }

  padding: 3px;

  div {
    padding: .25em .5em;
    border-radius: 3px;
    border: 1px solid;

    transition: color 300ms cubic-bezier(0.23, 1, 0.32, 1),
         border-color 300ms cubic-bezier(0.23, 1, 0.32, 1),
     background-color 300ms cubic-bezier(0.23, 1, 0.32, 1);

    &.primary {
      color: $button-text;
      border-color: $button;
      background-color: $button;
    }

    &.secondary {
      color: $light;
      border-color: $secondary;
      background-color: $secondary;
    }

    &.tertiary {
      color: $light;
      border-color: $tertiary;
      background-color: $tertiary;
    }

    &.disabled {
      color: $lightgray;
      border-color: $light;
      background-color: $light;
    }

    &.outline {
      background: none;

      &.primary { color: $primary }

      &.secondary { color: $secondary }

      &.disabled { color: $lightgray }
    }
  }

  &:not(:disabled) {
    cursor: pointer;

    &:focus {
      // background: $secondary;
      // border-radius: 5px;
      // outline: none;
    }

    &:hover div, &:focus div {
      &.primary {
        color: $light;
        border-color: $primary;
        background-color: $primary;
      }
  //
  //     &.secondary {
  //       color: $light;
  //       border-color: $secondary-light;
  //       background-color: $secondary-light;
  //     }
  //
  //     &.tertiary {
  //       color: $light;
  //       border-color: $tertiary-light;
  //       background-color: $tertiary-light;
  //     }
    }

    &:active div {
      &.primary {
        color: $light;
        border-color: $primary;
        background-color: $primary;
      }
  //
  //     &.secondary {
  //       color: $light;
  //       border-color: $secondary-dark;
  //       background-color: $secondary-dark;
  //     }
  //
  //     &.tertiary {
  //       color: $light;
  //       border-color: $tertiary-dark;
  //       background-color: $tertiary-dark;
  //     }
    }
  }
}


</style>

{#if href}
  <a {href} class:small>
    <div
    class:primary={category.toLowerCase() == 'primary'}
    class:secondary={category.toLowerCase() == 'secondary'}
    class:tertiary={category.toLowerCase() == 'tertiary'}
    class:outline={!!outline}
    class:disabled>
      <slot>
        Link
      </slot>
    </div>
  </a>
{:else}
  <button on:click {disabled} class:small>
    <div
    class:primary={category.toLowerCase() == 'primary'}
    class:secondary={category.toLowerCase() == 'secondary'}
    class:tertiary={category.toLowerCase() == 'tertiary'}
    class:outline={!!outline}
    class:disabled>
      <slot>
        Button
      </slot>
    </div>
  </button>
{/if}
