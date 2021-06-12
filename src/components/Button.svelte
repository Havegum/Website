<script>
export let category = 'primary';
export let outline = false;
export let disabled = false;

$: cat = category && category.toLowerCase();
</script>


<button type="button"
    class="block border-0 bg-transparent no-underline px-1.5 py-0.5 rounded-sm cursor-pointer"
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


<style>
button {
  font-size: 1em;
}

.primary {
  @apply bg-blue-600 text-white;
}

.primary.outline {
  @apply
    bg-transparent
    border border-solid border-blue-600
    text-blue-600;
}

.primary:hover, .primary:focus, .primary:active {
  @apply bg-blue-600 text-white;
}


.tertiary {
  background-color: var(--red);
  color: var(--white);
}

.tertiary.outline {
  background-color: transparent;
  border: 1px solid var(--red);
  color: var(--red);
}

.tertiary:hover, .tertiary:focus {
  background-color: var(--red);
  color: var(--white);
}

button:active {
  font-weight: 600;
}

button:disabled {
  cursor: default;
}
</style>
