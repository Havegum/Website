import Post from '@/components/Post.js';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
const json = bodyParser.json();

let timeout = false;

export async function post (req, res) {
  if (timeout) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'timeout' }));
  }

  timeout = true;
  setTimeout(() => timeout = false, 2000);

  json(req, res, function () {
    let { title, body, key } = req.body;

    title = title.trim();
    body = body.trim();
    key = key.trim();

    if (!title || !body || !key) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'empty fields' }));
    }

    if (key !== process.env.POST_KEY) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'bad key' }));
    }

    let slug = title.toLowerCase().replace(/ /g, '-');

    let post = new Post({ title, body, slug });


    post.save(function (err) {
      if (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'database error' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'OK!' }))
    });
  });
}
