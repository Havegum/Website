<script context="module">
// function getNonce (res) {
// 	let csp = res.headers.get('content-security-policy');
// 	if (!csp) return null;
//
// 	let scriptSrc = csp.split(';').find(s => s.startsWith('script-src'));
// 	if (!scriptSrc) return null;
//
// 	let nonce = scriptSrc.split(' ').find(s => s.startsWith("'nonce-"))
// 	nonce = nonce.replace(/('|nonce-)/g, '');
// 	if (!nonce) return null;
//
// 	return nonce;
// }

export async function preload({ params }) {
	const res = await this.fetch(`blog/${params.slug}.json`);
	const data = await res.json();

	if (res.status === 200) {
		return { slug: params.slug, post: data }; //, nonce: getNonce(res)
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
// export let nonce;

// let scripts;
// onMount(() => {
// 	if (post.scripts) {
// 		let parser = new DOMParser();
// 		let tree = parser.parseFromString(post.scripts.join(''),'text/html');
//
// 		tree.head.childNodes.forEach(child => {
// 			let el = document.createElement('script');
// 			el.src = child.src;
//
// 			if (child.getAttribute('nonce') === nonce) {
// 				scripts.appendChild(el);
// 			}
// 		});
// 	}
// });
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
			<!-- <div bind:this={scripts}></div> -->
		</Text>
	</div>
</Main>


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
