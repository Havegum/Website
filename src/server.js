import sirv from 'sirv';
import polka from 'polka';
// import helmet from 'helmet';
import compression from 'compression';
import * as sapper from '@sapper/server';

import tracker from './view-tracker.js';

const { HOMEPAGE_PORT: PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


let app = polka();
// app.use(helmet());
app.use(tracker);
app.use(compression({ threshold: 0 }));
app.use(sirv('static', { dev }));
app.use(sapper.middleware());

app.listen(PORT, err => {
	if (err) console.log('error', err);
});
