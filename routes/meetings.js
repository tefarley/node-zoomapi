const Router = require('@koa/router');
const axios = require('axios');
const config = require('../config/config');

const router = new Router();

const token = require('../services/token');

// GET
router.get('/meetings/user/:userId', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}/meetings`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
});

router.get('/meetings/:meetingId', (ctx) => {
    axios({
        method: 'GET',
        url: `${config.zoom.baseURL}/meetings/${ctx.params.meetingId}`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    })
});

// POST
router.post('/meetings/:userId', (ctx) => {
    const testParams = {
        topic: 'Instant Meeting',
        type: 1,
        settings: {
            host_video: true,
            participant_video: true
        }
    };    
    
    axios({
        method: 'POST',
        url: `${config.zoom.baseURL}/users/${ctx.params.userId}/meetings`,
        body: testParams,
        headers: {
            'Authorization': `Bearer ${token.gen()}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
});

// PATCH
router.patch('/meetings/:meetingId', (ctx) => {
    const testParams = {
        schedule_for: config.zoom.email,
        topic: 'New Meeting Name',
        type: 2,
        start_time: new Date(),
        duration: 30
    }

    axios({
        method: 'PATCH',
        url: `${config.zoom.baseURL}/meetings/${ctx.params.meetingId}`,
        body: testParams,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err.data);
    });
})

// DELETE
router.delete('/meetings/:meetingId', (ctx) => {
    axios({
        method: 'DELETE',
        url: `${config.zoom.baseURL}/meetings/${ctx.params.meetingId}`,
        headers: {
            'Authorization': `Bearer ${token.gen()}`
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err.data);
    });
})

module.exports = router;