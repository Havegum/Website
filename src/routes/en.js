export function get (_, res) {
  res.writeHead(302, { location: `/?lang=en` });
  res.end();
}
