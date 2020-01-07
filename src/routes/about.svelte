<script>
import Text from '@/components/Text.svelte';

import Showcase from '@/components/Showcase.svelte';
import Bybane from '@/widgets/Bybane.svelte';
import Schoolmodels from '@/widgets/Schoolmodels.svelte';

import Timeline from '@/components/Timeline.svelte';
import timeline from '../../static/timeline.json';


let workList = timeline.work.map(work => ({
	...work,
	start: new Date(work.start),
	end: work.end ? new Date(work.end) : null,
	id: work.employer + work.title + work.start
}));

let educationList = timeline.education.map(education => ({
	...education,
	start: new Date(education.start),
	end: education.end ? new Date(education.end) : null,
	id: education.place + education.program + education.start
}));
</script>


<svelte:head>
	<title>Halvard Vegum</title>
</svelte:head>

<Text>
	<h1>Halvard Vegum</h1>
	<p>
	Jeg er en student og utvikler på Media City Bergen som er motivert til å jobbe
	for mer erfaring med webutvikling og UI-design i mediebransjen.
	Tidligere har jeg vært mediegrafikerlærling i Forsvaret, nå er jeg
	redaksjonell utvikler i Bergens Tidende og Aftenposten.
	</p>
</Text>

<h2>Noe jeg har jobbet med</h2>
<div class="showcase">
	<Showcase let:hover lead="Bybanestriden" employer="Bergens Tidende" href="https://www.bt.no/nyheter/lokalt/i/rA47pl/bybanestriden">
		<Bybane {hover} />
	</Showcase>

	<Showcase let:hover lead="Simulering og visualisering av fem skoleinntaksmodeller" employer="Aftenposten" href="https://www.aftenposten.no/osloby/i/3JoKlX/neste-aar-kan-det-bli-slutt-paa-karakterbasert-opptak-i-oslo-disse-fem-modellene-skal-gi-svar-om-fremtidens-inntaksordning">
		<Schoolmodels {hover} />
	</Showcase>
</div>


<div class="experience">
	<Timeline title="Arbeidserfaring" class="timeline" list={workList} />
	<Timeline title="Utdanning" class="timeline" list={educationList} />
</div>

<style lang="scss">
@import '../profile.scss';

h2 {
	max-width: 26em;
	margin: 1.5em auto .5em;
}
.showcase {
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (min-width: $medium) {
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}
}

.experience {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1.5em;

	& :global(.timeline) {
		margin-bottom: 2em;
	}

	@media screen and (min-width: $medium) {
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}
}
</style>
