import * as winston from 'winston'
import morgan from 'morgan'

export const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
})

export const loggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim())
    }
  }
)
