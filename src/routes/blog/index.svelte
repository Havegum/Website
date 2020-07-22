<script context="module">
export async function preload({ params }) {
	const res = await this.fetch(`./blog.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { posts: data };
	} else {
		this.error(res.status, data.message);
	}
}
</script>


<script>
import BlogListing from '@/components/layout/BlogListing.svelte';
import Main from '@/components/layout/Main.svelte';
export let posts;
</script>


<svelte:head>
<title>Blog | Halvard Vegum</title>
</svelte:head>


<Main>
	<ol class="posts">
	  {#each posts as post}
			<li>
				<BlogListing
		      class="showcase-item"
		      title="{post.title}"
		      href="blog/{post.slug}"
				/>
			</li>
	  {/each}
	</ol>
</Main>


<style lang="scss">
@import '../../profile.scss';

.posts {
	margin-top: 1em;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(auto, 17em));
	gap: 1em;
	justify-content: center;
	list-style: none;
}
</style>
