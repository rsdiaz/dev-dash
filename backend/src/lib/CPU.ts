import * as os from 'os'

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
}
