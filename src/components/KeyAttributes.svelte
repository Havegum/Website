<script>
import { slide } from 'svelte/transition';
import Text from '@/components/Text.svelte';
export let body;
let ccbyExpanded = false;
</script>


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



<style>
.key-attributes :global(b) {
	color: var(--primary);
}

button {
	font-size: .65em;
	font-style: italic;
	margin-left: auto;
}

button:hover,
button:focus {
	text-decoration: underline;
}

button:focus,
button:active {
  font-weight: var(--bold);
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
}

li.active {
	opacity: 1;
	top: 0;
}

li p {
	margin: 0;
}

li p :global(b) {
	color: var(--paragraph);
	font-weight: 400;
	will-change: color, font-weight;
	transition:
		color 500ms 250ms,
		font-weight 500ms 250ms;
}

li.active p :global(b) {
	color: var(--primary);
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

@media screen and (min-width: 400px) {
	li:nth-child(2n-1) { flex-direction: row }
  li:nth-child(2n-1) img { margin-left: 0 }

	li:nth-child(2n) { flex-direction: row-reverse }
	li:nth-child(2n) img { margin-right: 0 }

	img { margin: 0 2em }
}
</style>
