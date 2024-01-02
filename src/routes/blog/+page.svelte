<script lang="ts">
import { send, receive } from '$lib/util/blogTransition.js';
import BlogListing from '$lib/components/layout/BlogListing.svelte';
import Main from '$lib/components/layout/Main.svelte';
import type { PageData } from './$types';

export let data: PageData
$: posts = data.posts;
let textHeight = null;
$: init = textHeight !== null;
let transition = true;

$: height = !init ? 'auto' : transition ? 0 : `${textHeight}px`;
</script>


<svelte:head>
	<title>Blog | Halvard Vegum</title>
</svelte:head>

<Main padding={!transition}>
	<div class="relative" style="margin-bottom: {height}">
		<ol
			class="pb-4 list-none w-full grid justify-center gap-4 top-4 posts"
			class:transition
			bind:clientHeight={textHeight}
		>
		  {#each posts as post}
				<li>
					<BlogListing href="blog/{post.slug}">
						<span slot="lead">{post.title}</span>
						<div
							class="absolute inset-0 bg-gray-50 -z-1"
							in:receive={{ key: post.slug }}
							out:send={{ key: post.slug }}
						/>
					</BlogListing>
				</li>
		  {/each}
		</ol>
	</div>
</Main>


<style lang="postcss">
.posts {
	grid-template-columns: repeat(auto-fill, minmax(auto, 17em));
}

.posts.transition {
	top: 2rem;
}
</style>
