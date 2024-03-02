abstract class BaseService<T> {
  abstract create (data: T): Promise<T>
}

interface Bookmark {
  title: string
  url: string
}

// Clase para emular la base de datos
const db = {
  insert: (data) => {
    return data
  }
}

export class BookmarkService implements BaseService<Bookmark> {
  async create (data: Bookmark): Promise<Bookmark> {
    const database = db
    const newUser = database.insert(data)

    return newUser
  }

  updateMetaData (data: any): any {
    return data
  }
}

export class UserService implements BaseService<Bookmark> {
  async create (data: Bookmark): Promise<Bookmark> {
    const database = db
    const newUser = database.insert(data)

    return newUser
  }
}
