<script>
export let href = '#';
export let title = '';
export let lead = '';

</script>

<a {href}>
  <div>
    <p class="title">{title}</p>
    <p>{lead}</p>
  </div>
</a>

<style lang="scss">
@import '../../profile.scss';

a {
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
