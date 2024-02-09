import DatabaseConstructor, { type Database } from 'better-sqlite3'

export function openDb (filename: string): Database {
  const db = new DatabaseConstructor(filename, {
    verbose: console.log
  })

  return db
}

export function initDb (): void {
  try {
    const db = openDb('webdash.db')
    db.transaction(() => {
      db.exec('DROP TABLE IF EXISTS bookmarks')
      db.exec('CREATE TABLE bookmarks (id INTEGER PRIMARY KEY, url TEXT, imageUrl TEXT)')
      const stmt = db.prepare('INSERT INTO bookmarks (url, imageUrl) VALUES (?, ?)')
      stmt.run('https://robertoserrano.pro', 'https://res.cloudinary.com/rserrano/image/upload/v1706656551/Screenshot_2024-01-31_at_00-15-01_Sobre_mi_-_Roberto_Serrano_desarrollador_de_software_en_Tarragona_lzoqll.png')
      stmt.run('https://www.notion.com', 'https://res.cloudinary.com/rserrano/image/upload/v1706656551/Screenshot_2024-01-31_at_00-15-01_Sobre_mi_-_Roberto_Serrano_desarrollador_de_software_en_Tarragona_lzoqll.png')
    })()
    console.log('Transaction completed')
  } catch (error) {
    console.log(error)
  }
}
