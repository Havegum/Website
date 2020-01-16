<script>
import { onMount } from 'svelte';
import showdown from 'showdown';

export let value;

let markdown = '';
let converter;

onMount(() => {
  converter = new showdown.Converter();
  if (value) markdown = converter.makeMarkdown(value);
});

$: if (converter) value = converter.makeHtml(markdown);
</script>

<textarea bind:value={markdown}></textarea>
