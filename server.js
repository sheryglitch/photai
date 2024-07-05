import express from 'express'
import router from './routes/route.js'
import {Config} from './config/index.js'

const app = express()
const Port = Config.PORT

app.use(express.json())
app.use('/api', router)

app.listen(Port, () => {
  console.log(`Server running on PORT: ${Port}`)
})
