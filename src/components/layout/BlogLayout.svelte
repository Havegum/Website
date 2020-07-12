<script>
import { onMount } from 'svelte';
import Main from '@/components/layout/Main.svelte';
import Text from '@/components/Text.svelte';

let segments = [];
const buildPath = i => {
  if (i === 0) return segments[i];
  else return buildPath(i - 1) + '/' + segments[i];
};

onMount(() => {
  segments = window.location.pathname.slice(1).split('/');
});
</script>


<Main background="light">
  <div class="breadcrumb">
    {#each segments as path, i}
			<a href={buildPath(i)}>{path}</a> {#if i < segments.length - 1}<span> / </span>{/if}
    {/each}
  </div>

	<Text>
    <slot/>
	</Text>
</Main>


<!-- NOTE: using sass results in weird behaviour -->
<!-- It won't compile on `sapper dev`, -->
<!-- but if file is originally pure css, then sass is added, it works ... -->

<!-- <style lang="scss"> -->
<!-- @import '../../profile.scss'; -->
<style>
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
</style>
