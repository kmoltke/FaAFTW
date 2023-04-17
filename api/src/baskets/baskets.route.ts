import express from "express"
import {
  addEmptyBasket,
  addProductToBasket,
  removeBasket,
  removeProductFromBasket,
  getBasketById,
} from "./baskets.controller"

export const basketsRouter = express.Router()

basketsRouter.get("/users/:userId/basket", getBasketById) //get single basket

basketsRouter.post("/users/:userId/basket", addEmptyBasket) //Create empty basket

basketsRouter.put("/users/:userId/basket/products", addProductToBasket) //Put product in basket

basketsRouter.delete(
  "/users/:userId/basket/products/:productId",
  removeProductFromBasket
) //remove product from basket

basketsRouter.delete("/users/:userId/basket", removeBasket) //Remove an entire basket
