<div class="background select-none -z-1">
	<img class="sky bg-gray-100 object-top" src="sky.png" role="presentation" alt="" />
	<img class="left shoulder"  src="left-shoulder.png" role="presentation" alt="" />
	<img class="right shoulder" src="right-shoulder.png" role="presentation" alt="" />
	<img class="ground"         src="ground.svg" role="presentation" alt="" />
</div>



<style>
img {
	@apply w-full absolute left-0 right-0 top-0 bottom-0 object-none;
}

.sky {
	height: 27em;
}

.shoulder {
	@apply w-2/5;
	@apply h-full;
}

.shoulder.left {
	object-position: top right;
	right: 60%;
}

.shoulder.right {
	object-position: top left;
	left: 60%;
}

.ground {
	top: 543px;
	object-position: center top;
	min-height: 5em;
	max-height: 20em;
	object-fit: cover;
}
</style>
