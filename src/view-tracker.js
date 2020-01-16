export default function tracker (req, res, next) {
  // if (req.headers.accept.includes('text/html')) {
    console.log('tracked!');
    console.log(req.headers);
  // }
  next();
}
