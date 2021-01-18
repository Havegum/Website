<script>
import Roughbox from '@/components/layout/Roughbox.svelte';
import IllustratedBackground from '@/components/IllustratedBackground.svelte';
import Main from '@/components/layout/Main.svelte';

import Text from '@/components/Text.svelte';
import Experience from '@/components/Experience.svelte';
import Showcase from '@/components/Showcase.svelte';
import Skillmap from '@/components/Skillmap.svelte';
import KeyAttributes from '@/components/KeyAttributes.svelte';

import Widget from '@/widgets/Widget.svelte';
import Bybane from '@/widgets/Bybane.svelte';
import Schoolmodels from '@/widgets/Schoolmodels.svelte';

import Timeline from '@/components/Timeline.svelte';
import timeline from '../../static/timeline.json';
import skillmap from '../../static/skillmap.json';

import about from './_about.yaml';


export let lang = 'en';
$: body = about[lang];
</script>


<svelte:head>
	<title>Halvard Alvheim Vegum</title>
</svelte:head>


<IllustratedBackground/>

<Main background={false} padding={false} >
	<div class="hero-copy box-content p-4 pt-8">
		<Text>
			<h1 class="bg-red text-2xl text-white inline-block mb-2 p-1 pl-2 pr-6 rounded-r-full">Halvard A<span class="middle-name">lvheim</span><span class="middle-name-dot">.</span> Vegum</h1>
			<p>{@html body.hero}</p>
		</Text>
	</div>

	<Roughbox>
    <a class="text-sm text-right text-blue text-blue-700 block h-0 no-underline hover:underline" href={lang === 'en' ? '/om-meg' : '/about'}>
			({lang === 'en' ? 'les på Norsk': 'view in English'})
		</a>

		<Experience timelines={[
			{ list: timeline.work, title: body.workListTitle },
			{ list: timeline.education, title: body.educationListTitle }
		]}/>

		<KeyAttributes {body} />

		<Skillmap title={body.toolboxTitle} body={body.toolboxBody} {...skillmap} />

		<Showcase title={body.showcaseTitle} showcase={body.showcase} />
	</Roughbox>
</Main>


<style>
.hero-copy {
	color: var(--darker);
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
</style>
