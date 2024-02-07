import * as os from 'os'
import * as osUtils from 'node-os-utils'
interface CPUInterface {
  model: string
  cpus: number
}

export class CPU implements CPUInterface {
  model: string
  cpus: number

  constructor () {
    this.model = os.cpus()[0].model
    this.cpus = os.cpus().length
  }

  public async getCpuUsage (): Promise<number> {
    const cpuUsage = await osUtils.cpu.usage()

    return cpuUsage
  }
}
