import { Vinyl} from "../../../../api/src/vinyls/vinyls.model"
import {Basket, BasketProduct} from "../../../../api/src/baskets/baskets.model";
import {useEffect, useState} from "react";


function BasketItem(basketProduct: BasketProduct) {
    const [product, setProduct] = useState(basketProduct)

    useEffect(() => {
        const api = async () => {
            const data = await fetch(`http://localhost:5000/products/${basketProduct.id}`)
            const jsonData = await data.json()
            setProduct(jsonData)
        }

        api()
    }, [])


}

export default BasketItem