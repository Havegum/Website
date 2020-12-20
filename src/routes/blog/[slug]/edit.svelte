<script context="module">
	export async function preload({ params }) {
		const res = await this.fetch(`blog/${params.slug}.json?dropNonce=true`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>


<script>
import { goto } from '@sapper/app';
import { slide } from 'svelte/transition';

import Text from '@/components/Text.svelte';
import Texteditor from '@/components/Texteditor.svelte';
import Button from '@/components/Button.svelte';

export let post;

let body = post.body;
let key = '';
let error = '';
let title = post.title || '';

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

	goto(`/blog/${json.slug}`);
}

async function handleDelete () {
  let response = await fetch(`blog/${slug}.json`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key })
  });
  let json = await response.json();
  if (response.status !== 200) return error = json.error;
  body = '';

	goto(`/blog`);
}
</script>


<svelte:head>
  <title>Edit "{post.title}"</title>
</svelte:head>


<div class="main">
	<div class="breadcrumb">
	  <a href="blog">blog</a> / <a href='blog/{slug}'>{post.title.toLowerCase()}</a> / <a href="blog/{slug}/edit">edit</a>
	</div>

	<div class="editor">
	  <Texteditor bind:value={body} />
	</div>

	<Text>
	  <h1>{post.title}</h1>
	  {@html body}
	</Text>

	<label for="blogpost-key">Key: <input id="blogpost-key" bind:value={key}></label>
	<Button on:click={handleUpload}>Update</Button>
	<Button on:click={handleDelete} category="tertiary">Delete</Button>
	{#if error}
	  <p transition:slide class="error">Error: {error}</p>
	{/if}
</div>

<style>
.breadcrumb {
	margin-bottom: 1.5em;
	color: var(--primary);
}

.breadcrumb a {
	color: var(--gray);
	text-decoration: none;
}

.breadcrumb a:hover, .breadcrumb a:focus {
	text-decoration: underline;
}

.editor {
	margin-bottom: 1em;
}

input {
	background-color: transparent;
	color: var(--paragraph);
	border: none;
	font-size: 1em;
	width: 100%;
}

#blogpost-key {
	margin-left: .25em;
	color: var(--primary);
	font-family: var(--mono);
}

label {
	margin-bottom: 1em;
	padding: 0 .4em;
	display: flex;
	background-color: var(--secondary);
}
</style>
