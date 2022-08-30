require('dotenv').config();
const { APIKEY } = process.env
const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  axios  = require('axios')
const { Videogame , Genero} = require('../db');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

const infoApi = async () =>{
    const info = []
    try {
        for (let i = 1; i <= 5; i++) {
            const dataApi = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`)
            dataApi.data.results.map(e => {
                info.push({
                    name: e.name,
                    id: e.id,
                    image: e.background_image,
                    gender: e.genres,
                    rating: e.rating,
                    api: true,
                    platform: e.platforms
                }
                )
            })
        }
        return info
    } catch (error) {
        console.log(error.message);
    }
}
const infoDb = async () => {
    return await Videogame.findAll({
        include:{
            model: Genero,
            atributtes : ['name'],
            through: {
                atributtes: []
            }
        }
    })
}

const videosGames = async () => {
    const dataDb = await infoDb()
    const dataApi = await infoApi()
    const all = dataDb.concat(dataApi)
    return all
}
router.get('/videogames', async (req,res) => {
    const  { name }  = req.query
    const allGames = await videosGames()
    const gameFilter = await allGames.filter( e => e.name.toLowerCase().includes(name) && e.name ) 
    
    name ?
        allGames ?
            res.status(200).send(gameFilter)
            :
            res.status(404).send("Game not found, :(")
        :
        res.status(200).send(allGames)
})

router.get('/videogame/:idVideogame', async ( req, res ) => {
    const idVideogame = req.params.idVideogame
    const all = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${APIKEY}`)
    const dataShow = {
        descripcion : all.data.description,
        dateLaunch: all.data.released,
        rating: all.data.rating,
        platform: all.data.platforms,
        name: all.data.name,
        image: all.data.background_image,
        gender: all.data.genres
    }
    all.data?
    res.status(200).send(dataShow)
    : res.status(200).send("Game Not Found")
})

router.get('/genres', async ( req, res) => {
    const dataApi = await axios.get('https://api.rawg.io/api/games?key=bccf7ef0f90147c1856f067a4e7578b6&page_size=100')
    const filterGen = dataApi.data.results.map( e => e.genres.map( el => el.name))
    for(i=0 ; i<filterGen.length; i++){
        filterGen[i].forEach(element => {
            Genero.findOrCreate({
                where:{
                    gender:element
                }
            })
        });
    }
    const generosBD = await Genero.findAll()
    res.send(generosBD)

})

router.post("/videogames", async( req, res ) => {
    const {name, description, launchDate, rating, platform, genders, src} = req.body
    const concat = platform.join("")
    const [videogameConst, created] = 
        await Videogame.findOrCreate({
            where:{
                name,
                description,
                launchDate,
                rating,
                platform:concat,
                src
            }
        })
    const genderJoin = genders.join("")
    const [genderCreated, createdGender] = 
        await Genero.findOrCreate({
            where: {
                gender:genderJoin
            }
        })
        genders.forEach(async (e) => {
            const find = await Genero.findAll({ where: { gender: e } });
            if (find) { await videogameConst.addGenero(find) };
        })
        created ? res.status(200).send("OK") : res.status(404).send("Ya creado")
})