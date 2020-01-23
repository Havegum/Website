<script>
import { slide } from 'svelte/transition';

import Text from '@/components/Text.svelte';
import Texteditor from '@/components/Texteditor.svelte';
import Button from '@/components/Button.svelte';

let title = '';
let body = '';
let key = '';
let error = '';
let preview = true;
$: slug = title.toLowerCase().replace(/ /g, '-');

async function handleUpload () {
  let response = await fetch(`blog/${slug}.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, key })
  });
  let json = await response.json();
  if (response.status !== 200) return error = json.error;
  body = '';
}
</script>

<svelte:head>
  <title>Create post</title>
</svelte:head>


<div class="main">
  <input id="title" placeholder="Title" type="text" bind:value={title}>
  <Texteditor bind:value={body} />

  <div class="preview">
    {#if body}
      <Button class="small" outline=true on:click={() => preview = !preview}>{preview ? 'Hide' : 'Show'} preview</Button>
      {#if preview}
        <Text>
          {@html body}
        </Text>
      {/if}
    {/if}
  </div>

  <label for="blogpost-key">Key: <input id="blogpost-key" bind:value={key}></label>
  <Button on:click={handleUpload}>Upload</Button>
  {#if error}
    <p transition:slide class="error">Error: {error}</p>
  {/if}
</div>

<style lang="scss">
@import '../../profile.scss';

input {
  background-color: transparent;
  color: $paragraph;
  border: none;
  font-size: 1em;

  width: 100%;
}

#title {
  font-weight: $bold;
  font-size: 2em;
  padding: .125em .2em;
  margin-bottom: .5em;

  &:focus {
    background-color: $secondary;
    color: $darker;
  }
}

#blogpost-key {
  margin-left: .25em;
  color: $primary;
  font-family: $mono;
}

.preview {
  margin: 1em 0;

  :global(.small) {
    font-size: .8em;
  }
}

label {
  margin-bottom: 1em;
  padding: 0 .4em;
  display: flex;
  background-color: $secondary;
}
</style>
