import express from 'express';
const app = express()
const PORT = process.env.PORT || 3000
import router from './routes/routes.js'


// app.get('/', (req, res) => res.send('Hola CLASE!'))

///middleware
app.use(express.json());//recibe el json y puede ser leido en thunderClient
app.use(express.urlencoded({extended:false}));//
app.use('/', router);



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))