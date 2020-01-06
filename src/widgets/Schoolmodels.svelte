<script>
import { onMount } from 'svelte';
import { cubicInOut } from 'svelte/easing';

let circles = [ "st4", "st4", "st4", "st1", "st1", "st1", "st1", "st1", "st1", "st1", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st3", "st4", "st4", "st4", "st4", "st4", "st4", "st4", "st4", "st4", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5", "st5" ];

let arr = [
	{ x: 60.1,  y: 141.7, activex: 60.1,  activey: 141.7 }, /*" 0":  */
	{ x: 43.1,  y: 128.7, activex: 43.1,  activey: 128.7 }, /*" 1":  */
	{ x: 21.1,  y: 121.7, activex: 21.1,  activey: 121.7 }, /*" 2":  */
	{ x: 50.1,  y: 137.7, activex: 50.1,  activey: 137.7 }, /*" 3":  */
	{ x: 133.1, y: 131.7, activex: 133.1, activey: 131.7 }, /*" 4":  */
	{ x: 42.1,  y: 144.7, activex: 42.1,  activey: 144.7 }, /*" 5":  */
	{ x: 24.1,  y: 133.7, activex: 24.1,  activey: 133.7 }, /*" 6":  */
	{ x: 35.1,  y: 135.7, activex: 35.1,  activey: 135.7 }, /*" 7":  */
	{ x: 30.1,  y: 114.7, activex: 30.1,  activey: 114.7 }, /*" 8":  */
	{ x: 52.1,  y: 122.7, activex: 52.1,  activey: 122.7 }, /*" 9":  */
	{ x: 60.1,  y: 109.7, activex: 60.1,  activey: 109.7 }, /*"10": */
	{ x: 159.1, y: 115.7, activex: 159.1, activey: 115.7 }, /*"11": */
	{ x: 175.1, y: 131.7, activex: 175.1, activey: 131.7 }, /*"12": */
	{ x: 144.1, y: 129.7, activex: 144.1, activey: 129.7 }, /*"13": */
	{ x: 257.1, y: 143.7, activex: 257.1, activey: 143.7 }, /*"14": */
	{ x: 239.1, y: 120.7, activex: 239.1, activey: 120.7 }, /*"15": */
	{ x: 253.1, y: 133.7, activex: 253.1, activey: 133.7 }, /*"16": */
	{ x: 236.1, y: 138.7, activex: 236.1, activey: 138.7 }, /*"17": */
	{ x: 252.1, y: 122.7, activex: 252.1, activey: 122.7 }, /*"18": */
	{ x: 262.1, y: 127.7, activex: 262.1, activey: 127.7 }, /*"19": */
	{ x: 266.1, y: 137.7, activex: 266.1, activey: 137.7 }, /*"20": */
	{ x: 277.1, y: 118.7, activex: 277.1, activey: 118.7 }, /*"21": */
	{ x: 40.1,  y: 118.7, activex: 40.1,  activey: 118.7 }, /*"22": */
	{ x: 63.1,  y: 120.7, activex: 63.1,  activey: 120.7 }, /*"23": */
	{ x: 50.1,  y: 112.7, activex: 50.1,  activey: 112.7 }, /*"24": */
	{ x: 138.1, y: 120.7, activex: 138.1, activey: 120.7 }, /*"25": */
	{ x: 156.1, y: 125.7, activex: 156.1, activey: 125.7 }, /*"26": */
	{ x: 232.1, y: 128.7, activex: 232.1, activey: 128.7 }, /*"27": */
	{ x: 70.1,  y: 128.7, activex: 70.1,  activey: 128.7 }, /*"28": */
	{ x: 164.1, y: 133.7, activex: 164.1, activey: 133.7 }, /*"29": */
	{ x: 245.1, y: 111.7, activex: 245.1, activey: 111.7 }, /*"30": */
	{ x: 256.1, y: 112.7, activex: 256.1, activey: 112.7 }, /*"31": */
	{ x: 60.1,  y: 130.7, activex: 60.1,  activey: 130.7 }, /*"32": */
	{ x: 171.1, y: 113.7, activex: 171.1, activey: 113.7 }, /*"33": */
	{ x: 179.1, y: 121.7, activex: 179.1, activey: 121.7 }, /*"34": */
	{ x: 168.1, y: 123.7, activex: 168.1, activey: 123.7 }, /*"35": */
	{ x: 141.1, y: 110.7, activex: 141.1, activey: 110.7 }, /*"36": */
	{ x: 153.1, y: 135.7, activex: 153.1, activey: 135.7 }, /*"37": */
	{ x: 266.1, y: 117.7, activex: 266.1, activey: 117.7 }, /*"38": */
	{ x: 243.1, y: 130.7, activex: 243.1, activey: 130.7 }, /*"39": */
	{ x: 246.1, y: 142.7, activex: 246.1, activey: 142.7 }, /*"40": */
	{ x: 160.1, y: 143.7, activex: 160.1, activey: 143.7 }, /*"41": */
	{ x: 273.1, y: 128.7, activex: 273.1, activey: 128.7 }, /*"42": */
	{ x: 141.1, y: 139.7, activex: 141.1, activey: 139.7 }, /*"43": */
	{ x: 127.1, y: 122.7, activex: 127.1, activey: 122.7 }, /*"44": */
	{ x: 148.1, y: 118.7, activex: 148.1, activey: 118.7 }, /*"45": */
	{ x: 31.1,  y: 125.7, activex: 31.1,  activey: 125.7 }  /*"46": */
];

