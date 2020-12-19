<script>
import Button from '@/components/Button.svelte';
import slide from '@/components/custom-slide.js';
import { fade } from 'svelte/transition';
import { onMount } from 'svelte';


export let title = '';
export let list = [];
export let lang = 'no';

let listElement;
let svg
let svgWidth = 50;
let radius = 7;

let months = {
  no: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

$: tillDate = lang === 'no' ? ' til dags dato' : ' till date';

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
          // node.points.push(Object.assign(point, { offset: 0 }));
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


function getDateString ({ start, end } = {}, lang) {
	if (!start) return '';
	const toString = date => months[lang][date.getMonth()] + ' ' + date.getFullYear();
	return toString(start) + (end ? ' – ' + toString(end) : tillDate)
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

    <ol bind:this={listElement} aria-labelledby="{title}">
      {#each list as el (el.id)}
        {#if el.hidden}
          <li class="abbreviated element">
            <Button outline=true class="reveal-button" on:click={reveal(el)}>{el.title[lang] || el.title.no}</Button>
          </li>
        {:else}
          <li in:slide|local={{ offset: 1.45 * (16 + window.innerWidth * 2e-3)}}>
            <p class="element">{el.place[lang] || el.place.no}</p>
            <p class="detail">
              <span>{el.title[lang] || el.title.no}</span>
              <span>{getDateString(el, lang)}</span>
            </p>
          </li>
        {/if}
      {/each}
    </ol>
  </div>
</div>


<style>
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
}

circle {
  fill: var(--tertiary);
}

path {
  fill: none;
  stroke: var(--tertiary);
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 3;
}

path.filled {
  fill: var(--tertiary);
  stroke: none;
}

ol {
	list-style: none;
  position: relative;
}

.abbreviated {
  margin: .25em 0;
}

.abbreviated :global(.reveal-button) {
  font-size: .85em;
}

li {
	margin: 1em 0;
	line-height: 1.4em;
  font-weight: 500;
  color: var(--dark);
}

/* var(--mobile) */
@media screen and (min-width: 400px) {
  li {
    font-size: .85em;
  }
}

li .element {
  margin: 0;
}

li .detail {
  color: var(--gray);
  font-weight: 375;
  display: flex;
  flex-direction: column;
}
</style>
