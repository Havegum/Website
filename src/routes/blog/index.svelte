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
import { send, receive } from '@/util/blogTransition.js';
import Post from './adfontes-csp.svx';
import BlogListing from '@/components/layout/BlogListing.svelte';
import Main from '@/components/layout/Main.svelte';

export let posts;

let textHeight = null;
$: init = textHeight !== null;
let transition = true;

$: height = !init ? 'auto' : transition ? 0 : `${textHeight}px`;
</script>


<svelte:head>
	<title>Blog | Halvard Vegum</title>
</svelte:head>


<Main padding={!transition}>
	<div style="margin-bottom: {height}">
		<ol
			class="posts"
			class:transition
			bind:clientHeight={textHeight}
		>
		  {#each posts as post}
				<li
					in:receive={{ key: post.slug }}
					out:send={{ key: post.slug }}
				>
					<BlogListing
			      class="showcase-item"
			      title="{post.title}"
			      href="blog/{post.slug}"
					/>
				</li>
		  {/each}
		</ol>
	</div>
</Main>

<!-- <Post /> -->


<style lang="scss">
@import '../../profile.scss';

div {
	position: relative;
}

.posts {
	position: absolute;
	width: 100%;
	padding-bottom: 1em;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(auto, 17em));
	justify-content: center;
	list-style: none;
	gap: 1em;
	top: 1em;

	&.transition {
		top: 2em;
	}
}

li {

}
</style>
