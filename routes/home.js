const Router = require('@koa/router');
const config = require('../config/config');

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = (`
        Hello! :)
        Welcome to the Node.js Zoom API.
    `);
});

module.exports = router;