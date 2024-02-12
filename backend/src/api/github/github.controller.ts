import axios from 'axios'
import { type Request, type Response } from 'express'
import NodeCache from 'node-cache'
const cache = new NodeCache()

export const getGitHubTrends = async (req: Request, res: Response): Promise<any> => {
  try {
    const cacheData = cache.get('trends')

    if (cacheData !== undefined) {
      console.log('cache data')
      return res.json(cacheData)
    }

    const response = await axios.get('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=5')

    const trends = response.data.items.map(item => {
      return {
        name: item.full_name,
        description: item.description,
        url: item.html_url,
        stars: item.stargazers_count,
        forks: item.forks_count,
        avatar_url: item.owner.avatar_url
      }
    })

    cache.set('trends', trends, 3600)

    res.status(200).send(trends)
  } catch (error) {
    console.error(error)
    res.status(404).json({ status: 204, error: 'Not content' })
  }
}
