const express = require('express')
    // const axios = require('axios')
    // const api = require('./api')
const getCities = require('./getCities')
const topTenCities = require('./topTenCities')


const app = express()



app.get('/', async(req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(201).send("<br><br><h4>Para fazer uma consulta passe os atributos da busca como parametros usando o formato:<br><br> http://localhost:5000/?state=&dateStart=&dateEnd=</h4> <br> <ul><li>state = O estado do qual você quer pesquisar (Ex: RJ)</li><li>dateStart = Data de inicio do periodo (YYYY/MM/DD) </li><li>dateEnd = Data final do periodo (YYYY/MM/DD)</li><br>E caso seja uma data unica, utilize o parametro:<br> <br><li>date = Data da pesquisa (YYYY/MM/DD)</li></ul>")
        return
    }

    let { state, dateStart, dateEnd, date } = req.query
    let dtStart, dtEnd, dt;
    try {
        if (date != undefined) {
            dt = new Date(date)
        } else {
            dtStart = new Date(dateStart)
            if (dateEnd != undefined) {
                dtEnd = new Date(dateEnd)
            } else {
                dtEnd = new Date()
            }
        }
    } catch (error) {
        res.status(501).send({ message: error })
    }


    if (dtStart > dtEnd) {
        res.status(401).send("Intervalo de data invalido")
    }


    var dict = new Object()

    let dtLast = dtStart
    let allCities = []
    if (dt !== undefined) {
        try {
            let options = {
                params: {
                    state: state,
                    date: dt.toISOString().split('T')[0],
                    page_size: "10000",
                    is_last: "True",
                    place_type: "city"
                }
            }
            allCities.push(await getCities(`https://api.brasil.io/dataset/covid19/caso/data/`, options, []))
            let topCities = topTenCities(allCities[0])
            res.status(201).send({ cities: topCities })
            return
        } catch (error) {
            res.status(501).send({ error: error.message, resposta: error.response, message: error.data })

        }

    }
    try {

        while (dtLast <= dtEnd) {
            // console.log(`Varios dias, de ${dtLast} até ${dtEnd}`)

            let options = {
                params: {
                    state: state,
                    date: dtLast.toISOString().split('T')[0],
                    page_size: "10000",
                    is_last: "True",
                    place_type: "city"
                }
            }
            allCities.push(await getCities(`https://api.brasil.io/dataset/covid19/caso/data/`, options, []))

            dtLast.setDate(dtLast.getDate() + 1);
        }
        // console.log("Veio até aqui")
        console.log(allCities.length)
        let topCities = topTenCities(allCities[0])
        res.status(200).send({ cities: allCities })
    } catch (error) {
        res.send({ error: error.message, resposta: error.response, message: error.data })
    }

})

app.listen(process.env.PORT || 5000, () => {
    console.log('API running on port 5000')
})