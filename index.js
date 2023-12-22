import express from 'express'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false);

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

mongoose.connect('mongodb://admin:password@monguito:27017/miapp?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error de conexión a MongoDB:', error));


app.get('/', async (_req, res) => {
  console.log('listando... chanchitos...')
  const animales = await Animal.find();
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})

app.listen(3000, () => console.log('listening...'))