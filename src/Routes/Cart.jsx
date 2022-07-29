import '../assets/styles/Cart.css'
import { useSelector, useDispatch } from "react-redux"
import { setRemoveItem } from "../store/slices/cart.slice"
import {useNavigate} from 'react-router-dom'
import CardToCart from "../components/CardToCart"
const Cart =()=>{
  const cart = useSelector((state=> state.cart))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getTotalPrice=()=>{
    return cart.reduce((acc,{quantity,product:{price}}) => acc + quantity * price, 0)
  }
  return (
    <section className='cart--section'>
      <div className='body--cart'>
        {cart && cart.map((carrito)=>{
          const {id, quantity, product}=carrito
          return(
            <CardToCart
              key={id}
              product={product}
              idItem={id}
              quantity={quantity}
            />
          )
        })}
      </div>
      <div className="footer--cart">
        <div className="footer--cart__btn">
        <button
          onClick={()=>{

          }}
        >
          Buy
        </button>
        <button
          onClick={()=>{

          }}
        >
          Remove All
        </button>
        </div>
        <div className="global--price">
          <p>Total: {getTotalPrice().toFixed(2)} $</p>
        </div>
      </div>
    </section>
  )
}

export default Cart