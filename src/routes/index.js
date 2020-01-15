export function get (req, res) {
  let location = 'about'
  if (req.query.lang) location += '?lang=' + req.query.lang.toLowerCase();

  res.writeHead(302, { location });
  res.end();
}
