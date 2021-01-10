<script>
import { onMount } from 'svelte';
import { slide } from 'svelte/transition';

import Roughbox from '@/components/layout/Roughbox.svelte';
import IllustratedBackground from '@/components/IllustratedBackground.svelte';
import Main from '@/components/layout/Main.svelte';

import Text from '@/components/Text.svelte';
import Skillmap from '@/components/Skillmap.svelte';
import KeyAttributes from '@/components/KeyAttributes.svelte';

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
	<title>Halvard Alvheim Vegum</title>
</svelte:head>


<IllustratedBackground/>

<Main background={false} padding={false} >
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

			<KeyAttributes {body} />


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


<style>
.lang-swap {
  font-size: .85em;
  text-align: right;
  display: block;
  height: 0;
  font-weight: inherit;
  text-decoration: none;
}

.lang-swap:hover,
.lang-swap:focus {
	text-decoration: underline;
}

.hero-copy {
	padding: 2em 1em 1em;
	box-sizing: content-box;

	color: var(--darker);
}

.hero-copy h1 {
	background: var(--tertiary);
	color: var(--lighter);
	display: inline-block;
	margin-bottom: .5em;
	padding: .1em .25em;
	padding-right: 0.75em;
	border-radius: 0 5em 5em 0;
}

.hero-copy h1 .middle-name {
	display: none;
}

@media screen and (min-width: 670px) {
	.hero-copy h1 .middle-name {
		display: inline;
	}

	.hero-copy h1 .middle-name-dot {
		display: none;
	}
}

h2 {
	max-width: 28em;
	margin: 1.5em auto .5em;
}

.showcase div {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.showcase :global(.showcase-item) {
	margin: 0 .5em 1.5em;
}

.experience {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1.5em 0 .5em;
}

@media screen and (min-width: 620px) {
	.showcase div {
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}

	.experience {
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}
}
</style>
