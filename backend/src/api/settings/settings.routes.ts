import { Router } from 'express'
import { getSettings } from './settings.controller'

const settingRouter = Router()

settingRouter.get('/settings', getSettings)

export default settingRouter
