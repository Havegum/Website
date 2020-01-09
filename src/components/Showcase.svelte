<script>
export let href = '#';
export let lead = '';
export let employer = '';

let hover = false;
</script>

<a class="{$$props.class}" {href} on:mouseover={() => hover = true} on:mouseout={() => hover = false}>
  <slot {hover}></slot>
  <div>
    <p class="lead">{lead}</p>
    <p>{employer}</p>
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

  background-color: $lighter;

  width: 17em;
  margin-bottom: 1em;

  div {
    padding: .8em
  }

  .lead {
    font-variation-settings: $bold;
  }

  &:hover .lead {
    text-decoration: underline;
  }

  p {
    font-variation-settings: $normal;
    // text-decoration: none !important;
  }
}
</style>
