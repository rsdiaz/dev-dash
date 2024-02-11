import { type Request, type Response } from 'express'
import Docker from 'dockerode'
import { type ContainersApiResponse } from '../../api/types/HttpResponses'

export const getInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const docker = new Docker()
    const info = await docker.info()
    const containerList = await docker.listContainers({})

    const response: ContainersApiResponse = {
      containers: info.Containers,
      paused: info.ContainersPaused,
      running: info.ContainersRunning,
      stopped: info.ContainersStopped,
      container_list: containerList,
      status: 200
    }

    res.status(200).send(response)
  } catch (error) {
    res.status(404).json({ status: 204, error: 'Not content' })
  }
}
