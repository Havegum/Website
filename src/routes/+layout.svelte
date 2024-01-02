<script lang="ts">
import '$lib/assets/global.css';

import { onMount } from 'svelte';

import Nav from '$lib/components/Nav.svelte';
import Footer from '$lib/components/Footer.svelte';

export let segment: string;
$: lang = segment === 'om-meg' ? 'no' : 'en';

let initialized = false;

$: if (initialized) document.documentElement.setAttribute('lang', lang);
onMount(() => (initialized = true));
</script>

<div class="grid gap-3">
  <Nav {segment} {lang} />
  <slot />
  <Footer {lang} />
</div>

<style>
div {
  min-height: 100vh;
  grid-template-columns: 1fr min(800px, 100%) 1fr;
  grid-template-rows: auto 1fr auto;
}

div > :global(*) {
  grid-column: 2 / 3;
}
</style>
