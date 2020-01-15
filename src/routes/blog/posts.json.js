import Post from './_post.js';

import mongoose from 'mongoose';

export async function get (req, res, next) {
	let posts = await Post.find();

	res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(posts));
}
