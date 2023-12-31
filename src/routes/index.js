export function get (req, res) {
  res.writeHead(302, { location: 'om-meg' });
  res.end();
}
