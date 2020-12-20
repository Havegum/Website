<script>
import Main from '@/components/layout/Main.svelte';
import Text from '@/components/Text.svelte';
import { fade } from 'svelte/transition';
import { send as sendFunc, receive as receiveFunc } from '@/util/blogTransition.js';

export let title;
export let slug;
let postedString, modifiedString;
export { postedString as posted };
export { modifiedString as modified };

let outroIsNotBlog = false;
let scrollY = 0;
$: send = node => sendFunc(node, { key: slug, scrollY });
$: receive = node => receiveFunc(node, { key: slug, scrollY });

let posted = new Date(postedString);
let modified = new Date(modifiedString);
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);

function formatDate (date) {
	return `
		${date.toLocaleString('en-GB', {   day: 'numeric' })}
		${date.toLocaleString('en-GB', { month: 'long'    })},
		${date.toLocaleString('en-GB', {  year: 'numeric' })}
	`;
}

function handleOutroStart () {
	outroIsNotBlog = window.location.pathname !== '/blog'
}
</script>

<svelte:window bind:scrollY/>

<svelte:head>
	<title>{title} | Halvard Vegum</title>
</svelte:head>

<div
	class="blog"
	class:hidden={outroIsNotBlog}
	out:fade={{ delay: 400, duration: 200 }}
	on:outrostart={handleOutroStart}
>
	<Main background="light">
		<div in:fade={{ duration: 200 }}>
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
		</div>
	</Main>

	<svg class="clipper">
		<defs>
			<clipPath id="clipper">
				<rect
					class="clip-rect"
					in:receive
					out:send
				/>
			</clipPath>
		</defs>
	</svg>
</div>


<!-- NOTE: using sass results in weird behaviour -->
<!-- It won't compile on `sapper dev`, -->
<!-- but if file is originally pure css, then sass is added, it works ... -->
<style>
.blog {
	grid-row: 2;
	grid-column: 1;
	width: 100%;
	max-width: 47em;
	margin: 0 auto;
	overflow: visible;
	position: relative;
	z-index: 1;
	clip-path: url(#clipper);
}

.blog.hidden {
	display: none;
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

.clipper {
	display: block;
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.clip-rect {
	x: 0;
	y: 0;
	width: 100%;
	height: 100%;
}
</style>
