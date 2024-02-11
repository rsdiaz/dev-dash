import { Router } from 'express'
import { getInfo } from './container.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/containers', getInfo)

export default bookmarkRouter
