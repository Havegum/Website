import { error } from '@sveltejs/kit';
export async function load({ params, fetch }) {
	const res = await fetch(`./blog.json`);
	const posts = await res.json();

	if (res.status === 200) {
		return { posts };
	} else {
		error({ status: res.status, message: data.message });
	}
}
