<div class="background">
	<img role="presentation" alt="" class="sky" src="sky.png"/>
	<img role="presentation" alt="" class="left shoulder" src="left-shoulder.png"/>
	<img role="presentation" alt="" class="right shoulder" src="right-shoulder.png"/>
	<img role="presentation" alt="" class="ground" src="ground.svg"/>
	<!-- <img role="presentation" alt="" class="footer-hat" src="footer-hat.svg"/> -->
</div>



<style lang="scss">
@import '../profile.scss';

.background {
	user-select: none;
	background: $secondary;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
	z-index: -1;

	img {
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		object-fit: none;
	}

	.sky {
		background-color: $light;
		object-position: top center;
		height: 27em;
	}

	.shoulder {
		width: 40%;
		height: 100%;
		&.left {
			object-position: top right;
			right: 60%;
		}
		&.right {
			object-position: top left;
			left: 60%;
		}
	}

	.ground {
		top: 543px;
		object-position: center top;
		height: 100%;
		min-height: 5em;
		max-height: 20em;
		object-fit: cover;
	}

	.footer-hat {
		top: auto;
		bottom: 9em;
		object-position: center bottom;
		height: 100%;
		min-height: 5em;
		max-height: 5vh;
		object-fit: cover;
		display: none;

		@media screen and (min-height: 900px) { display: block }
	}
}
</style>
