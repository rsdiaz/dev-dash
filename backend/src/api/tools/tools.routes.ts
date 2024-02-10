import { Router } from 'express'
import { getDevTools } from './tools.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/tools', getDevTools)

export default bookmarkRouter
