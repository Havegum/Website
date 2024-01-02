<script>
export let dimensions = 1;

const toDice = max => (_, i) => Math.max(i + 1, max);

function generate (dims = 1, max = null) {
  if (dims === 1) {
    return Array(6).fill().map(toDice(max));
  }
  return Array(6).fill().map((_, i) => generate(dims - 1, Math.max(max, i+1)))
}
</script>



{#if dimensions === 1}
  <table class="one-dim">
    <tr>
      {#each generate(1) as n}
        <td class="dice-{n}">{n}</td>
      {/each}
    </tr>
  </table>

{:else if dimensions === 2}
  <table>
      <thead>
        <tr>
          <th/>
          {#each generate(1) as n}
            <th>{n}</th>
          {/each}
        </tr>
      </thead>
    {#each generate(2) as rows, n}
      <tr>
        <th>{n+1}</th>
        {#each rows as n}
          <td class="dice-{n}">{n}</td>
        {/each}
      </tr>
    {/each}
  </table>

{:else if dimensions === 3}
  <div class="stack">
    {#each generate(3).reverse() as slice, x}
      <table style="transform: translate({3 - x}em, {x - 1}em) scale({.9 + 0.05*x})">
        <thead>
          <tr>
            <th>{6 - x}</th>
            {#each generate(1) as n}
              <th>{x === 5 ? n : ''}</th>
            {/each}
          </tr>
        </thead>
        {#each slice as rows, y}
          <tr>
            <th>{x === 5 ? y+1 : ''}</th>
            {#each rows as n}
              <td class="dice-{n}">{n}</td>
            {/each}
          </tr>
        {/each}
      </table>
    {/each}
  </div>

{:else if dimensions === 4}
  <div class="stack-stack">
    {#each generate(4) as box, i}
      <div class="stack" style="z-index: {6 - i}">
        {#each box.reverse() as slice, i}
          <table style="transform: translate({3 - i}em, {i - 1}em)">
            {#each slice as rows}
              <tr>
                {#each rows as n}
                  <td class="dice-{n}">{n}</td>
                {/each}
              </tr>
            {/each}
          </table>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style lang="postcss">
.stack-stack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
}


.stack-stack .stack {
  font-size: .5em;
  display: relative;
}

.stack {
  display: grid;
  padding-bottom: 6em;
}

.stack table {
  grid-row: 1;
  grid-column: 1;
  opacity: 1;
}

.stack th {
  color: var(--gray-800);
  text-shadow:
    0 0 0.5px var(--white),
    0 0 1.0px var(--white),
    0 0 1.5px var(--white),
    0 0 2.0px var(--white),
    0 0 2.5px var(--white),
    0 0 3.0px var(--white),
    0 0 3.5px var(--white),
    0 0 4.0px var(--white),
    0 0 4.5px var(--white),
    0 0 5.0px var(--white),
    0 0 5.5px var(--white);
  border: none;
}

.stack table:hover ~ table td {
  color: transparent;
}

.stack table:hover ~ table {
  opacity: .2;
  filter: blur(.6em);
}

.stack table:hover + table + table {
  filter: blur(.7em);
}

.stack table:hover + table + table + table {
  filter: blur(.8em);
}

.stack table:hover + table + table + table + table {
  filter: blur(.9em);
}

.stack table:hover + table + table + table + table + table {
  filter: blur(1em);
}

.stack table:hover {
  opacity: 1;
}

table {
  table-layout: fixed;
  width: 12em;
  height: 12em;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: transparent;
  margin-bottom: 1em;
}

.one-dim {
  height: 2em;
}

th, td {
  color: var(--gray-800);
  font-weight: normal;
  border: 1px solid var(--white);
  text-align: center;
}

.dice-1,
.dice-2,
.dice-3 {
  color: var(--white);
  background-color: var(--red);
}

.dice-4,
.dice-5 {
  color: var(--gray-800);
  background-color: var(--gray-300);
}

.dice-6 {
  color: var(--white);
  background-color: var(--blue);
}
</style>
