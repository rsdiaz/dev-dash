import * as os from 'os'
// import * as disk from './disk'
import { CPU } from './CPU'
import { exec } from 'child_process'

interface Memory {
  total: number
  free: number
  used: number
}

interface Info {
  platform: string
  cpu: CPU
  memory: Memory
  nodev: string
}

export class SystemInfo {
  public async getCpuInfo (): Promise<any> {
    const cpu = new CPU()
    const usage = await cpu.getCpuUsage()
    return {
      ...cpu,
      usage
    }
  }

  public async getStats (): Promise<Info> {
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()

    return {
      platform: os.platform(),
      cpu: await this.getCpuInfo(),
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: totalMemory - freeMemory
      },
      nodev: process.version
    }
  }

  public async getGlobalNodePackages (): Promise<any> {
    return await new Promise((resolve, reject) => {
      exec('npm list -g --depth=0', (error, stdout, stderr) => {
        if (error != null) {
          reject(error)
          return
        }
        if (stderr.length > 0) {
          reject(stderr)
          return
        }

        const packages = stdout.split('\n').filter(line => line.trim() !== '').slice(1)
        resolve(packages)
      })
    })
  }
}
