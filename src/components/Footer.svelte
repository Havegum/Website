<div>
  <div class="overlay"></div>
  <div>
    <p>Follow me on twitter <a href="https://www.twitter.com/Havegum">@Havegum</a>, and check out my mapping service, <a href="https://maps.vegum.no/">Maps</a>!</p>
  </div>
</div>

<style lang="scss">
@import '../profile.scss';

div {
  background-color: $primary;
  color: $light;

  padding-bottom: 1em;

  div {
    max-width: 47em;
    margin: 0 auto;
    padding: 1em .5em 1.5em;

    &.overlay { background-color: $secondary-dark }
    &:not(.overlay) { box-sizing: content-box }

    a { color: $secondary }
    a:hover, a:focus, a:active {
      color: $lighter;
      text-shadow: 0 0 1em rgba($secondary, .5);
    }
  }
}
</style>
