<script>
import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

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
			duration: 10,
			easing: quintOut,
			css: t => `
				transform: ${transform} scaleX(${t});
				opacity: ${t}
			`
		};
	}
});
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
	color: $paragraph;
	text-decoration: none;
	padding: 1em 0.5em;
	display: block;

	font-variation-settings: 'wght' 400;

	transition:
		font-variation-settings 200ms ease-out,
		font-weight 200ms ease-out,
		color 100ms ease-out;

	&.selected {
		position: relative;
	}

	&:hover, &:focus {
		color: $lightgray;
		font-variation-settings: 'wght' 650;
		outline: none;
	}

	&:active {
		color: $primary;
	}
}

.scrubber {
	background-color: $lightgray;
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
</style>
