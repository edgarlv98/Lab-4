const credentials = require('./credentials.js')
const request = require('request')

const darkSky = function(latitud, longitud){
    const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+latitud+','+longitud+'?'+'lang=es&units=si'
    request(url, function(error, response, body){
        const parsedBody = JSON.parse(body)
        const currentInfo = parsedBody.currently
        const info = {
            temperatura: currentInfo.temperature,
            resumen: currentInfo.summary,
            probabilidad: currentInfo.precipProbability
        }
        console.log(`${info.resumen}. Actualmente esta a ${info.temperatura}°C. Hay ${info.probabilidad * 100}% de lluvia.`)
    })
}


const mapBox = function(city){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='+credentials.MAPBOX_TOKEN
    request(url,function(error,response,body){
        const parsedBody = JSON.parse(body);
        //const data = response.features.center
        const longi = {
            longitud: parsedBody.features[0].center[0]
        }
        const lati = {
            latitud: parsedBody.features[0].center[1]
        }
        darkSky(lati.latitud, longi.longitud)
    })
}

module.exports = {
    darkSky: darkSky,
    mapBox: mapBox
}