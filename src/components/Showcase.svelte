<script>
export let href = '#';
export let title = '';
export let lead = '';

let hover = false;
</script>

<a class="{$$props.class}" {href} on:mouseover={() => hover = true} on:mouseout={() => hover = false}>
  <slot {hover}></slot>
  <div>
    <p class="title">{title}</p>
    <p>{lead}</p>
  </div>
</a>

<style lang="scss">
@import '../profile.scss';

a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: $paragraph;
  line-height: 1.4em;

  background-color: $light;

  width: 17em;
  margin-bottom: 1em;

  div {
    padding: .8em;
    border-bottom: 3px solid $secondary-dark;
    // border-bottom-color: $secondary-dark;
    border-top: none;
  }

  .title {
    font-weight: 475;
  }

  &:hover .title {
    text-decoration: underline;
  }

  p {
    margin: 0;
  }
}
</style>
