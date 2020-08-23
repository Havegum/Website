<script>
export let n = 0;
const dice = [1, 2, 3, 4, 5, 6];

function probability (result, n) {
	if (n === 0) return probability(7 - result, 2); // 0 dice is just the inverse of two dice
	return (result**n - (result-1)**n) / (6**n)
}

function toProbability (n) {
	return function (result) {
		return {
			result,
			value: probability(result, n)
		};
	};
}

function critProbability (n) {
	return 1/6 * (n < 2 ? 0 : probability(6, n-1));
}

$: data = dice.map(toProbability(+n));

const sum = (sum, next) => sum + next;
$: bad  = data.filter(d => d.result <= 3).map(d => d.value).reduce(sum);
$: good = data.filter(d => d.result >= 4).map(d => d.value).reduce(sum);
</script>


<tr class="row">
  <td class:first={n===0} class="dice">{n}</td>
	<td class:first={n===0} class="number bad">{Math.round(bad*100)}</td>

  <td class="bar" colspan="2">
    <div class="bar-inner">
      {#each data as data}
        <div
          class="part"
          class:bad={data.result < 4}
          style="flex-grow: {data.value}"
        />
      {/each}
      <svg class="highlight" style="width: {probability(6, n) * 100}%">
        <rect class="hatch-left" width="100%"/>
      </svg>
      <svg class="highlight" style="width: {critProbability(n) * 100}%">
        <rect class="hatch-right" width="100%"/>
      </svg>
    </div>
  </td>

	<td class:first={n===0} class="number good">{Math.round(good*100)}</td>
	<td class:first={n===0} class="number clean">{Math.round(probability(6, n)* 100)}</td>
	<td class:first={n===0} class="number crit">{Math.round(critProbability(n) * 100)}</td>
</tr>


<style lang="scss">
.row {
	// display: flex;
	* { flex: 1 0 0 }
  height: 2em;
  width: 100%;
	align-items: baseline;

  text-align: right;
	color: #2255e9;

	.bad { color: #da3125 }
  .good { flex-grow: 0 }

	td.bad, td.good {
		font-weight: bold;
		font-size: 1.1em;
	}

  .number {
    padding: 0 .5em;
  }

  .number::after {
    content: '%';
    display: inline;
    visibility: hidden;
  }

  .first::after {
    visibility: visible;
    color: var(--gray)
  }

  .dice {
    font-size: 1.4em;
    color: var(--dark);
    text-align: center;
  }
}

.bar {
  // display: grid;
  // align-content: center;
  height: inherit;
}

.bar-inner {
	height: 1em;
  width: 100%;
	display: inline-flex;
	position: relative;

	.part {
		flex: 0 0 0;
		height: 1em;
		background-color: var(--secondary-dark);

		&.bad {
			background-color: var(--tertiary);
		}
	}

	.highlight {
		position: absolute;
		top: 0;
		right: 0;
		height: 1em;

		.hatch-left {
			height: 100%;
			fill: url(#hatch-left);
		}

		.hatch-right {
			height: 100%;
			fill: url(#hatch-right);
		}
	}
}

</style>
