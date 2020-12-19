<script>
export let node;
const clamp = (n, { min=0, max=1 }={}) => Math.max(min, Math.min(max, n));

let text;

$: if (text) {
  let { width, height } = text.getBBox();
  node.width = Math.floor(width + 16);
  node.height = Math.floor(height * 1.1 + 4);
}
</script>


<circle cx={node.x} cy={node.y} r={node.size + 1} aria-hidden="true"/>
<g style="
    font-size: {9 + node.size * 1.5}px;
    transform: translate({node.x}px, {node.y + 9 + node.size * 1.5}px">
  <text style="font-weight: {300 + 50 * node.size}" class="shadow" aria-hidden="true">{node.name}</text>
  <text style="font-weight: {300 + 50 * node.size}" bind:this={text}>{node.name}</text>
</g>


<style>
circle {
  stroke: var(--primary);
  stroke-width: 1;
  fill: var(--secondary);
}

text {
  fill: var(--light);
  color: var(--light);
  text-anchor: middle;
  user-select: none;
}
text.shadow {
  fill: var(--primary);
  stroke: var(--primary);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
