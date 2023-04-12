const Places = require('../src/places');

async function createPlaces(request, response) {
    try {

       const data = {
        name: request.body.name,
        contact: request.body.contact,
        opening_hours: request.body.opening_hours,
        description: request.body.description,
        latitude: request.body.latitude,
        longitude: request.body.longitude
       } 

       const place = await Place.create(data)

       response.status(201).json(place)


    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Não possivel concluir a operação'})
    }
}

module.exports = createPlaces;