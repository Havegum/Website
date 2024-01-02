<script>
import Text from '$lib/components/Text.svelte';
import Main from '$lib/components/layout/Main.svelte';
export let data;
$: html = data.html;


function customCss(node, css) {
	console.log(css);
	const style = document.createElement('style');
	style.innerText = css;
	node.appendChild(style);
}
</script>


<svelte:head>
	<title>{data.title} | Halvard Vegum</title>
</svelte:head>

<Main background="light">
	<div class="main content" use:customCss={data.css}>
		<div class="breadcrumb">
			<a href="/blog">blog</a> / <a href='/blog/{data.slug}'>{data.title.toLowerCase()}</a>
		</div>
		<Text>
			<h1>{data.title}</h1>
			{@html html}
		</Text>
	</div>
</Main>


<style lang="postcss">
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
