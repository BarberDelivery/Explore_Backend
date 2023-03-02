const { Location } = require('./models/index')
const geolib = require('geolib');
const { getDistance } = require( 'geolib')
const express = require('express')
const app = express()
const port = 5002

app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get('/location', async(req, res) => {
    try {
        let { latitude , longitude} = req.body
        const result = await Location.findAll()

        const latitudeResult = result.map((el) => {
            return el.latitude
        })
        const langitudeResult = result.map((el) => {
            return el.longitude
        })

        // console.log(latitudeResult,langitudeResult);
        const data = getDistance(
            { latitude: -6.2607054, longitude: 106.7815283 },
            { latitude: -6.258591394259885, longitude: 106.78127959370613 }
        );
        
    
        console.log(data);

        res.status(200).json(result)
        

    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})