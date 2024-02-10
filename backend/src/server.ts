import 'dotenv/config'
import * as http from 'http'
import { Server } from 'socket.io'
import express, { type Application } from 'express'
import { SystemInfo } from './lib/SystemInfo'
import { loggerMiddleware } from './utils/logger'
import { initDb } from './db/db'
import bookmarkRouter from './api/bookmark/bookmark.routes'
import toolsRouter from './api/tools/tools.routes'

export const app: Application = express()
const server = http.createServer(app)
const io = new Server(server)
const system = new SystemInfo()

initDb()

app.use(express.json())
app.use(loggerMiddleware)

const port = (Boolean(process.env.PORT)) || 4000

app.get('/', (req, res) => {
  // eslint-disable-next-line n/no-path-concat
  res.status(200).send('Hello, world')
})

app.use(bookmarkRouter)
app.use(toolsRouter)

io.on('connection', (socket) => {
  console.log('Cliente conectado')

  // Función para emitir información
  const emitSystemInfo = (): any => {
    void system.getStats().then((info) => {
      io.emit('systemInfo', info)
    })
  }

  // Emitimos información sobre la CPU, memoria RAM
  emitSystemInfo()

  // Emitir información sobre la CPU, memoria RAM y uso de CPU del sistema cada 2 segundos
  let updateInterval = setInterval(emitSystemInfo, 2000)

  socket.on('disconnect', () => {
    clearInterval(updateInterval)
    console.log('Cliente desconectado')
  })

  // Manejar la solicitud de reinicio del intervalo desde el cliente
  socket.on('restartInterval', () => {
    clearInterval(updateInterval)
    console.log('Intervalo reiniciado por solicitud del cliente')
    // Reiniciar el intervalo después de detenerlo
    updateInterval = setInterval(emitSystemInfo, 2000)
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
