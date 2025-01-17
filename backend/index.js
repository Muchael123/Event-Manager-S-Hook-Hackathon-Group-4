import express from 'express'
import AuthRouter from './routes/auth.route.js'
import categoryRoutes from './routes/categories.route.js'
import EventsRouter from './routes/events.route.js'
import createAllTables from './lib/createTables.js'

const app = express()
const port = 3001
const apiurl = "/api/v1"

app.use(express.json())
createAllTables()


app.get('/', (req, res) => {
  res.send('Hello World!!! \n Welcome to Event-Manager-S-Hook-Hackathon-Group-4 Backend API')
})
app.use(apiurl+`/auth`, AuthRouter)
app.use(apiurl+`/categories`, categoryRoutes)
app.use(apiurl+'/events', EventsRouter)

app.listen(port, () => {
    console.log(`App running on  http://localhost:${port}`)
  })
