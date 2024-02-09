import { openDb } from '../../db/db'
import { type Request, type Response } from 'express'

export const getBookmarks = async (req: Request, res: Response): Promise<any> => {
  const db = openDb('webdash.db')

  try {
    const rows = db.prepare('SELECT * FROM bookmarks').all()

    console.log(rows)

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
