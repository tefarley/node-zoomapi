const axios = require('axios');
const http = require('http');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const token = {
    gen: async (tokenType = 'jwt') => {
        switch(tokenType) {
            case 'oauth': {
                const jwt = await axios('localhost:9999/oauth')
                    .then((res) => {
                        // console.log('access_token', res.data.access_token);
                        return res.data.access_token;
                    }).catch((err) => {
                        throw err;
                    });
                
                return jwt;
            }
            case 'jwt': {
                const payload = {
                    iss: config.zoom.key,
                    exp: new Date().getTime() + (60 * 60 * 1000)
                };

                const token = jwt.sign(payload, config.zoom.secret);

                return token;
            }
        }
    }
};

module.exports = token;