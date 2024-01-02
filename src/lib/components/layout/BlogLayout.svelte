<script>
import Main from '$lib/components/layout/Main.svelte';
import Text from '$lib/components/Text.svelte';
import { fade } from 'svelte/transition';
import { send as sendFunc, receive as receiveFunc } from '$lib/util/blogTransition.js';

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
		${date.toLocaleString('en-GB', {  year: 'numeric' })}`;
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
	class="blog w-full max-w-3xl mx-auto overflow-visible relative z-1"
	class:hidden={outroIsNotBlog}
	out:fade={{ delay: 400, duration: 200 }}
	on:outrostart={handleOutroStart}
>
	<Main background="light">
		<div in:fade={{ duration: 200 }}>
		  <div class="breadcrumb mb-6 text-blue-500">
				<a href="blog">blog</a> / <a href='blog/{slug}'>{title}</a>
		  </div>

			<Text>
				<section class="mb-8">
					<p class="m-0 text-sm">
						Published <time>{formatDate(posted)}</time>
						{#if modified > posted}
							<span class="italic ml-2">(modified {formatDate(modified)})</span>
						{/if}
					</p>
					<hr class="borded-0 border-t-1 border-dashed border-gray-400"/>

					{#if lastYear > modified}
						<div class="warn-outdate rounded-sm">
							<strong class="text-green-500">Note:</strong> This post is more than one year old.
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


<style lang="postcss">
.blog {
	grid-row: 2;
	grid-column: 1;
	clip-path: url(#clipper);
}

a {
	@apply text-gray-600 no-underline;
}

a:hover,
a:focus {
	@apply underline;
}


.warn-outdate {
	border: 1px solid var(--green-200);
	color: var(--gray-800);
	background-color: var(--green-50);
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
