<script>
export let lang = 'no';
</script>

<footer>
  <div class="overlay"></div>
  <div>
    {#if lang === 'en'}
      <p>This site was built with <a href="https://svelte.dev">Svelte</a> using <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Follow me on <a href="https://www.linkedin.com/in/halvard-vegum/">LinkedIn</a>, and on Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>

    {:else}
      <p>Denne siden var bygget i <a href="https://svelte.dev">Svelte</a> med <a href="https://sapper.svelte.dev/">Sapper</a>.</p>
      <p>Følg meg på <a href="https://www.linkedin.com/in/halvard-vegum/?locale=no_NO">LinkedIn</a>, og på Twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>.</p>
    {/if}
  </div>
</footer>

<style lang="scss">
@import '../profile.scss';

footer {
  position: relative;
  background-color: $primary;
  color: $light;

  padding-bottom: 1em;

  div {
    max-width: 47em;
    margin: 0 auto;
    padding: 1em 1em 1.5em;

    &.overlay {
      display: none;
      background-color: $secondary-dark;
      @media screen and (min-width: $medium) {
        display: block;
      }
    }

    @media screen and (min-width: $mobile) {
      padding: 1em 2em 1.5em;

    }

    &:not(.overlay) { box-sizing: content-box }

    a { color: $secondary }
    a:hover, a:focus, a:active {
      color: $lighter;
    }
  }
}

p {
  margin: 0;
}
</style>
