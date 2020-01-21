<script context="module">
export async function preload({ query }) {
	return query || {};
}
</script>

<script>
import Text from '@/components/Text.svelte';
import NoPadding from '@/components/NoPadding.svelte';
import Skillmap from '@/components/Skillmap.svelte';

import Showcase from '@/components/Showcase.svelte';
import Bybane from '@/widgets/Bybane.svelte';
import Schoolmodels from '@/widgets/Schoolmodels.svelte';

import Timeline from '@/components/Timeline.svelte';
import timeline from '../../static/timeline.json';
import skillmap from '../../static/skillmap.json';

import about from './_about.yaml';

import { slide } from 'svelte/transition';

export let lang = 'no';
$: lang = lang.trim().toLowerCase() === 'en' ? 'en' : 'no';

$: body = about[lang];

function decorate (el) {
	if (!el) return null;

	el.id = el.place[lang] + el.title[lang] + el.start;
	el.start = new Date(el.start);
	el.end = el.end ? new Date(el.end) : null;

	el.title = el.title || {};
	el.place = el.place || {};
	return el;
}

let workList = timeline.work.map(decorate).filter(e => !!e);
let educationList = timeline.education.map(decorate).filter(e => !!e);

let ccbyExpanded = false;
</script>


<svelte:head>
	<title>Halvard Vegum</title>
</svelte:head>

<NoPadding class="hero-copy" padClass="hero-pad">
	<Text>
		<h1>Halvard Vegum</h1>
		<p>{body.hero}</p>
		<br>
	</Text>
</NoPadding>

<div class="experience">
	<Timeline title="Arbeidserfaring" class="timeline" list={workList} {lang} />
	<Timeline title="Utdanning" class="timeline" list={educationList} {lang} />
</div>


<div class="key-attributes">
	<Text>
		<h2>{body.keyAttributesTitle}</h2>
		<ul>
			<li>
				<img src="overcast.svg" alt="" role="presentation"/>
				<p>{@html body.keyAttributes[0]}</p>
			</li>
			<li>
				<img src="rainy-shaded.svg" alt="" role="presentation"/>
				<p>{@html body.keyAttributes[1]}</p>
			</li>
			<li>
				<img src="lightning-shaded.svg" alt="" role="presentation"/>
				<p>{@html body.keyAttributes[2]}</p>
			</li>
		</ul>
		<button on:click={() => ccbyExpanded = !ccbyExpanded}>
			{body.keyAttributesCCBY}
		</button>
		{#if ccbyExpanded}
			<div class="cc-by" transition:slide>
				{@html body.keyAttributesCCBYBody}
			</div>
		{/if}
	</Text>
</div>


<div>
	<Text>
		<h2>{body.toolboxTitle}</h2>
		{body.toolboxBody}
		<Skillmap nodes={skillmap.skills} edges={skillmap.connections}/>
	</Text>
</div>

<div class="showcase">
	<h2>{body.showcaseTitle}</h2>
	<div>
		<Showcase class="showcase-item" let:hover {...body.showcase.bybanestriden}>
			<Bybane {hover} />
		</Showcase>

		<Showcase class="showcase-item" let:hover {...body.showcase.schoolmodels}>
			<Schoolmodels {hover} />
		</Showcase>
	</div>
</div>

<style lang="scss">
@import '../profile.scss';

:global(.hero-copy) {
	background-color: $light;
	top: 0;
	box-sizing: content-box;
	padding: 1em;
	padding-bottom: 0;

	@media screen and (min-width: $mobile) {
		padding: 2em;
		padding-bottom: 0;
	}
}

:global(.hero-pad) {
	margin-bottom: -1em;

	@media screen and (min-width: $mobile) {
		margin-bottom: -2em;
	}
}

h2 {
	max-width: 28em;
	margin: 1.5em auto .5em;
}

.key-attributes {

	:global(b) {
		color: $primary;
	}

	button {
		font-size: .65em;
		font-variation-settings: $italic;
		margin-left: auto;

		&:hover, &:focus {
			text-decoration: underline;
		}

		&:focus, &:active {
			font-weight: $bold;
		}
	}

	.cc-by {
		font-size: .8em;
		overflow: hidden;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		display: flex;
		margin-bottom: 3em;

		flex-direction: column;
		align-items: center;


		p { margin: 0 }

		img {
			width: 5em;
			height: 5em;
			margin: 0 auto 1em;
			object-fit: contain;
			user-select: none;
			flex-basis: 5em;
		}

		@media screen and (min-width: $mobile) {
			&:nth-child(2n-1) {
				flex-direction: row;
				img { margin-left: 0 }
			}

			&:nth-child(2n) {
				flex-direction: row-reverse;
				img { margin-right: 0 }
			}

			img { margin: 0 2em }
		}
	}
}

.showcase {
	div {
		display: flex;
		flex-direction: column;
		align-items: center;

		@media screen and (min-width: $medium) {
			flex-direction: row;
			justify-content: space-around;
			align-items: flex-start;
		}

		:global(.showcase-item) {
			margin: 0 .5em 1.5em;
		}
	}
}

.experience {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1.5em 0 .5em;

	@media screen and (min-width: $medium) {
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}
}
</style>
