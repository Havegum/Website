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

let initialized = false;
$: if (initialized) document.documentElement.setAttribute('lang', lang);

onMount(() => {
	window.addEventListener('popstate', () => {
		let search = window.location.search;
		if (!search) return lang = 'no';
		let query = search.match(/lang=([^&$]+)/);
		lang = query ? query[1] : 'no';
	});
	initialized = true;
});
</script>

{#if segment === "about"}
	<IllustratedBackground />
{/if}

<Nav {segment} {lang}/>
<slot/>
<Footer {lang}/>


<!-- <style lang="scss">
@import '../profile.scss';
</style> -->
