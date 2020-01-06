<script>
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

<svelte:body lang="no" />

<h1>Halvard Vegum</h1>
<p>
	Jeg er en student og utvikler på Media City Bergen som er motivert til å jobbe
	for mer erfaring med webutvikling og UI-design i mediebransjen.
	Tidligere har jeg vært mediegrafikerlærling i Forsvaret, nå er jeg
	redaksjonell utvikler i Bergens Tidende og Aftenposten.
</p>

<br>

<div class="experience">
	<Timeline title="Arbeidserfaring" class="timeline" list={workList} />
	<Timeline title="Utdanning" class="timeline" list={educationList} />
</div>

<style lang="scss">
@import '../profile.scss';

.experience {
	display: flex;
	flex-direction: column;

	& :global(.timeline) {
		margin: 1em 0;
	}

	@media screen and (min-width: $medium) {
		flex-direction: row;
		justify-content: space-around;
	}
}
</style>
