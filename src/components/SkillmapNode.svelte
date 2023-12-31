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


<circle class="fill-blue-400 stroke-blue-800 stroke-1" cx={node.x} cy={node.y} r={node.size + 1} aria-hidden="true"/>
<g style="
    font-size: {9 + node.size * 1.5}px;
    transform: translate({node.x}px, {node.y + 9 + node.size * 1.5}px">
  <text class="fill-blue-800 stroke-blue-800 stroke-2" style="font-weight: {300 + 50 * node.size}" aria-hidden="true">{node.name}</text>
  <text class="fill-blue-100" style="font-weight: {300 + 50 * node.size}" bind:this={text}>{node.name}</text>
</g>


<style>
text {
  text-anchor: middle;
  user-select: none;
}

* {
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
