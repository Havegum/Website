<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
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
import Text from '@/components/Text.svelte';
export let slug;
export let post;
</script>


<svelte:head>
	<title>{post.title}</title>
</svelte:head>


<div class='content'>
	<div class="breadcrumb">
		<a href="blog">blog</a> / <a href='blog/{slug}'>{post.title.toLowerCase()}</a>
	</div>
	<Text>
		<h1>{post.title}</h1>
		{@html post.body}
	</Text>
</div>


<style lang="scss">
@import '../../../profile.scss';

.breadcrumb {
	margin-bottom: 1.5em;
	color: $primary;

	a {
		color: $gray;
		text-decoration: none;

		&:hover, &:focus {
			text-decoration: underline;
		}
	}
}

.content :global(h2) {
	font-size: 1.4em;
	font-weight: 500;
}

.content :global(pre) {
	/* background-color: #f9f9f9; */
	/* box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05); */
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
