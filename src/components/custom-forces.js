import { quadtree } from 'd3-quadtree';

export function forceCollide () {
	let nodes;

	function collide (node) {
		// From http://bl.ocks.org/natebates/273b99ddf86e2e2e58ff
		return function ({ data: other }, x1, y1, x2, y2) {
			let updated = false;
			if (other && (other !== node)) {

				let x = node.x - other.x;
				let y = node.y - other.y;

				let xSpacing = ((other.width || 65) + (node.width || 65)) / 2;
				let ySpacing = ((other.height || 16) + (node.height || 16)) / 2;

				let absX = Math.abs(x);
				let absY = Math.abs(y);

				if (absX < xSpacing && absY < ySpacing) {
					let l = Math.sqrt(x * x + y * y);

					let lx = (absX - xSpacing) / l;
					let ly = (absY - ySpacing) / l;

					// the one that's barely within the bounds probably triggered the collision
					if (Math.abs(lx) > Math.abs(ly)) {
						lx = 0;
					} else {
						ly = 0;
					}

					node.x -= x *= lx;
					node.y -= y *= ly;
					other.x += x;
					other.y += y;

					updated = true;
				}
			}
			return updated;
		};
	}

	function force (alpha) {
		let tree = quadtree(nodes, d => d.x, d => d.y)

	  for (const node of nodes) {
	    tree.visit(collide(node));
	  }
	}

  force.initialize = argNodes => nodes = argNodes;
  return force;
}

export function forceBound (width, height, factor=0.75) {
  let nodes;

  function force (alpha) {
    for (let node of nodes) {
      let nWidth = (node.width || 65) / 2;
      let nHeight = (node.height || 16) / 2;

      if (node.x + nWidth >= width) {
        node.vx -= (node.x + nWidth - width) * alpha * factor;

      } else if (node.x - nWidth <= 0) {
        node.vx -= (node.x - nWidth) * alpha * factor;
      }

      if (node.y + nHeight >= height) {
        node.vy -= (node.y + nHeight - height) * alpha * factor;

      } else if (node.y - nHeight <= 0) {
        node.vy -= (node.y - nHeight) * alpha * factor;
      }
    }
  }

  force.initialize = argNodes => nodes = argNodes;
  return force;
}
