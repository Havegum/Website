<script>
export let lang = 'no';
</script>


<footer>
  <div class="overlay"></div>
  <div>
    {#if lang === 'en'}
      <p>This site was built with <a href="https://svelte.dev">Svelte</a> using <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Check out my <a href="https://github.com/Havegum">GitHub</a>, follow me on <a href="https://www.linkedin.com/in/halvard-vegum/">LinkedIn</a>, and on Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>

    {:else}
      <p>Denne siden var bygget i <a href="https://svelte.dev">Svelte</a> med <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Du kan finne meg på <a href="https://github.com/Havegum">GitHub</a>, følge meg på <a href="https://www.linkedin.com/in/halvard-vegum/?locale=no_NO">LinkedIn</a>, og på Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>
    {/if}
  </div>
</footer>


<style>
footer {
  position: relative;
  background-color: var(--primary);
  color: var(--light);
  padding-bottom: 1em;
}

footer div {
  max-width: 47em;
  margin: 0 auto;
  padding: 1em 1em 1.5em;
}

footer .overlay {
  display: none;
  background-color: var(--secondary-dark);
}

@media screen and (min-width: 620px) {
  footer .overlay {
    display: block;
  }
}

@media screen and (min-width: 400px) {
  footer div {
    padding: 1em 2em 1.5em;
  }
}
footer :not(.overlay) {
  box-sizing: content-box;
}

a {
  color: var(--secondary);
}

a:hover,
a:focus,
a:active {
  color: var(--lighter);
}

p {
  margin: 0;
}
</style>
