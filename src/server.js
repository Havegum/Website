import sirv from 'sirv';
import polka from 'polka';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

let app = polka();
app.use(sirv('static', { dev }));
app.use(sapper.middleware());
app.listen(PORT, err => err && console.log('error', err));
