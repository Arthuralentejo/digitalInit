function topTenCities(arr) {
    arr.sort((a, b) => {
        if (a["confirmed_per_100k_inhabitants"] > b["confirmed_per_100k_inhabitants"]) {
            return -1;
        } else {
            true
        }
    })
    let tenCities = arr.slice(0, 10)
    const keys = ["city", "confirmed_per_100k_inhabitants"]
    const filterObject = (obj, keys) => {
        return keys.map(key => ({
            [key]: obj[key]
        })).reduce((previous, current) => {
            return {
                ...previous,
                ...current
            }
        }, {})
    }
    const filterForMap = keys => obj => filterObject(obj, keys)
    const newObj = tenCities.map(filterForMap(keys))
    return newObj
}

module.exports = topTenCities