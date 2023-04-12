require('dotenv').config();

const express = require('express')
const bcrypt = require('bcrypt');

const connection = require('./src/database')

const Place = require('./src/models/place')
const User = require('./src/models/user')

const createPlaces = require('./src/controllers/createPlaces');

const validadeNewUser = require('./src/middleware/validadeNewUser')

const app = express()

app.use(express.json()) //obrigatório

connection.authenticate()
connection.sync({alter: true})

app.post('/places', validateToken, createPlaces)

app.get('/places', async (request, response) => {
    try {
        const places = await Place.findAll()
        return response.json(places)
    } catch (error) {
        
    }
})

app.delete('/places/:id', async (request, response) => {
    
    try{
        await Place.destroy({
            where: {
                id: request.params.id
            }
        })
    responde.status(204);
    }catch(error){
        response.status(500);
    }
})
    
    app.update('/places/:id', async (request, response) => {
        const newInfos = req.body
        try {
            Place.update({
                name: newInfos.name,
                phone: newInfos.phone,
                opening_hours: newInfos.opening_hours,
                description: newInfos.description,
                latitude: newInfos.latitude,
                longitude: newInfos.longitude
            }, {
                where: {
                    id: req.params.id
                }
            }).then(async () => {
                console.info(`Place id ${req.params.id} updated`)
                const updatedPlace = await Place.findOne({where: {id: req.params.id}})
                res.status(200).json(updatedPlace)
            })

        } catch (error) {
            console.error('Place update error: ', error)
        }
    

        app.post('/users', async (request, response) => {
            try {

                const userInDatabase = await User.findOne({
                    where: {
                            username: req.body.username
                            }
                })

                if(userInDatabase){
                    return response
                    .status(403)
                    .json({message: 'Já existe um usuário com esse username'})
                }

                const hash = await bcrypt.hash(request.body.password, 10)
                
                const newUser = {
                name: request.body.name,
                email: request.body.email,
                username: request.body.username,
                senha: hash
               } 
        
               const user = await User.create(newUser)
        
               response.status(201).json(user)
        
        
            } catch (error) {
                console.log(error)
                response.status(500).json({message: 'Não possivel processar a solicitação.'})
            }
        })

        app.post('/sessions', async (request, response) => {
            try {
    
               const session = {

                username: request.body.username,
                senha: request.body.senha
               } 
        
               const user = await User.create(session)
        
               response.status(201).json(session)
        
        
            } catch (error) {
                console.log(error)
                response.status(500).json({message: 'Não foi possivel concluir a operação'})
            }
        })

        app.post('/users/login', validadeNewUser, async (request, response) => {

            try{

            const userInDatabase = await User.findOne({
                where: {
                    username: request.body.username,
                    password: request.body.password
                }
            })

            if(!userInDatabase) {
                return response.json({message: 'Usuário ou senha inválidos'});
            }

            const passwordIsValid = await bcrypt.compare(request.body.password, userInDatabase.password)

            if(!passwordIsValid){
                return response.json({message: 'Credenciais incorretas'});
            }

            const token = jwt.sign(
                {
                    id: userInDatabase.id
                },
                process.env.CHAVE_DO_TOKEN,
                {
                    expiresIn: '1h'
                }
            )

            response.json({id: userInDatabase.id, token:token});
            
            }
            catch(err){
                console.log(error)
                response.status(500).json({message: 'Não foi possivel concluir a operação'})
            }
        })

app.listen(3333, () => console.log("Servidor online"))
});
