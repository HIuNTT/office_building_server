import dotenv from 'dotenv'
import App from './app'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

async function bootstrap() {
  const app = new App(process.env.PORT || 3000)
  app.listen()
}
bootstrap()
