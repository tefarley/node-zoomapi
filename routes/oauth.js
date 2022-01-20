const Router = require('@koa/router');
const axios = require('axios');
const config = require('../config/config')

const router = new Router();

router.get('/oauth', (ctx) => {
    if(!ctx.request.query.code) {
        ctx.redirect(config.oauth.grantCodeURL);
    } else {
        const grantTokenURL = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + ctx.request.query.code + '&redirect_uri=' + config.oauth.redirectURL;

        axios({
            method: 'POST',
            url: grantTokenURL,
            headers: {
                'Authorization': `Basic ${config.oauth.clientBasicToken}`,
            }
        }).then((res) => {
            let data = res.data;

            if (data.access_token) {
                console.log(data);
                ctx.token = data.access_token;
                ctx.body = data;
            } else {
                console.error('No access token in axios response');
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    return;
});

module.exports = router;