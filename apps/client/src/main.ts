import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { ClientModule } from './client.module'

async function bootstrap() {
  const whitelist = [
    'http://127.0.0.1:5173',
    'http://127.0.0.1:4173',
    'http://localhost:5173',
  ]

  const app = await NestFactory.create(ClientModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error(`Not allowed by CORS`))
        }
      },
      credentials: true,
    },
  })

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Peaky coders client')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
