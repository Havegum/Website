<script>
function mountCanvas (node) {
  const ctx = node.getContext('2d');
  console.log(node);
}
</script>


<div class="absolute w-full h-96 bg-blue-100 -z-1 opacity-50">
  <canvas use:mountCanvas/>
</div>


<style lang="postcss">
canvas {
  @apply absolute w-full h-96;
}
</style>
