import Post from '@/components/Post.js';
import mongoose from 'mongoose';

export async function get (req, res, next) {
	let posts = await Post.find();

	const strip = p => ({ title: p.get('title'), slug: p.get('slug'), date: p.get('date') });

	res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(posts.map(strip)));
}
