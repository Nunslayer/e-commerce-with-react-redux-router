import '../assets/styles/Cart.css'
import { useSelector, useDispatch } from "react-redux"
import { removeAllItemsCart, setBuyCartItems } from "../store/slices/cart.slice"
import {useNavigate} from 'react-router-dom'
import CardToCart from "../components/CardToCart"
import LoginForm from '../components/LoginForm'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
const Cart =()=>{
  const [showModal, setShowModal] = useState(false)
  const cart = useSelector((state=> state.cart))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getTotalPrice=()=>{
    return cart.reduce((acc,{quantity,product:{price}}) => acc + quantity * price, 0)
  }
  const handleClose=()=>{
    setShowModal(false)
  }
  useEffect(()=>{
    if(cart.length === 0) setShowModal(false)
  },[cart])
  console.log(cart)
  return (
    <>
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
      {showModal &&
        <Modal
          onClose={handleClose}
        >
          <LoginForm>
            {}
          </LoginForm>
        </Modal>
      }
      <div className="footer--cart">
        <div className="footer--cart__btn">
        <button
          disabled={cart.length===0}
          className={cart.length===0?'btn-disabled':null}
          onClick={()=>{
            setShowModal(true)
            // dispatch(setBuyCartItems())
          }}
        >
          Buy
        </button>
        <button
          disabled={cart.length===0}
          className={cart.length===0?'btn-disabled':null}
          onClick={()=>{
            dispatch(removeAllItemsCart())
          }}
        >
          Remove All
        </button>
        </div>
        <div className="global--price">
          <p>Total: {getTotalPrice().toFixed(2)} $</p>
        </div>
      </div>
      {cart.length===0 && 
        <article className='empty--cart'>
          <h1>You Dont have products in your shopping cart</h1>
          <button onClick={()=>navigate('/shop')}>Explore more</button>
        </article>
      }
    </section>
    
    </>
  )
}

export default Cart