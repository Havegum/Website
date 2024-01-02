<script>
export let lang = 'no';
</script>


<footer class="footer relative bg-blue-800 pb-4 text-white">
  <div class="mx-auto max-w-3xl p-4 pb-6 sm:px-8">
    {#if lang === 'en'}
      <p>This site was built with <a href="https://kit.svelte.dev/">SvelteKit</a>.</p>
      <p>Find me on <a href="https://github.com/Havegum">GitHub</a>, <a href="https://www.linkedin.com/in/halvard-vegum/">LinkedIn</a>, and on <a href="https://vis.social/@havegum">vis.social</a>.</p>

    {:else}
      <p>Denne siden var bygget med <a href="https://kit.svelte.dev/">SvelteKit</a>.</p>
      <p>Du kan finne meg på <a href="https://github.com/Havegum">GitHub</a>, <a href="https://www.linkedin.com/in/halvard-vegum/?locale=no_NO">LinkedIn</a>, og på <a href="https://vis.social/@havegum">vis.social</a>.</p>
    {/if}
  </div>
</footer>


<style lang="postcss">
p {
  @apply m-0;
}

a {
  @apply text-blue-200;
}

a:hover,
a:focus,
a:active {
  @apply text-white underline;
  text-decoration-color: var(--blue-400);
}

footer.footer {
  grid-column: 1 / -1;
}
</style>
