import sirv from 'sirv';
import polka from 'polka';
// import helmet from 'helmet';
import compression from 'compression';
import * as sapper from '@sapper/server';

import tracker from './view-tracker.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const languageRedirect = (res, path) => {
	res.writeHead(302, { location: `${path}?lang=en` });
  res.end();
}

let app = polka();

app.get('/en/', (_, res) =>	languageRedirect(res, '/'))
	 .get('/en/*', ({ url }, res) => languageRedirect(res, url.slice(3)));

// app.use(helmet());
app.use(tracker);
app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(sapper.middleware());

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
