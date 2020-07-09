<script>
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';
import { goto } from '@sapper/app';

export let segment;
export let lang = 'no';

$: langQuery = (lang && lang !== 'no' ? '?lang=' + lang : '');

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
				opacity: ${t}
			`
		};
	}
});

function changeLanguage () {
	let loc = window.location.pathname
	if (lang !== 'en') loc += '?lang=en';
	goto(loc);
	window.dispatchEvent(new Event('popstate'));
}
</script>

<nav>
	<ul on:mouseout={timeout}>
		<li>
			<a  class:selected='{segment === "about"}'
					on:mouseover={focus('about')}
					on:focus={focus('about')}
					on:blur={timeout}
					href='about{langQuery}'
			>
				{lang === 'en' ? 'About me' : 'Om meg'}
			</a>
			{#if target === "about"}
				<div class="scrubber" in:receive={scrub} out:send={scrub}></div>
			{/if}
		</li>

		<li>
			<a  class:selected='{segment === "blog"}'
					on:mouseover={focus('blog')}
					on:focus={focus('blog')}
					on:blur={timeout}
					href='blog{langQuery}'
			>
				Blog{lang === 'en' ? '' : 'g'}
			</a>
			{#if target === "blog"}
				<div class="scrubber" in:receive={scrub} out:send={scrub}></div>
			{/if}
		</li>

		{#if segment === 'create'}
			<li>
				<a  class:selected='{segment === "create"}'
						on:mouseover={focus('create')}
						on:focus={focus('create')}
						on:blur={timeout}
						href='create{langQuery}'
				>
					Create
				</a>
				{#if target === "create"}
					<div class="scrubber" in:receive={scrub} out:send={scrub}></div>
				{/if}
			</li>
		{/if}
	</ul>

	<button role="button" aria-label={lang === 'en' ? 'Bytt til norsk' : 'View site in english'} on:click={changeLanguage}>{lang === 'en' ? 'Norsk' : 'English'}</button>
</nav>

<style lang="scss">
@import '../profile.scss';

nav {
	padding: 0 1em;
}

ul {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin: 0;
}

li {
	display: block;
	position: relative;
}

a {
	color: $darker;
	text-decoration: none;
	padding: 1em 0.5em;
	display: block;

	font-weight: 400;
	transition:
		font-weight 100ms ease-out,
		color 50ms ease-out;

	&.selected {
		position: relative;
	}

	&:hover, &:focus {
		color: $primary;
		font-weight: 850;
		outline: none;

		transition:
			font-weight 150ms ease-out,
			color 100ms ease-out;
	}

	&:active {
		color: $primary-dark;
		font-weight: 700;

		transition:
			font-weight 50ms ease-out,
			color 50ms ease-out;
	}
}

.scrubber {
	background-color: $gray;
}

.selected::after {
	background-color: $primary;
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

button {
	color: $primary;
	position: absolute;
	right: 1.45em;
	top: 1.45em;
	font-size: .85em;
}
</style>
