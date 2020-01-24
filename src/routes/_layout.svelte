<script context="module">
export function preload({ query }) {
	return query || {};
}
</script>

<script>
import { onMount } from 'svelte';

import Nav from '@/components/Nav.svelte';
import Footer from '@/components/Footer.svelte';

export let segment;
export let lang = 'no';
$: lang = lang.trim().toLowerCase() === 'en' ? 'en' : 'no';

onMount(() => {
	window.addEventListener('popstate', () => {
		let search = window.location.search;
		if (!search) return lang = 'no';
		let query = search.match(/lang=([^&$]+)/);
		lang = query ? query[1] : 'no';
	});
});
</script>


<div class="background">
	<img class="sky" src="sky.png" role="presentation" alt=""/>
	<img class="left shoulder" src="left-shoulder.png" role="presentation" alt=""/>
	<img class="right shoulder" src="right-shoulder.png" role="presentation" alt=""/>
	<img class="ground" src="ground.svg" role="presentation" alt=""/>
	<img class="footer-hat" src="footer-hat.svg" role="presentation" alt=""/>
</div>

<Nav {segment} {lang}/>
<main {lang} >
	<slot/>
</main>
<Footer {lang}/>


<style lang="scss">
@import '../profile.scss';

.background {
	background: $secondary;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
	z-index: -1;

	img {
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		object-fit: none;
	}

	.sky {
		background-color: $light;
		object-position: top center;
		height: 27em;
	}

	.shoulder {
		width: 40%;
		height: 100%;
		&.left {
			object-position: top right;
			right: 60%;
		}
		&.right {
			object-position: top left;
			left: 60%;
		}
	}

	.ground {
		top: 543px;
		object-position: center top;
		height: 100%;
		min-height: 5em;
		max-height: 20em;
		object-fit: cover;
	}

	.footer-hat {
		top: auto;
		bottom: 9em;
		object-position: center bottom;
		height: 100%;
		min-height: 5em;
		max-height: 5vh;
		object-fit: cover;
		display: none;

		@media screen and (min-height: 900px) { display: block }
	}
}

:global(#sapper) {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	position: relative;
}

main {
	flex-grow: 1;
	align-self: center;
	width: 100%;
	max-width: 47em;

	display: flex;
	flex-direction: column;

	z-index: 0;

	:global(.main) {
		flex-grow: 1;
		padding: 1em;
		position: relative;
		background-color: $lighter;
	}

	@media screen and (min-width: $mobile) {
		:global(.main) { padding: 2em }
	}
}
</style>
