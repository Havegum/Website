<script>
import { onMount } from 'svelte';
import { slide } from 'svelte/transition';
import enterView from 'enter-view';

import Lightning from './attributeIcons/lightning.svelte';
import Overcast from './attributeIcons/overcast.svelte';
import Rainy from './attributeIcons/rainy.svelte';
import Text from '@/components/Text.svelte';

export let body;

onMount(() => {
	enterView({
		selector: '.--step',
		enter: e => e.classList.add('active'),
		offset: 0.1,
		once: true
	});
});
</script>


<Text>
  <h2>{body.keyAttributesTitle}</h2>

  <ul>
    {#each [Overcast, Rainy, Lightning] as icon, i}
      <li
        class:active={false}
        class="--step flex items-center flex-col sm:odd:flex-row sm:even:flex-row-reverse opacity-0 relative top-8 mb-12"
      >
        <figure class="{i % 2 === 0 ? 'sm:mr-4' : 'sm:ml-4'}">
          <svelte:component this={icon} />
        </figure>
        <p class="m-0">{@html body.keyAttributes[i]}</p>
      </li>
    {/each}
  </ul>

  <details class="text-right">
    <summary
      class="text-sm inline-block italic cursor-pointer select-none hover:underline list-none">
      {body.keyAttributesCCBY}
    </summary>
    <div class="cc-by text-sm opacity-0">
      {@html body.keyAttributesCCBYBody}
    </div>
  </details>
</Text>


<style>
li p :global(b) {
	color: var(--blue-DEFAULT);
	font-weight: 400;
	will-change: color, font-weight;
	transition:
		color 500ms 250ms,
		font-weight 500ms 250ms;
}

li.active p :global(b) {
	color: var(--blue-800);
	font-weight: 700;
}

.cc-by {
  transition: opacity 400ms;
}

[open] .cc-by {
  opacity: 1;
}

li {
	will-change: top, opacity;
	transition:
		top 500ms,
		opacity 500ms;
}

li.active {
	opacity: 1;
	top: 0;
}

figure {
  flex-basis: 0;
  flex-grow: 0;
  flex-shrink: 0;
}

li p {
  flex-basis: 0;
  flex-grow: 1;
}
</style>
