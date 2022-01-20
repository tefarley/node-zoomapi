const Koa = require('koa');
const Router = require('@koa/router');
const body = require('koa-body');
const cors = require('@koa/cors');
const Logger = require('koa-logger');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const axios = require('axios');

const app = new Koa();
const router = new Router();

// Koa middleware.
app.use(body());
app.use(cors({
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(Logger());

const token = Buffer.from(`${config.oauth.clientID}:${config.oauth.clientSecret}`, 'utf8').toString('base64');

let access_token = '';


router.get('/', (ctx) => {
    console.log(ctx.request.query);
    if (ctx.request.query.code) {
        let url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${ctx.request.query.code}&redirect_uri=${config.oauth.redirectURL}`;
        console.log(url);
        
        axios({
            method: 'POST',
            url: url.toString(),
            headers: {
                'Authorization': `Basic ${token}`,
            }
        }).then((res) => {
            let data = res.data

            console.log(`access_token: ${data.access_token}`);
            console.log(`refresh_token: ${data.refresh_token}`);

            if (data.access_token) {
                access_token = data.access_token;

                axios({
                    method: 'GET',
                    url: `${config.zoom.baseURL}/users/me`,
                    headers: {
                        'Authorization': `Bearer ${data.access_token}`
                    }
                }).then((res) => {
                    console.log(res.data);                    
                }).catch((err) => {
                    console.error(err);
                });
            } else {

            }
        }).catch((err) => {
            console.error(err);
        });

        return;
    }

    ctx.redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${config.oauth.clientID}&redirect_uri=${config.oauth.redirectURL}`);
});

router.get('/users/:userId', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}`,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
})

router.get('/users', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users`,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
})

router.get('/createUser', (ctx) => {
    ctx.body = { Title: 'User Management'};
});

router.post('/createUser', (ctx) => {
    const exampleBody = {
        first_name: 'devtester',
        last_name: 'acct.',
        email: 'tedefarley+zoom-example@gmail.com',
        password: '9pBG.#$zu2328',
        user_info: 'test'
    };
    
    axios({
        method: 'POST',
        url: `${config.zoom.baseURL}/users`,
        body: exampleBody,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/listMeetings/:userId', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}/meetings`,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
})

router.post('/createMeeting/:userId', (ctx) => {
    const exampleBody = {
        topic: 'Meeting',
        type: 1,
        settings: {
            host_video: true,
            participant_video: true
        }
    };    
    
    axios({
        method: 'POST',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}/meetings`,
        body: exampleBody,
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(9999);