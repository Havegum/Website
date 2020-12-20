<script>
export let href = '#';
</script>


<a {href}>
  <slot/>
  <div>
    <p><slot name="lead"/></p>
  </div>
</a>


<style>
a {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--dark);
  line-height: 1.4em;

  background-color: var(--lighter);

  border-bottom: 3px solid var(--secondary-dark);
}

div {
  padding: .8em;
  border-top: none;
  position: relative;
  z-index: 0;
}

a:hover p {
  text-decoration: underline;
}

p {
  margin: 0;
}
</style>
