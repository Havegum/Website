<script>
import Timeline from '@/components/Timeline.svelte';

export let timelines = [];
export let lang = 'en';

function decorate (el) {
	if (!el) return null;

	el.id = el.place[lang] + el.title[lang] + el.start;
	el.start = new Date(el.start);
	el.end = el.end ? new Date(el.end) : null;

	el.title = el.title || {};
	el.place = el.place || {};
	return el;
}

$: timelines = timelines.map(({ list, title }) => ({
	list: list.map(decorate).filter(e => !!e),
	title,
}))
</script>


<div class="flex flex-col items-center mt-6 mb-2 md:flex-row md:justify-around md:items-start">
  {#each timelines as timeline}
    <Timeline {...timeline} {lang} />
  {/each}
</div>
