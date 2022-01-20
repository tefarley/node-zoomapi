const Koa = require('koa');
const Router = require('@koa/router');
const body = require('koa-body');
const cors = require('@koa/cors');
const logger = require('koa-logger');

const users = require('./routes/users');
const meetings = require('./routes/meetings');
const oauth = require('./routes/oauth');
const oauth2 = require('./routes/oauth2');

const app = new Koa();
const router = new Router();

// Koa middleware.
app.use(body());
app.use(cors({
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(logger());

const routes = [users, meetings, oauth, oauth2];

app.use(router.routes());
app.use(router.allowedMethods());

routes.map((route) => {
    app.use(route.routes());
    app.use(route.allowedMethods());
});

app.listen(9999);