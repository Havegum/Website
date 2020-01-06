<script>
import Nav from '@/components/Nav.svelte';
import Footer from '@/components/Footer.svelte';

export let segment;
</script>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<Footer />

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

	background-color: $light;

	position: relative;
	padding: 2em;

	// @media screen and (min-width: $medium)
}
</style>
