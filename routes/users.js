const Router = require('@koa/router');
const axios = require('axios');
const config = require('../config/config');

const router = new Router();

const token = require('../services/token');

// GET
router.get('/users/:userId', (ctx) => {
    console.log(jwt);
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
        ctx.body = JSON.stringify(res.data);
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/users', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/users/zak', (ctx) => {
    // Zoom Access Token
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users/me/zak`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`,
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err.data);
    });
})

// POST
router.post('/users', (ctx) => {
    const testParams = {
        action: 'create',
        user_info: {
            email: config.zoom.exampleEmail,
            type: 1,
            first_name: 'Dev',
            last_name: 'Tester'
        }
    }
    
    axios({
        method: 'POST',
        url: `${config.zoom.baseURL}/users`,
        body: JSON.stringify(testParams),
        headers: {
            'Authorization': `Bearer ${token.gen()}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log('response', res);
    }).catch((err) => {
        console.error(err);
    });

    console.log(testParams);
});

// PATCH
router.patch('/users/:userId', (ctx) => {
    const testParams = {
        dept: 'LS',
        phone_number: '+12345678900',
    }

    axios({
        method: 'PATCH',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}`,
        body: testParams,
        headers: {
            'Authorization': `Bearer ${token.gen()}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err.data);
    });
})

// DELETE
router.delete('/users/:userId', (ctx) => {
    axios({
        method: 'DELETE',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
})

module.exports = router;