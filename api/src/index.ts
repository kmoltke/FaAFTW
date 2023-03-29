import express, { Request, Response } from 'express'
import { categoriesRouter } from './categories/categories.route'
import { vinylsRouter } from './vinyls/vinyls.route'
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use(vinylsRouter)
app.use(categoriesRouter)
// app.use(basketsRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
