<script>
// import { onMount } from 'svelte';
import Main from '@/components/layout/Main.svelte';
import Text from '@/components/Text.svelte';
//
// let path = [];
// const buildPath = i => {
//   if (i === 0) return path[i];
//   else return buildPath(i - 1) + '/' + path[i];
// };
//
// onMount(() => {
//   path = window.location.pathname.slice(1).split('/');
// });
</script>


<Main background="light">
  <!-- <div class="breadcrumb">
    {#each path as path, i}
      <a href={buildPath(i)}>{path}</a> / <span/>
    {/each}
  </div> -->

	<Text>
    <slot/>
	</Text>
</Main>


<!-- <style lang="scss"> -->
<!-- @import '../../profile.scss'; -->
<!-- <style>
.breadcrumb {
	margin-bottom: 1.5em;
	color: $primary;

	/* a {
		color: $gray;
		text-decoration: none;

		&:hover, &:focus {
			text-decoration: underline;
		}
	} */
}
</style> -->
