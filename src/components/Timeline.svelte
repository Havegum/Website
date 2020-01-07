<script>
import Button from '@/components/Button.svelte';
import slide from '@/components/custom-slide.js';
import { fade } from 'svelte/transition';
import { onMount } from 'svelte';


export let title = '';
export let list = [];


let listElement;
let svg
let svgWidth = 50;
let radius = 7;


$: decorateList(list);


function decorateList (list) {
  let lanes = Array(list.length).fill(0);

  for (let n = 0; n < list.length; n++) {
    let node = list[n]
    node.points = [];
    let lane = 0;

    for (let i = n; i >= 0; i--) {
      // Experience always extends at least a halfpoint

      let halfPoint = { i, lane, half: true, offset: 0 };
      if (i !== n) node.points.push(halfPoint);

      if (!node.end || node.end >= list[i].start) {
        let point = { i, lane, offset: 0 };

        if (!node.end || node.end.valueOf() != list[i].start.valueOf()) {
          // If exp not yet ended, or exp continues after exp[i]
          // increment lane
          point.lane = lane = lanes[i]++;
          halfPoint.offset = lane;
          point.offset = lane;

          node.points.push(point);
          node.points.push({ ...point, offset: 0});
        } else {
          // else the times are equal. Push and escape
          node.points.push(point);
          break;
        }

      } else {
        // If experience didn't span this item, push endpoint and escape ...
        node.points.push({ i, lane, offset: 0, end: true });
        break;
      }
    }

    if (!node.end) {
      node.points.push({ i: 0, lane, offset: -1.5 })
    }
  }

  // Resize svg to be no bigger than needed ...
  const max = (max, next) => Math.max(max, next);
  svgWidth = radius * 2 + (lanes.reduce(max) - 1) * radius * 2 - radius / 2
}


function resizeDots () {
  if (!listElement) return;
  let elements = listElement.getElementsByTagName('li');

  for (let i = 0; i < list.length; i++) {
    list[i].y = elements[i].offsetTop + 12;
    list[i].path = toPathData(list[i].points, i);
  }
}

function getPathX ({ lane }) {
  return svgWidth - lane * radius * 2 - radius;
}

function getPathY ({ half, offset, end, i }) {
  return list[i].y + (half ? radius * 3 : 0) + offset * radius / 2 + (end ? radius * 2 : 0);
}

function toPathData(points, i) {
  const pathReducer = (d, { x, y }) => d
      ? d + `S${x},${y + radius} ${x},${y}`
      : `M${x},${y}`;

  return points
    .map(p => ({
      x: getPathX(p),
      y: getPathY(p)
    }))
    .reduce(pathReducer, null);
}


function getDateString ({ start, end } = {}) {
	if (!start) return '';
	const toString = date => date.toLocaleString('no-NB', { year: 'numeric', month: 'long' });
	return toString(start) + (end ? ' – ' + toString(end) : ' til dags dato')
}


function reveal (element) {
	return function () {
		element.hidden = false

    // Resize
    let start = null;
    window.requestAnimationFrame(function step(timestamp) {
      resizeDots();
      if (!start) start = timestamp;
      let progress = timestamp - start;
      if (progress < 400) window.requestAnimationFrame(step);
    });
	}
}


onMount(() => {
  resizeDots();
  window.addEventListener('resize', resizeDots);
});
</script>


<div class="timeline {$$props.class}">
  <h2 id="{title}">{title}</h2>

  <div class="stack">
    <svg bind:this={svg} width={svgWidth} aria-hidden=true>
      {#each list as el, i}
        {#if listElement}
          <g in:fade|local={{ delay: 75 * i, duration: 400 }}>
            <circle r={radius} cx={svgWidth - radius} cy={el.y} />
            <path d={el.path} />

            {#if !el.end}
              <path
                class="filled"
                d="m -4,0 l4,-7 l4,7 z"
                transform="translate({getPathX(el.points[el.points.length - 1])} {getPathY(el.points[el.points.length - 1]) - 3})"
                />
            {/if}
          </g>
        {/if}
      {/each}
    </svg>

    <ol bind:this={listElement}>
      {#each list as element (element.id)}
        {#if element.hidden}
          <li class="abbreviated element">
            <Button outline=true class="reveal-button" on:click={reveal(element)}>{element.title}</Button>
          </li>
        {:else}
          <li in:slide|local>
            <p class="element">{element.place}</p>
            <p class="detail">
              <span>{element.title}</span>
              <span>{getDateString(element)}</span>
            </p>
          </li>
        {/if}
      {/each}
    </ol>
  </div>
</div>


<style lang="scss">
@import '../profile.scss';

.timeline {
  width: 18em;
}
.stack {
  display: flex;
}

h2 {
  margin-bottom: 0.2em;
}

svg {
  margin-right: .666em;
  overflow: visible;
  flex-shrink: 0;

  circle {
    fill: $tertiary;
  }

  path {
    fill: none;
    stroke: $tertiary;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 3;

    &.filled {
      fill: $tertiary;
      stroke: none;
    }
  }
}

ol {
	list-style: none;
  position: relative;

	.abbreviated {
    :global(.reveal-button) {
      font-size: .85em;
    }
    margin: .25em 0;
	}

	li {
		margin: 1em 0;
		line-height: 1.4em;
    font-weight: 475;
    font-variation-settings: $bold;

    @media screen and (min-width: $mobile) {
      font-size: .85em;
    }

		.detail {
			color: $gray;
      font-weight: 350;
      font-variation-settings: $normal;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>