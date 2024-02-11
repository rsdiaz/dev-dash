/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-base-to-string */
import axios, { type AxiosResponse } from 'axios'
import { exec } from 'child_process'

export interface DevToolInterface {
  name: string
  check_url: string
  svg: string
  command: string
}

interface NpmPackageResponse {
  version: string
}

interface NodeVersionResponse extends NpmPackageResponse {
  lts: boolean
}

interface VersionResponse {
  latest_version: string | null
}

export interface DevToolResponseApi extends Pick<DevToolInterface, 'name' | 'svg'>, VersionResponse {
  current_version: string
  is_outdated: boolean
}

export class DevTool {
  name: string
  command: string
  check_url: string
  svg: string

  constructor (devTool: DevToolInterface) {
    this.name = devTool.name
    this.command = devTool.command
    this.check_url = devTool.check_url
    this.svg = devTool.svg
  }

  public async getVersion (): Promise<string> {
    return await new Promise((resolve, reject) => {
      exec(this.command, (error, stdout, stderr) => {
        if (error != null) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          reject(`Error al ejecutar el comando: ${error}`)
          return
        }
        resolve(stdout.trim().replace(/^\D+/, ''))
      })
    })
  }

  public async getLatestVersion (): Promise<string | null> {
    try {
      if (this.name === 'nodejs') {
        const response: AxiosResponse<NodeVersionResponse> = await axios.get<NodeVersionResponse>(this.check_url)
        const latestVersion: string = response.data[0].version
        return latestVersion.trim().replace(/^\D+/, '')
      } else {
        const response: AxiosResponse<NodeVersionResponse> = await axios.get<NodeVersionResponse>(this.check_url)
        const latestVersion: string = response.data.version
        return latestVersion.trim().replace(/^\D+/, '')
      }
    } catch (error) {
      console.error(`Error al obtener la última versión de ${this.name}: ${error}`)
      return null
    }
  }
}
