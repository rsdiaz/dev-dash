import { Router } from 'express'
import { getBookmarks, createBookmark } from './bookmark.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/bookmarks', getBookmarks)
bookmarkRouter.get('/bookmarks', createBookmark)

export default bookmarkRouter
