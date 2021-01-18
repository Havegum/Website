<script>
export let lang = 'no';
</script>


<footer class="relative bg-blue-800 pb-4 text-white">
  <div class="mx-auto max-w-3xl p-4 pb-6 sm:px-8">
    {#if lang === 'en'}
      <p>This site was built with <a href="https://svelte.dev">Svelte</a> using <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Find me on <a href="https://github.com/Havegum">GitHub</a>, <a href="https://www.linkedin.com/in/halvard-vegum/">LinkedIn</a>, and on Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>

    {:else}
      <p>Denne siden var bygget i <a href="https://svelte.dev">Svelte</a> med <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Du kan finne meg på <a href="https://github.com/Havegum">GitHub</a>, <a href="https://www.linkedin.com/in/halvard-vegum/?locale=no_NO">LinkedIn</a>, og på Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>
    {/if}
  </div>
</footer>


<style>
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
</style>
