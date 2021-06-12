<script context="module">
export async function preload({ params }) {
	const res = await this.fetch(`blog/${params.slug}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { slug: params.slug, post: data };
	} else {
		this.error(res.status, data.message);
	}
}
</script>

<script>
import { onMount } from 'svelte';
import Text from '@/components/Text.svelte';
import Main from '@/components/layout/Main.svelte';
export let slug;
export let post;
</script>


<svelte:head>
	<title>{post.title} | Halvard Vegum</title>
</svelte:head>

<Main background="light">
	<div class="main content">
		<div class="breadcrumb">
			<a href="blog">blog</a> / <a href='blog/{slug}'>{post.title.toLowerCase()}</a>
		</div>
		<Text>
			<h1>{post.title}</h1>
			{@html post.body}
		</Text>
	</div>
</Main>


<style>
.breadcrumb {
	margin-bottom: 1.5em;
	color: var(--blue);
}

.breadcrumb a {
	color: var(--gray);
	text-decoration: none;
}

.breadcrumb a:hover,
.breadcrumb a:focus {
	text-decoration: underline;
}

.content :global(h2) {
	font-size: 1.4em;
	font-weight: 500;
}

.content :global(pre) {
	padding: 0.5em;
	border-radius: 2px;
	overflow-x: auto;
}

.content :global(pre) :global(code) {
	background-color: transparent;
	padding: 0;
}

.content :global(ul) {
	line-height: 1.5;
}

.content :global(li) {
	margin: 0 0 0.5em 0;
}
</style>
