const clima = require('./clima.js')
const express = require('express')

const app = express()


app.get('/weather', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (!req.query.search){
    return res.send({
      error: "incluye una ciudad a buscar"
    })
  }

  clima.mapBox(req.query.search, function(error, response) {
    if(error) {
      return res.send({
        error: error
      })
    } else {
      const city = response
      clima.darkSky(city.lat, city.long, function(error, response) {
        if(error) {
          return res.send({
            error: error
          })
        } else {
          return res.send({
            location: city.name,
            weather: response
          })
        }
      })
    }
  })
})

app.listen('3000', function(){
  console.log("corriendo")
})