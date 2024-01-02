import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const data = await import(`../${params.slug}.svx`);
		const render = data.default.render();

		return { ...data.metadata, html: render.html, css: render.css.code };
	} catch (err) {
		error(err.message);
	}
}
