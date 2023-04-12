import express from "express"
import {
  addEmptyBasket,
  addProductToBasket,
  removeBasket,
  removeProductFromBasket,
  getBasketById,
} from "./baskets.controller"

export const basketsRouter = express.Router()

basketsRouter.get("/users/:userId/basket", getBasketById) //get basket for a specific user

basketsRouter.post("/users/:userId/basket", addEmptyBasket) //Create an empty shopping basket for a specific user.

basketsRouter.put("/users/:userId/basket/products", addProductToBasket) //Put a product in the basket for a specific user.

basketsRouter.delete(
  "/users/:userId/basket/products/:productId",
  removeProductFromBasket
) //remove a product from the basket for a specific user.

basketsRouter.delete("/users/:userId/basket", removeBasket)
