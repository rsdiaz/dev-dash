import * as os from 'os'
// import * as disk from './disk'
import { CPU } from './CPU'

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
}
