import { openDb } from '../../db/db'
import { type Request, type Response } from 'express'
import * as tools from '../../tools/tools.json'
import { DevTool, type DevToolResponseApi } from '../../lib/DevTool'

export const getDevTools = async (req: Request, res: Response): Promise<any> => {
  try {
    const devTool = new DevTool(tools[0])
    const devToolVersion = await devTool.getVersion()
    const devToolLatestVersion = await devTool.getLatestVersion()

    const response: DevToolResponseApi = {
      name: devTool.name,
      svg: devTool.svg,
      curren_version: devToolVersion,
      latest_version: devToolLatestVersion,
      is_outdated: devToolVersion !== devToolLatestVersion
    }

    res.status(200).send([response])
  } catch (error) {
    console.error(error)
    res.status(404).json({ status: 204, error: 'Not content' })
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
