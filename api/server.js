// const express = require('express')
const app = require('./app/app')
const config = require('./app/util/constants');


app.listen(config.PORT, () => {
    console.log(`server is running on ${config.PORT}`);
})
