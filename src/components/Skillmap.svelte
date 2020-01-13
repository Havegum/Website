<script>
import { forceSimulation, forceX, forceY, forceLink, forceManyBody } from 'd3-force';

import { forceBound, forceCollide } from '@/components/custom-forces.js';
import SkillmapNode from '@/components/SkillmapNode.svelte';

export let nodes;
export let edges;

let width;
let height;

let margin = {
  top: 10,
  bottom: 30,
  left: 20,
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
$: sim.force('y', forceY((height - margin.height) / 2).strength(6e-2));
$: sim.force('bound', forceBound(width - margin.width, height - margin.height));
sim.on('tick', () => [nodes, edges] = [nodes, edges]);

$: height, width, sim.alpha(1).restart();
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
  <svg aria-label="Ferdighetskart">
    <g style="transform: translate({margin.left}px, {margin.top}px)">
      <g class="edges" aria-hidden="true">
        {#each edges as edge}
          <line x1={edge.source.x} y1={edge.source.y} x2={edge.target.x} y2={edge.target.y}/>
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

<style lang="scss">
@import '../profile.scss';

div {
  background-color: $primary;
  max-width: 39em;

  height: calc(20em - 10vw);
  min-height: 10em;

  margin: 0 auto;

  svg {
    display: block;
    width: 100%;
    height: 100%;

    line {
      stroke-width: 1;
      stroke-dasharray: 2 3;
      stroke: $secondary-dark;
    }
  }
}
</style>
