import { openDb } from '../../db/db'
import { type Request, type Response } from 'express'

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
    db.transaction(() => {
      const stmt = db.prepare('INSERT INTO bookmarks (url) VALUES (?)')

      const result = stmt.run('https://www.ejemplo.com')

      console.log('ID del nuevo registro:', result.lastInsertRowid)

      // TODO: obtains the image from the open graph and update result
    })()

    console.log('Registro insertado exitosamente')
  } catch (error) {
    console.error('Error al insertar el registro:', error)
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
