<!-- <script context="module">
export function preload () {}
</script> -->


<script>
import { onMount } from 'svelte';

import Nav from '@/components/Nav.svelte';
import Footer from '@/components/Footer.svelte';
import IllustratedBackground from '@/components/IllustratedBackground.svelte';

export let segment;
$: lang = segment === 'om-meg' ? 'no' : 'en';

let initialized = false;
onMount(() => initialized = true);

$: if (initialized) document.documentElement.setAttribute('lang', lang);
</script>

{#if segment === "about" || segment === "om-meg"}
	<IllustratedBackground />
{/if}

<Nav {segment} {lang}/>
<slot/>
<Footer {lang}/>
