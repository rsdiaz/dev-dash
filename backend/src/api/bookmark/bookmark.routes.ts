import { Router } from 'express'
import { getBookmarks, createBookmark, updateBookmark } from './bookmark.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/bookmarks', getBookmarks)
bookmarkRouter.post('/bookmarks', createBookmark)
bookmarkRouter.put('/bookmarks/:id', updateBookmark)

export default bookmarkRouter
