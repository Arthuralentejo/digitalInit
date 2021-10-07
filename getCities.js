const api = require('./api')

async function getCities(url, options, cities) {
    try {
        let resp = await api.get(url, options);
        let dataCities = resp['data'];
        let citiesCollection = cities.concat(dataCities['results']);
        if (dataCities['next'] !== null) {
            return await getCities(dataCities['next'], citiesCollection);
        } else {
            return citiesCollection;
        }
    } catch (err) {
        return err
    }
}


module.exports = getCities