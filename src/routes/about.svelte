<script>
import { onMount } from 'svelte';
import { slide } from 'svelte/transition';

import Roughbox from '@/components/layout/Roughbox.svelte';
import Main from '@/components/layout/Main.svelte';

import Text from '@/components/Text.svelte';
import Skillmap from '@/components/Skillmap.svelte';

import Widget from '@/widgets/Widget.svelte';
import Bybane from '@/widgets/Bybane.svelte';
import Schoolmodels from '@/widgets/Schoolmodels.svelte';

import Timeline from '@/components/Timeline.svelte';
import timeline from '../../static/timeline.json';
import skillmap from '../../static/skillmap.json';

import enterView from 'enter-view';

import about from './_about.yaml';


export let lang = 'en';
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

onMount(() => {
	enterView({
		selector: '.--step',
		enter: e => e.classList.add('active'),
		offset: 0.1,
		once: true
	});
});

</script>


<svelte:head>
	<title>Halvard Vegum</title>
</svelte:head>

<Main background={false} padding={false}>
	<div class="hero-copy">
		<Text>
			<h1>Halvard A<span class="middle-name">lvheim</span><span class="middle-name-dot">.</span> Vegum</h1>
			<p>{@html body.hero}</p>
		</Text>
	</div>

	<div>
		<Roughbox>
      <a class="lang-swap" href={lang === 'en' ? '/om-meg' : '/about'}>({lang === 'en' ? 'les på Norsk': 'view in English'})</a>
			<div class="experience">
				<Timeline title={body.workListTitle} class="timeline" list={workList} {lang} />
				<Timeline title={body.educationListTitle} class="timeline" list={educationList} {lang} />
			</div>

			<div class="key-attributes">
				<Text>
					<h2>{body.keyAttributesTitle}</h2>
					<ul>
					{#each ['overcast', 'rainy-shaded', 'lightning-shaded'] as img, i}
						<li class="--step" class:active={false}>
							<img src="{img}.svg" alt="" role="presentation"/>
							<p>{@html body.keyAttributes[i]}</p>
						</li>
					{/each}
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
					<Widget class="showcase-item" let:hover {...body.showcase.bybanestriden}>
						<Bybane {hover} />
					</Widget>

					<Widget class="showcase-item" let:hover {...body.showcase.schoolmodels}>
						<Schoolmodels {hover} />
					</Widget>
				</div>
			</div>
		</Roughbox>
	</div>
</Main>


<style lang="scss">
@import '../profile.scss';
.lang-swap {
  font-size: .85em;
  text-align: right;
  display: block;
  height: 0;
  font-weight: inherit;
  text-decoration: none;

  &:hover, &:focus {
    text-decoration: underline;
  }
}

.hero-copy {
	padding: 2em 1em 1em;
	box-sizing: content-box;

	color: $darker;

	h1 {
		background: $tertiary;
		color: $lighter;
		display: inline-block;
		margin-bottom: .5em;
		padding: .1em .25em;
		padding-right: 0.75em;
		border-radius: 0 5em 5em 0;

		.middle-name { display: none }
		@media screen and (min-width: 670px) {
			.middle-name { display: inline }
			.middle-name-dot { display: none }
		}

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
		font-style: italic;
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

		opacity: 0;
		position: relative;
		top: 2em;

		will-change: top, opacity;

		transition:
			top 500ms,
			opacity 500ms;

		&.active {
			opacity: 1;
			top: 0;
		}

		p {
			margin: 0;
			:global(b) {
				color: $paragraph;
				font-weight: 400;
				will-change: color, font-weight;
				transition:
					color 500ms 250ms,
					font-weight 500ms 250ms;
			}
		}

		&.active p :global(b) {
			color: $primary;
			font-weight: 700;
		}

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
