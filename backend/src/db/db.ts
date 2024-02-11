import DatabaseConstructor, { type Database } from 'better-sqlite3'
import devTools from '../tools/tools.json'

export function openDb (filename: string): Database {
  const db = new DatabaseConstructor(filename, {
    verbose: console.log
  })

  return db
}

export function initDb (): void {
  try {
    const db = openDb('webdash.db')

    // craate the dev_tools table
    db.transaction(() => {
      db.exec('DROP TABLE IF EXISTS dev_tools')
      db.exec('CREATE TABLE dev_tools (id INTEGER PRIMARY KEY, name TEXT, command TEXT, svg TEXT, check_url TEXT)')
      const stmt = db.prepare('INSERT INTO dev_tools (name, command, svg, check_url) VALUES (?, ?, ?, ?)')
      devTools.map((tool, index) => stmt.run(tool.name, tool.command, tool.svg, tool.check_url))
    })()

    // create the settings table
    db.transaction(() => {
      db.exec('DROP TABLE IF EXISTS settings')
      db.exec('CREATE TABLE settings (id INTEGER PRIMARY KEY, backgroundImage TEXT)')
      const stmt = db.prepare('INSERT INTO settings (backgroundImage) VALUES (?)')
      stmt.run('https://robertoserrano.pro')
    })()

    // create the bookmarks table
    db.transaction(() => {
      db.exec('DROP TABLE IF EXISTS bookmarks')
      db.exec('CREATE TABLE bookmarks (id INTEGER PRIMARY KEY, url TEXT, imageUrl TEXT, title TEXT)')
      const stmt = db.prepare('INSERT INTO bookmarks (url, imageUrl, title) VALUES (?, ?, ?)')
      stmt.run('https://robertoserrano.pro', 'https://res.cloudinary.com/rserrano/image/upload/v1706656551/Screenshot_2024-01-31_at_00-15-01_Sobre_mi_-_Roberto_Serrano_desarrollador_de_software_en_Tarragona_lzoqll.png', 'Blog')
      stmt.run('https://www.notion.com', 'https://res.cloudinary.com/rserrano/image/upload/v1706656551/Screenshot_2024-01-31_at_00-15-01_Sobre_mi_-_Roberto_Serrano_desarrollador_de_software_en_Tarragona_lzoqll.png', '🚀 Notion')
    })()
    console.log('Transaction completed')
  } catch (error) {
    console.log(error)
  }
}
