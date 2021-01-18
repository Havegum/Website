<script>
export let href = '#';
export let title = '';
export let lead = '';

let _class;
export { _class as class };

let hover = false;
</script>

<a class={_class} {href} on:mouseover={() => hover = true} on:mouseout={() => hover = false}>
  <slot {hover}></slot>
  <div>
    <p class="title">{title}</p>
    <p>{lead}</p>
  </div>
</a>

<style>
a {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--gray-900);
  line-height: 1.4em;

  background-color: var(--white-100);

  width: 17em;
  margin-bottom: 1em;
  border-bottom: 3px solid var(--blue-400);
}

div {
  padding: .8em;
  border-top: none;
}

.title {
  font-weight: 475;
}

a:hover .title {
  text-decoration: underline;
}

p {
  margin: 0;
}
</style>
