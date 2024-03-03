import axios from 'axios'

export class HTMLUtils {
  // Función para obtener el HTML de la página
  public async fetchPageHtml (url: string): Promise<any> {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error(`Error al obtener la página: ${error}`)
      return null
    }
  }

  public findIconUrl (html): string {
    const regex = /<link.*?rel="(?:shortcut icon|icon)".*?href="(.*?)".*?>/is
    const match = html.match(regex)

    if (match?.[1] !== null && match?.[1] !== undefined) {
      return match[1]
    } else {
      console.log('Ícono no encontrado')
      throw new Error('0')
    }
  }
}
