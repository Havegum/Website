<script>
import Texteditor from '@/components/Texteditor.svelte';
import Button from '@/components/Button.svelte';

let title = '';
let body = '';
let key = '';

async function handleUpload () {
  let response = await fetch('create/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, key })
  });

  if (response.status === 200) {
    console.log('OK!');
  }
}
</script>

<svelte:head>
  <title>Create post</title>
</svelte:head>


<div>
  <input id="title" placeholder="Title" type="text" bind:value={title}>
  <Texteditor bind:value={body} />
  <label for="blogpost-key">Key: <input id="blogpost-key" bind:value={key}></label>
  <Button on:click={handleUpload}>Upload</Button>
</div>

<style lang="scss">
@import '../../profile.scss';

input {
  background-color: transparent;
  color: $paragraph;
  border: none;
  font-size: 1em;

  width: 100%;

  &#title {
    font-size: 2em;
    padding: .125em .2em;
    margin-bottom: .5em;

    &:focus {
      background-color: $secondary;
    }
  }

  &#blogpost-key {
    margin-left: .25em;
  }
}

label {
  display: flex;
}
</style>
