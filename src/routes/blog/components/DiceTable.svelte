<script>
import Row from './DiceRow.svelte';
</script>


<svg>
	<defs>
		<line id="line" x1="5" y1="0" x2="5" y2="10" stroke="var(--blue)" stroke-width="4.5"/>

		<pattern id="hatch-left" x="0" y="0" height="10" width="10" patternTransform="rotate(-45, 5, 5) scale(.4, 1)" patternUnits="userSpaceOnUse">
			<use href="#line"/>
		</pattern>

		<pattern id="hatch-right" x="0" y="0" height="10" width="10" patternTransform="rotate(45, 5, 5) scale(.4, 1)" patternUnits="userSpaceOnUse">
			<use href="#line"/>
		</pattern>
	</defs>
</svg>
<table>
		<thead>
			<tr>
				<th>dice</th>
				<th class="align-left span" colspan="2">bad outcome</th>
				<th class="align-right span" colspan="2">good outcome</th>
				<th class="align-right">clean six</th>
				<th class="align-right">crit</th>
			</tr>
		</thead>
	{#each [0, 1, 2, 3, 4, 5, 6, 7] as n}
		<tbody>
			<Row {n} />
		</tbody>
	{/each}
</table>


<style>
table {
	table-layout: fixed;
	border-collapse: collapse;
	width: 100%;
}

tbody {
	padding: .2em 1em;
}

tbody:nth-child(2n) {
	background-color: var(--gray-100);
}

th {
	width: 100%;
  color: var(--gray-600);
  line-height: 1.2;
  vertical-align: bottom;
  padding-bottom: .5em;
}

th.align-right {
	text-align: right;
	padding-right: 1.2em;
}

th.align-left {
	text-align: left;
}

th.span {
	width: 200%;
}

svg {
	position: absolute;
	width: 0;
	height: 0;
}
</style>
