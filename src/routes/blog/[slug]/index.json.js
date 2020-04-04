import { Post } from '@/components/database.js';
// import mongoose from 'mongoose';

import bodyParser from 'body-parser';
const json = bodyParser.json();

let timeout = false;

// Matches local paths, like
// "./file.js", "dir/file.hash.js", "https://www.vegum.no/script.js"
let localHostedScripts = /(<script([^\>]+))(src=["']((https?:\/\/)?(www\.)?(halvard\.)?vegum\.no\/|((\.)?\/)?([^\/\.]+\/)*[^\/]*\.js))/gi;
let scriptMatch = /<script[^>]*>[^<]*<\/script>/gi;

export async function get(req, res) {
	const { slug } = req.params;
	const { dropNonce } = req.query;

	let post = await Post.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

	if (post) {
		let title = post.get('title');
		let body = post.get('body');

		if (!dropNonce) {
			body = body.replace(localHostedScripts, `$1nonce="${res.locals.nonce}" $3`);
		}

		let scripts = body.match(scriptMatch);
		// This is probably super inefficient ...
		scripts.forEach(script => body = body.replace(script, ''))

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ title, body, scripts }));

	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: `Not found` }));
	}
}


export async function put (req, res) {
	if (timeout) {
		res.writeHead(503, { 'Content-Type': 'application/json' });
		return res.end(JSON.stringify({ error: 'timeout' }));
	}
	timeout = true;
	setTimeout(() => timeout = false, 2000);

	json(req, res, function () {
		const { slug } = req.params;
		let { title, body, key } = req.body;

		title = title.trim();
    body = body.trim();
    key = key.trim();

		if (!title || !body || !key || !slug) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ error: 'empty fields' }));
		}

		if (key !== process.env.HOMEPAGE_POST_KEY) {
			res.writeHead(403, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ error: 'bad key' }));
		}

		Post.updateOne({ slug }, { title, body }, async function (err, query) {
			if (!err && query.nModified === 1) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				return res.end(JSON.stringify({ message: 'OK!', slug }))
			}

			let post = new Post({ title, body, slug });
			post.save(function (err) {
				if (err) {
					res.writeHead(502, { 'Content-Type': 'application/json' });
					return res.end(JSON.stringify({ error: 'database error' }));
				}
				res.writeHead(200, { 'Content-Type': 'application/json' });
				return res.end(JSON.stringify({ message: 'OK!', slug }))
			});
		});
	});
}


export async function del (req, res) {
	if (timeout) {
		res.writeHead(503, { 'Content-Type': 'application/json' });
		return res.end(JSON.stringify({ error: 'timeout' }));
	}
	timeout = true;
	setTimeout(() => timeout = false, 2000);

	json(req, res, async function () {
		const { slug } = req.params;
		let { key } = req.body;

		if (key !== process.env.HOMEPAGE_POST_KEY) {
			res.writeHead(403, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ error: 'bad key' }));
		}

		let post = await Post.deleteOne({ slug });
		return res.end(JSON.stringify({ message: 'OK' }));
	});
}
