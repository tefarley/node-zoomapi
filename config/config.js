require('dotenv').config()

const config = {
    zoom: {
        baseURL: 'https://api.zoom.us/v2',
        key: process.env.ZOOM_KEY,
        secret: process.env.ZOOM_SECRET,
        exampleEmail: 'tedefarley+zexample0@gmail.com'
    },
    oauth: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        clientBasicToken: Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
        grantCodeURL: `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}`,
        UMClientID: process.env.UM_CLIENT_ID,
        UMClientSecret: process.env.UM_CLIENT_SECRET,
        redirectURL: process.env.REDIRECT_URL,
    }
};

module.exports = config;