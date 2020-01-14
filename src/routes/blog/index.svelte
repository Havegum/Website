<script context="module">
export async function preload({ params, query }) {
	const res = await this.fetch(`blog/posts.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { posts: data };
	} else {
		this.error(res.status, data.message);
	}
}
</script>

<script>
// import Text from '@/components/Text.svelte';
import Showcase from '@/components/Showcase.svelte';

export let posts;
</script>

<svelte:head>
<title>Blog</title>
</svelte:head>

<div>
{#await posts then post}
  {#each posts as post}
		<Showcase
        class="showcase-item"
        let:hover
        lead="{post.title}"
        href="blog/{post.slug}">
		</Showcase>
  {/each}
{/await}
</div>

<style lang="scss">
@import '../../profile.scss';

a {
  display: block;
}
</style>
