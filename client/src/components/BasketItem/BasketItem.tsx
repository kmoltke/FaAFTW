import { Basket } from "../../../../api/src/baskets/baskets.model"
import {useEffect, useState} from "react";
import {Vinyl} from "../../../../api/src/vinyls/vinyls.model"

interface basketItem {
    img: string
    artist: string
    album: string
    quantity: number
}

//TODO: quantity might not be updated
function BasketItem(props: {itemId: number, quantity: number}) {

    const vinyl = fetch(`http://localhost:5000/products/${props.itemId}`)
        .then(res => res.json());

    const [item, setItem] = useState<Vinyl>()

    useEffect(() => {
        fetch(`http://localhost:5000/products/${props.itemId}`)
            .then(res => res.json())
            .then(vin => setItem(vin))
    }, [])

    console.log(item)

    const fetchVinyl = async (id: number) => {
      const vinyl = await fetch(`http://localhost:5000/products/${id}`)
    }
    return (
        <div>
            <p>{item?.id}</p>
            <p>{item?.artist}</p>
        </div>
    )
}


export default BasketItem