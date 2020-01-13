<div class="{$$props.class || ''}">
  <slot></slot>
</div>

<style lang="scss">
@import '../profile.scss';
div {
  width: 100%;
  position: relative;
  left: -1em;
  top: -1em;
  margin-bottom: -1em;

  @media screen and (min-width: $mobile) {
    left: -2em;
    top: -2em;
    margin-bottom: -2em;
  }
}
</style>
