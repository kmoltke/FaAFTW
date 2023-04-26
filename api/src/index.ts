import express, { Request, Response } from "express"
import cors from "cors"
import { basketsRouter } from "./baskets/baskets.route"
import { categoriesRouter } from "./categories/categories.route"
import { vinylsRouter } from "./vinyls/vinyls.route"
import { usersRouter } from "./users/users.route"
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.use(vinylsRouter)
app.use(categoriesRouter)
app.use(basketsRouter)
app.use(usersRouter)

app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found")
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
