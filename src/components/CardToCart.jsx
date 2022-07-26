import { useState } from "react"
import { useDispatch } from "react-redux"
import { getUploadCart, setRemoveItem } from "../store/slices/cart.slice"

const CardToCart=({idItem, product, quantity})=>{
    const [counter, setCounter] = useState(Number(quantity))
    const dispatch= useDispatch()
    return(
        <>
            <div className="card--cart--product">
                <h1>{quantity}</h1>
                <h2>{product.name}</h2>
                <img src={product.images[0].url} style={{width: '200px', height:'200px',}}/>
                <button
                    onClick={()=>{
                        setCounter(counter+1)
                    }}
                >
                    ➕
                </button>
                {counter}
                <button
                    disabled={counter===1}
                    onClick={()=>{
                        setCounter(counter-1)
                    }}
                >
                    ➖
                </button>
                {counter!== quantity && <button
                    onClick={()=>{
                        dispatch(getUploadCart(product.id, counter))
                    }}
                >
                    💹
                </button>}
            </div>
            <button onClick={()=>{
                dispatch(setRemoveItem(idItem))
            }}>
                ❌
            </button>
        </>
    )
}

export default CardToCart