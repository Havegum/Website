<script>
import { forceSimulation, forceX, forceY, forceLink, forceManyBody } from 'd3-force';

import { forceBound, forceCollide } from '$lib/components/custom-forces.js';
import SkillmapNode from '$lib/components/SkillmapNode.svelte';

export let nodes;
export let edges;

let width;
let height;

let margin = {
  top: 10,
  bottom: 30,
  left: 30,
  right: 20,
  get width () { return this.left + this.right },
  get height () { return this.top + this.bottom }
}

const forceCharge = strength => forceManyBody()
  .strength(-strength)
  .theta(.5)
  .distanceMin(2)
  .distanceMax(300);

const sim = forceSimulation(nodes)
  .alpha(1)
  .alphaDecay(4e-2)
  .velocityDecay(3e-1);

sim
  .force('collide', forceCollide())
  .force('link', forceLink(edges).id(d => d.name).strength(8e-1))
  .force('charge', forceCharge(150))

// Reactive forces
$: sim.force('x', forceX(n => n.techincal * (width - margin.width)).strength(45e-2));
$: sim.force('y', forceY((height - margin.height) / 2).strength(8e-2));
$: sim.force('bound', forceBound(width - margin.width, height - margin.height));
sim.on('tick', () => [nodes, edges] = [nodes, edges]);

$: height, width, sim.alpha(1).restart();
const rng = () => Math.random() * 2 - 1;
</script>


<div class="relative max-w-2xl min-h-40 mx-auto" bind:clientWidth={width} bind:clientHeight={height}>
  {#each ['100', '200', '700', '800'] as weight, i}
    <div
      class:bg-blue-100={weight === '100'}
      class:bg-blue-200={weight === '200'}
      class:bg-blue-700={weight === '700'}
      class:bg-blue-800={weight === '800'}
      class="absolute w-full h-full -z-1 rounded-lg"
      style="transform: translate({rng()* 8}px, {rng()*3}px) rotate({rng()* 1.2}deg) scale({1 - 0.03 * (i / 3)})"
      />
  {/each}
  <svg class="block w-full h-full" aria-label="Ferdighetskart">
    <g style="transform: translate({margin.left}px, {margin.top}px)">
      <g class="edges" aria-hidden="true">
        {#each edges as edge}
          <line
            class="stroke-1 stroke-blue-400"
            x1={edge.source.x}
            y1={edge.source.y}
            x2={edge.target.x}
            y2={edge.target.y}
          />
        {/each}
      </g>

      <g class="nodes">
        {#each nodes as node (node.name)}
          <SkillmapNode {node} />
        {/each}
      </g>
    </g>
  </svg>
</div>


<style lang="postcss">
div {
  height: calc(20em - 10vw);
}

line {
  stroke-dasharray: 2 3;
}
</style>
