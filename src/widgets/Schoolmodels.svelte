<script>
import { onMount } from 'svelte';

let arr = [
	{ style: "st4", x: 60.1,  y: 141.7 },
	{ style: "st4", x: 43.1,  y: 128.7 },
	{ style: "st4", x: 21.1,  y: 121.7 },
	{ style: "st1", x: 50.1,  y: 137.7 },
	{ style: "st1", x: 133.1, y: 131.7 },
	{ style: "st1", x: 42.1,  y: 144.7 },
	{ style: "st1", x: 24.1,  y: 133.7 },
	{ style: "st1", x: 35.1,  y: 135.7 },
	{ style: "st1", x: 30.1,  y: 114.7 },
	{ style: "st1", x: 52.1,  y: 122.7 },
	{ style: "st3", x: 60.1,  y: 109.7 },
	{ style: "st3", x: 159.1, y: 115.7 },
	{ style: "st3", x: 175.1, y: 131.7 },
	{ style: "st3", x: 144.1, y: 129.7 },
	{ style: "st3", x: 257.1, y: 143.7 },
	{ style: "st3", x: 239.1, y: 120.7 },
	{ style: "st3", x: 253.1, y: 133.7 },
	{ style: "st3", x: 236.1, y: 138.7 },
	{ style: "st3", x: 252.1, y: 122.7 },
	{ style: "st3", x: 262.1, y: 127.7 },
	{ style: "st3", x: 266.1, y: 137.7 },
	{ style: "st3", x: 277.1, y: 118.7 },
	{ style: "st3", x: 40.1,  y: 118.7 },
	{ style: "st4", x: 63.1,  y: 120.7 },
	{ style: "st4", x: 50.1,  y: 112.7 },
	{ style: "st4", x: 138.1, y: 120.7 },
	{ style: "st4", x: 156.1, y: 125.7 },
	{ style: "st4", x: 232.1, y: 128.7 },
	{ style: "st4", x: 70.1,  y: 128.7 },
	{ style: "st4", x: 164.1, y: 133.7 },
	{ style: "st4", x: 245.1, y: 111.7 },
	{ style: "st4", x: 256.1, y: 112.7 },
	{ style: "st5", x: 60.1,  y: 130.7 },
	{ style: "st5", x: 171.1, y: 113.7 },
	{ style: "st5", x: 179.1, y: 121.7 },
	{ style: "st5", x: 168.1, y: 123.7 },
	{ style: "st5", x: 141.1, y: 110.7 },
	{ style: "st5", x: 153.1, y: 135.7 },
	{ style: "st5", x: 266.1, y: 117.7 },
	{ style: "st5", x: 243.1, y: 130.7 },
	{ style: "st5", x: 246.1, y: 142.7 },
	{ style: "st5", x: 160.1, y: 143.7 },
	{ style: "st5", x: 273.1, y: 128.7 },
	{ style: "st5", x: 141.1, y: 139.7 },
	{ style: "st5", x: 127.1, y: 122.7 },
	{ style: "st5", x: 148.1, y: 118.7 },
	{ style: "st5", x: 31.1,  y: 125.7 }
];

export let hover = false;
let interval = null;
let i = 0;

$: if (hover) start();


function ease (t) {
	let i = cubicInOut(t);
	arr = arr.map(d => {
		d.x = i * d.targetx + (1 - i) * d.activex;
		d.y = i * d.targety + (1 - i) * d.activey;
		return d;
	});
}


function animate () {
	if (i > 2) {
		clearInterval(interval);
		interval = null;
	}

	arr = shuffle(arr);
	i++;
}


function start () {
	if (hover) i = 0;
	if (interval) return;
	if (hover) animate();
	interval = setInterval(animate, 1000);
}




function shuffle (a) {
	let idx = Array(arr.length).fill().map((_, i) => i);

  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
		[idx[i], idx[j]] = [idx[j], idx[i]];
  }

	for (let i = 0; i < idx.length; i++) {
		a[i].activex = a[i].targetx || a[i].x;
		a[i].activey = a[i].targety || a[i].y;

		a[i].x = a[i].activex;
		a[i].y = a[i].activey;
	}

	for (let i = 0; i < idx.length; i++) {
		let j = idx[i];
		a[i].targetx = a[j].activex;
		a[i].targety = a[j].activey;
	}

  return a;
}


onMount(() => setTimeout(start, 3000));
</script>

<style>
svg {
	display: block;
	width: 100%;
	height: auto;
}

circle {
	will-change: transform;
	transition: transform 300ms cubic-bezier(0.65, 0, 0.35, 1);
}

.st0 { fill: var(--secondary) }
.st1 { fill: #74A7EF }
.st2 { fill: #4A79E0 }
.st3 { fill: #204BD0 }
.st4 { fill: #5888E5 }
.st5 { fill: #3C6ADA }
</style>

<svg version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xml:space="preserve"
		aria-hidden="true"
		x="0px"
		y="0px"
		width="300px"
		height="190px"
		viewBox="0 0 300 190"
		>
	<rect class="st0" width="300" height="190"/>
	<path class="st1" d="M69,85H57V74h12V85z M57,67V53L44.5,38.2L32,53v14H15v26h17h12.9h12.9H75V67H57z M44.9,49.9 c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7c-3.1,0-5.7-2.5-5.7-5.7C39.2,52.4,41.8,49.9,44.9,49.9z M32,85H21V74h11V85z M51,85 h-6.1H39V74h5.9H51V85z"/>
	<path class="st2" d="M174,85h-11V74h11V85z M163,67V53l-13-14.8L137,53v14h-17v26h17.2h12.9H163h17V67H163z M150.1,49.9c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7s-5.7-2.5-5.7-5.7C144.4,52.4,146.9,49.9,150.1,49.9z M137,85h-11V74h11 V85z M156,85h-5.9H144V74h6.1h5.9V85z"/>
	<path class="st3" d="M279,85h-11V74h11V85z M268,67V53l-12.5-14.8L243,53v14h-18v26h17.3h12.9h12.9H285V67H268z M255.2,49.9c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7s-5.7-2.5-5.7-5.7C249.5,52.4,252.1,49.9,255.2,49.9z M243,85h-12V74h12 V85z M261,85h-5.8H249V74h6.2h5.8V85z"/>

	{#each arr as d, i}
		<circle
			style="transform: translate3d({d.x}px, {d.y}px, 0); transition-delay: {i*10}ms"
			class={d.style}
			r="5"
		/>
	{/each}
	<!-- cx={d.x}
	cy={d.y} -->
</svg>
