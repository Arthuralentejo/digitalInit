const express = require('express')

const app = express()

app.get('/', (req, res) => {

    let state = req.query.state
    let dateStart = req.query.dateStart
    let dateEnd = req.query.dateEnd
    res.send({
        state: req.query.state,
        dateStart: req.query.dateStart,
        dateEnd: req.query.dateEnd
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log('API running on port 5000')
})