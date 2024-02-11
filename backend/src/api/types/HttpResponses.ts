interface HttpResponse {
  status: number
}

export interface ContainersApiResponse extends HttpResponse {
  containers: number
  running: number
  paused: number
  stopped: number
  container_list: any[]
}
