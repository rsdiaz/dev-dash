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
  public getCpuInfo (): CPU {
    const cpu = new CPU()
    return cpu
  }

  public async getStats (): Promise<Info> {
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()
    // Obtener el uso de CPU del sistema a partir de la carga promedio en el último minuto
    // const systemCpuUsage = os.loadavg()[0] * 100
    // const diskInfo = await disk.diskUsage()

    return {
      platform: os.platform(),
      cpu: this.getCpuInfo(),
      memory: {
        total: totalMemory,
        free: freeMemory,
        used: totalMemory - freeMemory
      },
      nodev: process.version
    }
  }
}
