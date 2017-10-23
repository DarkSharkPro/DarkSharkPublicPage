'use strict';

const server = require('browser-sync').create();

module.exports = options => {
    return () => {
        server.init({
            server: options.src,
            notify: options.notify
        });
    };
};