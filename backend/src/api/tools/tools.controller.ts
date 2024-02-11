import { openDb } from '../../db/db'
import { type Request, type Response } from 'express'
import { DevTool, type DevToolInterface, type DevToolResponseApi } from '../../lib/DevTool'

export const getDevTools = async (req: Request, res: Response): Promise<any> => {
  const db = openDb('webdash.db')

  try {
    const devTools = db.prepare('SELECT * FROM dev_tools').all() as DevToolInterface[]

    const data = await Promise.all(devTools.map(async (devTool) => {
      const tool = new DevTool(devTool)
      const toolVersion = await tool.getVersion()
      const toolLatestVersion = await tool.getLatestVersion()
      const response: DevToolResponseApi = {
        name: devTool.name,
        svg: devTool.svg,
        current_version: toolVersion,
        latest_version: toolLatestVersion,
        is_outdated: toolVersion !== toolLatestVersion
      }

      return response
    }))

    res.status(200).send(data)
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
