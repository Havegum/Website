<script>
import Texteditor from '@/components/Texteditor.svelte';
import Button from '@/components/Button.svelte';
</script>

<svelte:head>
  <title>Create post</title>
</svelte:head>


<div>
  <input id="title" placeholder="Title">
  <Texteditor />
  <label for="blogpost-key">Key: <input id="blogpost-key" type="password"></label>
  <Button>Upload</Button>
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
