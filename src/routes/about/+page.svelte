<script>
import Roughbox from '$lib/components/layout/Roughbox.svelte';
import Main from '$lib/components/layout/Main.svelte';
import DynamicBackground from '$lib/components/DynamicBackground.svelte';

import Text from '$lib/components/Text.svelte';
import Experience from '$lib/components/Experience.svelte';
import Showcase from '$lib/components/Showcase.svelte';
import Skillmap from '$lib/components/Skillmap.svelte';
import KeyAttributes from '$lib/components/KeyAttributes.svelte';

// import Widget from '$lib/widgets/Widget.svelte';
// import Bybane from '$lib/widgets/Bybane.svelte';
// import Schoolmodels from '$lib/widgets/Schoolmodels.svelte';

import Timeline from '$lib/components/Timeline.svelte';
import timeline from '$lib/data/timeline.json';
import skillmap from '$lib/data/skillmap.json';

import about from '$lib/data/about.yaml';

export let lang = 'en';
$: body = about[lang];
</script>


<svelte:head>
	<title>Halvard Alvheim Vegum</title>
</svelte:head>

<DynamicBackground/>

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

		<Experience {lang} timelines={[
			{ list: timeline.work, title: body.workListTitle },
			{ list: timeline.education, title: body.educationListTitle }
		]}/>

		<KeyAttributes {body} />

		<Skillmap title={body.toolboxTitle} body={body.toolboxBody} {...skillmap} />

		<Showcase title={body.showcaseTitle} showcase={body.showcase} />
	</Roughbox>
</Main>


<style lang="postcss">
.hero-copy {
	color: var(--gray-800);
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
