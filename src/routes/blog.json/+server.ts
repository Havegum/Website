import { readdir, promises } from 'fs';
import frontmatter from '@github-docs/frontmatter';
const dirname = './src/routes/blog/';
import type { RequestHandler } from './$types';

function getMarkdownBlogs(path: string) {
	return new Promise((resolve, reject) => {
		readdir(dirname, function (err, files) {
			if (err) reject(err);
			const search = /.svx$/i;
			Promise.all(
				files
					.filter((d) => d.match(search))
					.filter((d) => !d.startsWith('_'))
					.map((file) =>
						promises
							.readFile(dirname + file)
							.then(frontmatter)
							.then(({ data }) => data)
					)
			).then(resolve);
		});
	});
}

export const GET: RequestHandler = async () => {
	const mdPosts = await getMarkdownBlogs(dirname);

	// const strip = p => ({ title: p.get('title'), slug: p.get('slug'), date: p.get('date') });

	const posts = mdPosts.filter((post) => post.published);

	return new Response(JSON.stringify(posts));
};
