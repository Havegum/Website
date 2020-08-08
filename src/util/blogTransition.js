import { assign, is_function } from 'svelte/internal';
import { cubicOut } from 'svelte/easing';

function crossfade({ fallback, ...defaults }) {
	let to_receive = new Map();
	let to_send = new Map();

	function crossfade(from, node, params) {
		const {
			delay = 0,
			duration = d => Math.sqrt(d) * 30,
			easing = cubicOut
		} = assign(assign({}, defaults), params);

    const to = node.getBoundingClientRect();
		const dx = from.left - to.left;
		const dy = from.top - to.top;
		const dw = from.width / to.width;
		const dh = from.height / to.height;
		const d = Math.sqrt(dx * dx + dy * dy);

		let css;
		if (node instanceof SVGElement) {
			css = (t, u) => `
				x: ${u * dx}px;
				y: ${u * (dy + params.scrollY)}px;
				width: calc(${100*t}% + ${from.width * u}px);
				height: calc(${100*t}% + ${from.height * u}px);
			`
		} else {
      css = (t, u) => `
				transform-origin: top left;
				transform: translate(${u * dx}px,${u * dy}px) scale(${t + (1-t) * dw}, ${t + (1-t) * dh});
			`
		}

		return {
			delay,
			duration: is_function(duration) ? duration(d) : duration,
			easing,
			fallback: () => ``,
			css
		};
	}

	function transition(items, counterparts, intro) {
		return (node, params) => {
			items.set(params.key, {
				rect: node.getBoundingClientRect()
			});

			return () => {
				if (counterparts.has(params.key)) {
					const { rect } = counterparts.get(params.key);
					counterparts.delete(params.key);

					return crossfade(rect, node, params);
				}

				// if the node is disappearing altogether
				// (i.e. wasn't claimed by the other list)
				// then we need to supply an outro
				items.delete(params.key);
				return fallback && fallback(node, params, intro);
			};
		};
	}

	return [
		transition(to_send, to_receive, false),
		transition(to_receive, to_send, true)
	];
}



const [send, receive] = crossfade({
  duration: 1000
});

export { send, receive };
