<script>
import { select } from 'd3-selection';
import { forceSimulation, forceX, forceY, forceLink, forceManyBody } from 'd3-force';

import { onMount } from 'svelte';

export let nodes;
export let edges;

let container;
let width;
let height;

const sim = forceSimulation(nodes)
  .alpha(.3)
  .alphaDecay(5e-3)
  .force('link', forceLink(edges).id(d => d.name))
  .force('charge', forceManyBody()
    .strength(-150)
    .theta(.5)
    .distanceMin(2)
    .distanceMax(300)
  );

$: sim.force('x', forceX(n => n.techincal * (width - 32)));
$: sim.force('y', forceY((height - 32) / 2).strength(6e-2));

$: height, width, sim.alpha(.3).restart();

onMount(() => {
  const clamp = (n, { min=0, max=1 }={}) => Math.max(min, Math.min(max, n));

  const svg = select(container)
    .append('svg')
    .append('g')
    .attr('transform', 'translate(16, 16)')

  const link = svg.append('g')
      .classed('edges', true)
    .selectAll('line')
    .data(edges)
    .join('line');

  const node = svg.append('g')
      .classed('nodes', true)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
      .attr('r', d => d.size + 1);


  // const labelShadow = svg.append('g')
  //     .classed('label-shadows', true)
  //   .selectAll('text')
  //   .data(nodes)
  //   .join('text')
  //     .text(d => d.name)
  //     .attr('style', d =>
  //       `font-variation-settings: 'CASL' ${clamp(1 - d.techincal * 2)}, 'ital' ${clamp(1 - d.techincal * 2)}, 'MONO' ${clamp(d.techincal * 2 - 1)}, 'wght' 900;` +
  //       `font-size: ${9 + d.size * 1.5}px;` +
  //       `transform: translateY(${9 + d.size * 1.5}px);`
  //     );

  const label = svg.append('g')
      .classed('labels', true)
    .selectAll('g')
    .data(nodes)
    .join('g')
      .style('font-variation-settings', d => `
        'CASL' ${clamp(1 - d.techincal * 2)},
        'ital' ${clamp(1 - d.techincal * 2)},
        'MONO' ${clamp(d.techincal * 2 - 1)},
        'wght' ${300 + 50 * d.size}`)
      .style('font-size', d => `${9 + d.size * 1.5}px`);

  label.append('text')
      .text(d => d.name)
      .style('font-variation-settings', d =>
      `'CASL' ${clamp(1 - d.techincal * 2)},
      'ital' ${clamp(1 - d.techincal * 2)},
      'MONO' ${clamp(d.techincal * 2 - 1)},
      'wght' 1000`)
      .classed('label-shadow', true)
      .select(function () { return this.parentNode })
    .append('text')
      .text(d => d.name);


  sim.on('tick', () => {
    node
      .attr('cx', d => d.x = clamp(d.x, { max: width - 32 }))
      .attr('cy', d => d.y = clamp(d.y, { max: height - 32 }))

    label.style('transform', d => `translate(${d.x}px, ${d.y + 9 + d.size * 1.5}px)`)

    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
  });
});

</script>

<div bind:this={container} bind:clientWidth={width} bind:clientHeight={height}></div>
<style lang="scss">
@import '../profile.scss';

div {
  background-color: $primary;
  max-width: 39em;

  height: calc(20em - 10vw);
  min-height: 10em;

  margin: 0 auto;

  :global(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  :global(svg .edges) {
    stroke-width: 1;
    stroke-dasharray: 2 3;
    stroke: $secondary-dark;
  }

  :global(svg .nodes) {
    stroke: $primary;
    stroke-width: 1;
    fill: $secondary;
  }

  :global(svg .labels) {
    text-anchor: middle;
    fill: $light;
    // font-size: 12px;
    // text-shadow: 0 1px 2px $primary, 0 1px 2px $primary;
  }

  :global(svg .label-shadow) {
    fill: $primary;
    text-shadow: 0 0 2px $primary;
  }
}
</style>
