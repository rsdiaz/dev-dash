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
      db.exec('CREATE TABLE bookmarks (id INTEGER PRIMARY KEY, url TEXT, imageUrl TEXT, title TEXT, category TEXT)')
      const stmt = db.prepare('INSERT INTO bookmarks (url, imageUrl, title, category) VALUES (?, ?, ?, ?)')
      stmt.run('https://robertoserrano.pro', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://robertoserrano.pro&size=48', '🔥 robertoserrano.pro', 'Personal')
      stmt.run('https://www.notion.so', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://notion.so&size=48', '🚀 Notion', 'Herramientas')
      stmt.run('https://app.factorialhr.com/dashboard', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://app.factorialhr.com/dashboard&size=48', '💼 Factorial', 'Work')
      stmt.run('https://www.office.com/?acctsw=1&auth=2', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.office.com/?acctsw=1&auth=2&size=48', '📝 Office 365', 'Work')
      stmt.run('https://chat.openai.com', 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://chat.openai.com&size=48', '🤖 ChatGPT', 'Herramientas')
    })()
    console.log('Transaction completed')
  } catch (error) {
    console.log(error)
  }
}
