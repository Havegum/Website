<script>
import { onMount } from 'svelte';
import Main from '@/components/layout/Main.svelte';
import Text from '@/components/Text.svelte';
import { send, receive } from '@/util/blogTransition.js';


export let title;
export let slug;
let postedString, modifiedString;
export { postedString as posted };
export { modifiedString as modified };

let posted = new Date(postedString);
let modified = new Date(modifiedString);
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);

function formatDate (date) {
	return `
		${date.toLocaleString('en-GB', { day: 'numeric' })}
		${date.toLocaleString('en-GB', { month: 'long' })},
		${date.toLocaleString('en-GB', { year: 'numeric' })}
	`;
}
</script>

<svelte:head>
	<title>{title} | Halvard Vegum</title>
</svelte:head>

<div class="blog">
	<Main transitionIn={(node) => receive(node, { key: slug })} transitionOut={node => send(node, { key: slug })} background="light">
	  <div class="breadcrumb">
			<a href="blog">blog</a> / <a href='blog/{slug}'>{title}</a>
	  </div>

			<Text>
				<section class="meta">
					<p class="timestamp">
						Published <time>{formatDate(posted)}</time>
						{#if modified > posted}
							<span class="modified">(modified {formatDate(modified)})</span>
						{/if}
					</p>
					<hr/>

					{#if lastYear > modified}
					<div class="warn-outdate">
						<strong>Note:</strong> This post is more than one year old.
					</div>
					{/if}
				</section>

				<h1 class="title">{title}</h1>
		    <slot/>
			</Text>
	</Main>
</div>


<!-- NOTE: using sass results in weird behaviour -->
<!-- It won't compile on `sapper dev`, -->
<!-- but if file is originally pure css, then sass is added, it works ... -->

<!-- <style lang="scss"> -->
<!-- @import '../../profile.scss'; -->
<style>
.blog {
	grid-row: 2;
	grid-column: 1;
	width: 100%;
	max-width: 47em;
	margin: 0 auto;
	height: 0;
	overflow: visible;
}

.breadcrumb {
	margin-bottom: 1.5em;
	color: var(--primary);
}

a {
	color: var(--gray);
	text-decoration: none;
}

a:hover,
a:focus {
	text-decoration: underline;
}

.meta {
	margin-bottom: 2em;
}

.meta p {
	margin-bottom: 0;
}

.timestamp {
	font-size: .85em;
}

.timestamp .modified {
	margin-left: 1em;
	font-style: italic;
}

hr {
	border: none;
	border-top: 1px dashed var(--lightgray);
}

.warn-outdate {
	border: 1px solid var(--tertiary);
	color: var(--tertiary);
	padding: 1em;
	margin-top: 1em;
}
</style>
