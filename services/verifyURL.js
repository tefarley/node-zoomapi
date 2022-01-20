const http = require('http');
const axios = require('axios');
const { response } = require('express');

const Verify = (url) => {
    const ID = url.slice(url.lastIndexOf('/') + 1, url.indexOf('?'));

    http.get(`http://localhost:9999/meetings/${ID}`, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
            console.log(data);
        });

        res.on('end', () => {
            console.log(JSON.parse(data));
        })
    }).on("error", (err) => {
        console.error(err);
    });

    // const options = {
    //     host: 'localhost',
    //     port: '9999',
    //     path: `/meetings/${ID}`
    // };

    // const callback = () => {
    //     let str;

    //     response.on('data', (chunk) => {
    //         str += chunk;
    //     });

    //     response.on('end', () => {
    //         console.log(str);
    //     });
    // };

    // const req = http.request(options, callback).end();

    // const meeting = axios({
    //     method: 'GET',
    //     host: 'localhost',
    //     port: 9999,
    //     path: `/meetings/${ID}`,
    //     url: `localhost:9999/meetings/${ID}`,
    // }).then((res) => {
    //     console.log(res.data);
    // }).catch((err) => {
    //     console.error(err);
    // })

    return ID;
};

module.exports = Verify;