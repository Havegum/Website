<script>
export let href = '#';
</script>


<a {href} class="relative flex flex-col hover:underline bg-white leading-snug border-b-2 border-blue-300">
  <slot/>
  <div class="p-3 relative z-0">
    <p class="m-0">
      <slot name="lead"/>
    </p>
  </div>
</a>


<style>
a {
  color: var(--text-gray-800);
}
</style>
