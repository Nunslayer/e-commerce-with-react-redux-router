import { useSelector, useDispatch } from "react-redux"
import { setRemoveItem } from "../store/slices/cart.slice"
import {useNavigate} from 'react-router-dom'
import CardToCart from "../components/CardToCart"
const Cart =()=>{
    const cart = useSelector((state=> state.cart))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <>
            {cart && cart.map((carrito)=>{
                const {id, quantity, product}=carrito
                return(
                    <CardToCart
                        key={id}
                        product={product}
                        idItem={id}
                        quantity={quantity}
                    />
                    // <>
                    // <div key={id} className="card--cart--product">
                    //     <h1>{quantity}</h1>
                    //     <h2>{product.name}</h2>
                    //     <img src={product.images[0].url} style={{width: '300px', height:'300px',}}/>
                    // </div>
                    // <button onClick={()=>{
                    //     dispatch(setRemoveItem(id))
                    //     // navigate('/cart')
                    // }}>
                    //     remove item
                    // </button>
                    // </>
                )
            })}
            <button
                onClick={()=>{

                }}
            >
                borrar todo
            </button>
        </>
    )
}

export default Cart