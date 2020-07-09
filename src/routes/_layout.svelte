<script context="module">
export function preload({ query }) {
	return query || {};
}
</script>

<script>
import { onMount } from 'svelte';

import Nav from '@/components/Nav.svelte';
import Footer from '@/components/Footer.svelte';
import IllustratedBackground from '@/components/IllustratedBackground.svelte';

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

{#if segment === "about"}
	<IllustratedBackground />
{/if}

<Nav {segment} {lang}/>
<!-- <main {lang} > -->
<slot/>
<!-- </main> -->
<Footer {lang}/>


<style lang="scss">
@import '../profile.scss';

// :global(#sapper) {
// 	display: flex;
// 	flex-direction: column;
// 	min-height: 100vh;
// 	position: relative;
// }

main {
	grid-row-start: 2;
	grid-column-start: 2;
	// flex-grow: 1;
	// align-self: center;
	width: 100%;
	max-width: 47em;

	// display: flex;
	// flex-direction: column;

	z-index: 0;

	// :global(.main) {
	// 	flex-grow: 1;
	// 	padding: 1em;
	// 	position: relative;
	// 	background-color: $lighter;
	// }
	//
	// @media screen and (min-width: $mobile) {
	// 	:global(.main) { padding: 2em }
	// }
}
</style>
