const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let state = req.query.state
    let dateStart = req.query.dateStart
    let dateEnd = req.query.dateEnd
    console.log(`${state} --- ${dateStart} ----- ${dateEnd}`)
    res.end(`${state} --- ${dateStart} ----- ${dateEnd}`)
})

app.listen(process.env.PORT || 5000, () => {
    console.log('API running on port 5000')
})