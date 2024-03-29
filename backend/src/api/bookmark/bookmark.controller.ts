import validator from 'validator'
import { openDb } from '../../db/db'
import { type Request, type Response } from 'express'
import { Favicon } from '../../lib/FavIcon'

export const getBookmarks = async (req: Request, res: Response): Promise<any> => {
  const db = openDb('webdash.db')

  try {
    const rows = db.prepare('SELECT * FROM bookmarks ORDER BY position').all()
    db.close()
    res.status(200).send(rows)
  } catch (error) {
    console.error(error)
    res.status(404).json({ status: 204, error: 'Not content' })
  } finally {
    db.close()
  }
}

export const createBookmark = async (req: Request, res: Response): Promise<any> => {
  const db = openDb('webdash.db')
  try {
    const { title, url, category } = req.body

    const favicon = new Favicon()
    const faviconUrl = await favicon.getFaviconPath(url as string)

    const lastPositionQuery: any = db.prepare('SELECT MAX(position) as lastPosition FROM bookmarks').get()
    const lastPosition = lastPositionQuery.lastPosition
    const imageUrl = faviconUrl

    db.transaction(() => {
      const stmt = db.prepare('INSERT INTO bookmarks (title, url, category, position, imageUrl) VALUES (?, ?, ?, ?, ?)')
      stmt.run(title, url, category, lastPosition + 1, imageUrl)
    })()

    res.status(200).json({ message: 'Bookmark created successfully' })
  } catch (error) {
    console.error('An error occurred while creating bookmark', error)
    db.exec('ROLLBACK')

    res.status(500).json({ error: 'An error occurred while creating bookmark' })
  } finally {
    db.close()
  }
}

export const updateBookmark = async (req: Request, res: Response): Promise<any> => {
  const db = openDb('webdash.db')
  try {
    const { id } = req.params
    const { position } = req.body

    const existingBookmark = db.prepare('SELECT * FROM bookmarks WHERE id = ?').get(id)

    if (existingBookmark === null || existingBookmark === undefined) {
      return res.status(404).json({ error: 'Marcador no encontrado' })
    }

    const stmt = db.prepare('UPDATE bookmarks SET (position) = (?) WHERE id = ?')
    const result = stmt.run(position, id)

    res.status(200).json(result)
  } catch (error) {
    console.error('Error al actualizar el marcador:', error)
    res.status(500).json({ error: 'Error al actualizar el marcador' })
  } finally {
    db.close()
  }
}

export const deleteBookmark = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const db = openDb('webdash.db')

  try {
    const bookmarkId = validator.toInt(id)

    if (isNaN(bookmarkId as number)) {
      res.status(200).send()
    } else {
      const stmt = db.prepare('DELETE FROM bookmarks WHERE id = ?')
      stmt.run(bookmarkId)
      db.close()
      res.status(204).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  } finally {
    db.close()
  }
}
