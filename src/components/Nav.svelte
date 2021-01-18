<script>
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
import { goto } from '@sapper/app';

export let segment;
export let lang = 'no';

$: langPrefix = (lang && lang !== 'no' ? lang + '/' : '');

let target = segment;
let targetTimeout;

const scrub = { key: 'scrubber' };

function timeout (set) {
	targetTimeout && clearTimeout(targetTimeout);
	targetTimeout = setTimeout(() => target = segment, 200);
}

function focus (id) {
	return function () {
		target = id;
		targetTimeout && clearTimeout(targetTimeout);
	}
}

const [send, receive] = crossfade({
	duration: 200,
	easing: quintOut,

	fallback(node, params) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 50,
			easing: quintOut,
			css: t => `
				transform: ${transform} scaleX(${t});
				opacity: ${t};`
		};
	}
});
</script>


<nav class="py-0">
	<ul class="flex flex-row justify-center p-0 m-0" on:mouseout={timeout}>
		<li>
			<a
				class:selected='{segment === "about" | segment === 'om-meg'}'
				on:mouseover={focus('about')}
				on:focus={focus('about')}
				on:blur={timeout}
				href='{lang === 'en' ? 'about' : 'om-meg'}'
			>
				<p class="m-0 invisible font-extrabold">{lang === 'en' ? 'About me' : 'Om meg'}</p>
				<p class="m-0 absolute top-1/2 left-0 right-0 text-center transform -translate-y-1/2">{lang === 'en' ? 'About me' : 'Om meg'}</p>
			</a>
			{#if target === "about" || target === 'om-meg'}
				<div class="scrubber" in:receive={scrub} out:send={scrub}/>
			{/if}
		</li>

		<li>
			<a
				class:selected='{segment === "blog"}'
			 	on:mouseover={focus('blog')}
			 	on:focus={focus('blog')}
			 	on:blur={timeout}
			 	href='blog'
			>
				<p class="m-0 invisible font-extrabold">{lang === 'en' ? 'Blog' : 'Blogg'}</p>
				<p class="m-0 absolute top-1/2 left-0 right-0 text-center transform -translate-y-1/2">{lang === 'en' ? 'Blog' : 'Blogg'}</p>
			</a>
			{#if target === "blog"}
				<div class="scrubber" in:receive={scrub} out:send={scrub}/>
			{/if}
		</li>
	</ul>
</nav>


<style>
li {
	@apply relative block;
}

a {
	@apply text-gray-900 no-underline py-4 px-2 block font-normal relative;
	transition: font-weight 100ms ease-out, color 50ms ease-out;
}

a.selected {
	position: relative;
}

a:hover, a:focus {
	color: var(--blue-700);
	font-weight: 850;
	outline: none;

	transition:
		font-weight 150ms ease-out,
		color 100ms ease-out;
}

a:active {
	color: var(--blue-700);
	font-weight: 700;

	transition:
		font-weight 50ms ease-out,
		color 50ms ease-out;
}

.scrubber {
	background-color: var(--gray-700);
}

.selected::after {
	background-color: var(--blue-700);
	z-index: 1;
	content: '';
}

.scrubber,
.selected::after {
	display: block;
	height: 3px;

	position: absolute;
	left: .5em;
	right: .5em;
	bottom: 0;
}
</style>
