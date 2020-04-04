import sirv from 'sirv';
import polka from 'polka';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import compression from 'compression';
import * as sapper from '@sapper/server';

import tracker from './view-tracker.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const languageRedirect = (res, url) => {
	res.writeHead(302, { location: url + `?lang=en` });
  res.end();
}

let app = polka();

app.use((req, res, next) => {
	if (!res.locals) res.locals = {};
	res.locals.nonce = uuidv4();
	next();
});

app.get('/en/', (_, res) =>	languageRedirect(res, '/'))
	 .get('/en/*', ({ url }, res) => languageRedirect(res, url.slice(3)));

app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			scriptSrc: [
				"'self'",
				"'unsafe-eval'",
				(req, res) => `'nonce-${res.locals.nonce}'`
			]
		}
	}
}));
app.use(tracker);
app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(sapper.middleware());

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
