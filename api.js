const axios = require('axios')

const api = axios.create({
    baseURL: 'https://api.brasil.io/dataset/covid19/caso/data/',
    headers: {
        "Authorization": "Token fedbd4c8e4240bdaedb238e131cc2fe3573d8e0d"
    }
})

module.exports = api