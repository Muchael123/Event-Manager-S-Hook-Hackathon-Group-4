import express from 'express'
import AuthRouter from './routes/auth.route.js'
import categoryRoutes from './routes/categories.route.js'
import EventsRouter from './routes/events.route.js'
import TicketRoutes from './routes/tickets.routes.js'
import createAllTables from './lib/createTables.js'
import morgan from 'morgan'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'

const upload = multer();
const app = express()
const port = 3001
const apiurl = "/api/v1"

app.use(express.json())
app.use(upload.any());
app.options("*", cors());
app.use(cors({
  origin: "*",
}))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined',{
  skip: function (req, res) { return res.statusCode === 500 }
}))
app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))

createAllTables()


app.get('/', (req, res) => {
  res.send('Hello World!!! \n Welcome to Event-Manager-S-Hook-Hackathon-Group-4 Backend API')
})
app.use(apiurl+`/auth`, AuthRouter)
app.use(apiurl+`/categories`, categoryRoutes)
app.use(apiurl+'/events', EventsRouter)
app.use(apiurl+'/tickets', TicketRoutes)

app.listen(port, () => {
    console.log(`App running on  http://localhost:${port}`)
  })
