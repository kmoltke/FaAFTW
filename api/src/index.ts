import express, { Request, Response } from 'express'
import { basketRouter } from './basket/baskets.route'
import { categoriesRouter } from './categories/categories.route'
import { vinylsRouter } from './vinyls/vinyls.route'
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use(vinylsRouter)
app.use(categoriesRouter)
app.use(basketRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
