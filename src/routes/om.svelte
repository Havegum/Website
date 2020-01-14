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

<NoPadding class="hero-copy" padClass="hero-pad">
	<Text>
		<h1>Halvard Vegum</h1>
		<p>
			Jeg er en student og utvikler på Media City Bergen som er motivert til å jobbe
			for mer erfaring med webutvikling og UI-design i mediebransjen.
			Tidligere har jeg vært mediegrafikerlærling i Forsvaret, nå er jeg
			redaksjonell utvikler i Bergens Tidende og Aftenposten.
		</p>
		<br>
	</Text>
</NoPadding>

<div class="experience">
	<Timeline title="Arbeidserfaring" class="timeline" list={workList} />
	<Timeline title="Utdanning" class="timeline" list={educationList} />
</div>


<div class="key-attributes">
	<Text>
		<h2>Nøkkelegenskaper</h2>
		<p>
			Jeg kan å jobbe med klare frister. <b>Effektivitet</b> og prioritering
			har vært nødvendig for å levere dagsprosjekter og samtidig ha fremgang i
			mer langsiktige prosjekter.
 		</p>
		<p>
			Jeg har erfaring med en bred portefølje av felter, og noe som gir meg <b>allsidighet</b>
			til å bidra mer i tverfaglige team. Noen av det jeg har vært borti er:
			UX-evaluering, grafisk design, dataanalyse, og maskinlæring.
		</p>
		<p>
			Jeg synes det er gøy å lage ting. Jeg har et <b>engasjement</b> for design og
			teknologi. Ettermiddagen går fort i å prøve et nytt verktøy, eller se om jeg kan
			blåse liv i mine egne prosjekter.
		</p>
	</Text>
</div>


<div>
	<Text>
		<h2>Ferdighetskart</h2>
		Her er noen av verktøyene jeg har jobbet med
		<Skillmap nodes={skillmap.skills} edges={skillmap.connections}/>
	</Text>
</div>

<div class="showcase">
	<h2>Se noen av prosjektene jeg har jobbet på</h2>
	<div>
		<Showcase class="showcase-item" let:hover lead="Bybanestriden" employer="Bergens Tidende" href="https://www.bt.no/nyheter/lokalt/i/rA47pl/bybanestriden">
			<Bybane {hover} />
		</Showcase>

		<Showcase class="showcase-item" let:hover lead="Simulering og visualisering av fem skoleinntaksmodeller" employer="Aftenposten" href="https://www.aftenposten.no/osloby/i/3JoKlX/neste-aar-kan-det-bli-slutt-paa-karakterbasert-opptak-i-oslo-disse-fem-modellene-skal-gi-svar-om-fremtidens-inntaksordning">
			<Schoolmodels {hover} />
		</Showcase>
	</div>
</div>

<style lang="scss">
@import '../profile.scss';

:global(.hero-copy) {
	background-color: $secondary;
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
	h3 {
		font-size: 1em;
		margin: 1em 0 0;
	}

	b {
		background-color: $secondary;
		// color: $light;
		padding: 0 .2em;
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
			margin: .5em;
			margin-top: 0;
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
