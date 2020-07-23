import { readdir, promises } from 'fs';
import frontmatter from '@github-docs/frontmatter';
// import { Post } from '@/components/database.js';
const dirname = './src/routes/blog/';
// import mongoose from 'mongoose';

function getMarkdownBlogs (path) {
	return new Promise((resolve, reject) => {

		readdir(dirname, function (err, files) {
			if (err) reject(err);
			let search = /.svx$/i;
			Promise.all(
				files
					.filter(d => d.match(search))
					.filter(d => !d.startsWith('_'))
					.map(file =>
							promises.readFile(dirname + file)
								.then(frontmatter)
								.then(({ data }) => data)
					)
			).then(resolve);
		});
	});
}


export async function get (req, res, next) {
	// let dbPosts = await Post.find();
	let mdPosts = await getMarkdownBlogs(dirname);

	const strip = p => ({ title: p.get('title'), slug: p.get('slug'), date: p.get('date') });

	let posts = mdPosts.filter(post => post.published);
	// posts = posts.concat(dbPosts.map(strip));

	res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(posts));
}
