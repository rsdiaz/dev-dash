import { Router } from 'express'
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from './bookmark.controller'

const bookmarkRouter = Router()

bookmarkRouter.get('/bookmarks', getBookmarks)
bookmarkRouter.post('/bookmarks', createBookmark)
bookmarkRouter.put('/bookmarks/:id', updateBookmark)
bookmarkRouter.delete('/bookmarks/:id', deleteBookmark)

export default bookmarkRouter
