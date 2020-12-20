<script>
export let category = 'primary';
export let outline = false;
export let disabled = false;

$: cat = category && category.toLowerCase();
</script>


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


<style>
button {
  cursor: pointer;
  font-size: 1em;
  font-family: var(--sans);

  display: block;
  border: none;
  background: none;
  text-decoration: none;

  padding: .3em .5em .15em;
  border-radius: 3px;
}

.primary {
  background-color: var(--primary);
  color: var(--button-text);
}

.primary.outline {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.primary:hover, .primary:focus {
  background-color: var(--primary);
  color: var(--button-text);
}


.tertiary {
  background-color: var(--tertiary);
  color: var(--button-text);
}

.tertiary.outline {
  background-color: transparent;
  border: 1px solid var(--tertiary);
  color: var(--tertiary);
}

.tertiary:hover, .tertiary:focus {
  background-color: var(--tertiary);
  color: var(--button-text);
}

button:active {
  font-weight: 600;
}

button:disabled {
  cursor: default;
}
</style>