export let hover = false;
let interval;
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
	if (hover) i = 0;

	shuffle(arr);

	let start = null;
	window.requestAnimationFrame(function step (timestamp) {
		if (!start) start = timestamp;
		let progress = timestamp - start;
		ease(progress / 500);
		if (progress < 500) window.requestAnimationFrame(step);
	});

	i++;
	if (i > 1) {
		clearInterval(interval);
		interval = null;
	}
}


function start () {
	i = 0;
	if (interval) return;
	if (hover) animate();
	interval = setInterval(animate, 1000);
}


function shuffle (a) {
	let indices = Array(arr.length).fill().map((_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
  }

	for (let i = 0; i < indices.length; i++) {
		a[i].activex = a[i].targetx || a[i].x;
		a[i].activey = a[i].targety || a[i].y;

		a[i].targetx = a[indices[i]].activex;
		a[i].targety = a[indices[i]].activey;
	}

  return a;
}


onMount(() => setTimeout(start, 3000));
</script>

<style lang="scss">
@import '../profile.scss';

svg {
	display: block;
	width: 100%;
	height: auto;

	.st0 { fill: $secondary }
	.st1 { fill: #74A7EF }
	.st2 { fill: #4A79E0 }
	.st3 { fill: #204BD0 }
	.st4 { fill: #5888E5 }
	.st5 { fill: #3C6ADA }
}
</style>

<svg version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xml:space="preserve"
		alt="Illustrasjon av en sak om skoleinntaksmodeller"
		x="0px"
		y="0px"
		width="300px"
		height="190px"
		viewBox="0 0 300 190"
		style="enable-background:new 0 0 300 190;">
	<rect class="st0" width="300" height="190"/>
	<path class="st1" d="M69,85H57V74h12V85z M57,67V53L44.5,38.2L32,53v14H15v26h17h12.9h12.9H75V67H57z M44.9,49.9 c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7c-3.1,0-5.7-2.5-5.7-5.7C39.2,52.4,41.8,49.9,44.9,49.9z M32,85H21V74h11V85z M51,85 h-6.1H39V74h5.9H51V85z"/>
	<path class="st2" d="M174,85h-11V74h11V85z M163,67V53l-13-14.8L137,53v14h-17v26h17.2h12.9H163h17V67H163z M150.1,49.9c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7s-5.7-2.5-5.7-5.7C144.4,52.4,146.9,49.9,150.1,49.9z M137,85h-11V74h11 V85z M156,85h-5.9H144V74h6.1h5.9V85z"/>
	<path class="st3" d="M279,85h-11V74h11V85z M268,67V53l-12.5-14.8L243,53v14h-18v26h17.3h12.9h12.9H285V67H268z M255.2,49.9c3.1,0,5.7,2.5,5.7,5.7c0,3.1-2.5,5.7-5.7,5.7s-5.7-2.5-5.7-5.7C249.5,52.4,252.1,49.9,255.2,49.9z M243,85h-12V74h12 V85z M261,85h-5.8H249V74h6.2h5.8V85z"/>

	{#each circles as style, i}
		<circle class={style} cx={arr[i].x} cy={arr[i].y} r="5" />
	{/each}
</svg>
