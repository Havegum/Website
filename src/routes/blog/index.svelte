<script context="module">
export async function preload({ params, query }) {
	const res = await this.fetch(`blog.json`);
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
<title>Blog | Halvard Vegum</title>
</svelte:head>

<div>
{#await posts then post}
  {#each posts as post}
		<Showcase
        class="showcase-item"
        let:hover
        title="{post.title}"
        href="blog/{post.slug}">
		</Showcase>
  {/each}
{/await}
</div>

<style lang="scss">
@import '../../profile.scss';

div {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>
