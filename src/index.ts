import { Hono } from 'hono'
import { appUser } from './users'
import { storage } from './storage'
import { auth } from './auth'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route('/', appUser)
app.route('/', storage)
app.route('/', auth)

export default app
