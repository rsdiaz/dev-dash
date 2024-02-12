import { Router } from 'express'
import { getGitHubTrends } from './github.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/trends', getGitHubTrends)

export default bookmarkRouter
