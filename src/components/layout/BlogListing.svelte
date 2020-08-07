<script>
export let href = '#';

</script>

<a {href}>
  <slot/>
  <div>
    <p><slot name="lead"/></p>
  </div>
</a>

<style lang="scss">
@import '../../profile.scss';

a {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: $dark;
  line-height: 1.4em;

  background-color: $lighter;

  // width: 17em;
  // margin-bottom: 1em;
  border-bottom: 3px solid $secondary-dark;

  div {
    padding: .8em;
    border-top: none;
    position: relative;
    z-index: 0;
  }

  .title {
    font-weight: 475;
  }

  &:hover p {
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
}
</style>
