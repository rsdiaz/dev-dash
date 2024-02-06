import 'dotenv/config'
import express from 'express'

export const app = express()

const port = (Boolean(process.env.PORT)) || 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
