import { HTMLUtils } from './HTMLUtils'

export class Favicon {
  private _url: string

  public get url (): string {
    return this._url
  }

  public set url (value: string) {
    if (typeof value !== 'string') {
      throw new Error('The url must be a string')
    }
    this._url = value
  }

  public async getFaviconPath (url: string): Promise<string | null> {
    try {
      const html = new HTMLUtils()
      const page = await html.fetchPageHtml(url)
      const iconUrl = html.findIconUrl(page)

      if (iconUrl !== null && iconUrl !== undefined) {
        return new URL(iconUrl, url).href
      } else {
        return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=48`
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
