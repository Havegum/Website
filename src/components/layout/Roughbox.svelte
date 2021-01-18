<script>
import { onMount } from 'svelte';

let width = 100;
let height = 100;

export let spacing = 25;
export let roughness = 5;

let d;
$: if (d) d = roughen(width, height);

let topLine    = Array(20).fill().map(Math.random);
let rightLine  = Array(80).fill().map(Math.random);
let bottomLine = Array(20).fill().map(Math.random);
let leftLine   = Array(80).fill().map(Math.random);

const rough = random => random * roughness - roughness / 2;
const indices = n => Array(n - 1).fill().map((_, i) => i + 1);

function roughen (width, height) {
  let stepCountWidth = Math.round(width / spacing);
  let stepSizeWidth = width / stepCountWidth;

  let stepCountHeight = Math.round(height / spacing);
  let stepSizeHeight = height / stepCountHeight;

  let top = indices(stepCountWidth)
    .map(i => [i * stepSizeWidth, rough(topLine[i % topLine.length])])
    .map(([x, y]) => `S ${x - stepSizeWidth / 3} ${y}, ${x} ${y}`)
    .join(' ');

  let right = indices(stepCountHeight)
    .map(i => [width + rough(rightLine[i % rightLine.length]), i * stepSizeHeight])
    .map(([x, y]) => `S ${x} ${y - stepSizeHeight / 3}, ${x} ${y}`)
    .join(' ');

  let bottom = indices(stepCountWidth)
    .map(i => [(stepCountWidth - i) * stepSizeWidth, height + rough(bottomLine[i % bottomLine.length])])
    .map(([x, y]) => `S ${x + stepSizeWidth / 3} ${y}, ${x} ${y}`)
    .join(' ');

  let left = indices(stepCountHeight)
    .map(i => [rough(leftLine[(stepCountHeight - i) % leftLine.length]), (stepCountHeight - i) * stepSizeHeight])
    .map(([x, y]) => `S ${x} ${y + stepSizeHeight / 3}, ${x} ${y}`)
    .join(' ');

  return `
    M 0 0
    ${top}    L ${width} 0
    ${right}  L ${width} ${height}
    ${bottom} L 0        ${height}
    ${left}   Z
  `;
}

onMount(() => d = true );
</script>


<div
  class="bg-gray-50 p-4 md:bg-transparent md:mb-4"
  class:roughed={!!d}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <svg class="text-transparent md:text-gray-50 absolute hidden md:block fill-gray-50 top-0 left-0 w-full h-full -z-1 overflow-visible" viewbox="0 0 {width} {height}">
    <path class="fill-current" {d}>
  </svg>
  <slot/>
</div>
