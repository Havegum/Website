export function get (req, res) {
  res.writeHead(302, { location: 'en/about' });
  res.end();
}
