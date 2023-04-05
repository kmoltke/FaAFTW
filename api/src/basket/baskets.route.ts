import express from "express"
import {
  addBasketProduct,
  getBasket,
  postBasket,
  removeBasket,
  removeBasketProduct,
} from "./baskets.controler"

export const basketRouter = express.Router()

basketRouter.post("/users/:userId/basket", postBasket) //Create a shopping basket for a specific user.

basketRouter.get("/users/:userId/basket", getBasket) //get basket for a specific user

basketRouter.put("/users/:userId/basket/products", addBasketProduct) //Put a product in the basket for a specific user.

basketRouter.delete(
  "/users/:userId/basket/products/:productId",
  removeBasketProduct
) //remove a product from the basket for a specific user.

basketRouter.delete("/users/:userId/basket", removeBasket)
