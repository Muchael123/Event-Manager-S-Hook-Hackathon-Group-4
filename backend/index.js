import express from 'express'
import ConnectToDB from './lib/connecttodb.js'
import AuthRouter from './routes/auth.route.js'
const app = express()
const port = 3001
const apiurl = "/api/v1"

app.use(express.json())
ConnectToDB();


app.get('/', (req, res) => {
  res.send('Hello World!!! \n Welcome to Event-Manager-S-Hook-Hackathon-Group-4 Backend API')
})
app.use(apiurl+`/auth`, AuthRouter)

app.listen(port, () => {
    console.log(`App running on  http://localhost:${port}`)
  })
