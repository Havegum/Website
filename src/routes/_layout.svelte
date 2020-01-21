<script context="module">
export function preload({ query }) {
	return query || {};
}
</script>

<script>
import Nav from '@/components/Nav.svelte';
import Footer from '@/components/Footer.svelte';

export let segment;
export let lang = 'no';
$: lang = lang.trim().toLowerCase() === 'en' ? 'en' : 'no';
</script>

<Nav {segment} {lang}/>

<main {lang} >
	<slot></slot>
</main>

<Footer {lang}/>

<style lang="scss">
@import '../profile.scss';

:global(#sapper) {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

main {
	flex-grow: 1;
	align-self: center;

	width: 100%;
	max-width: 47em;

	background-color: $lighter;

	position: relative;
	padding: 1em;

	@media screen and (min-width: $mobile) {
		padding: 2em;
	}
}
</style>
