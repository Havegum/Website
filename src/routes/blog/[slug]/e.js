export function get ({ params }, res) {
  res.writeHead(302, { location: `/blog/${params.slug}/edit` });
  res.end();
}
