import '../assets/styles/Cart.css'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import CardToCart from "../components/CardToCart"
import LoginForm from '../components/LoginForm'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import ConfirmAlert from '../components/ConfirmAlert'
import { AnimatePresence } from 'framer-motion'
const Cart = () => {
  const [showModal, setShowModal] = useState(false)
  const [showRemoveAll, setShowRemoveAll] = useState(false)
  const cart = useSelector((state => state.cart))
  const navigate = useNavigate()
  const getTotalPrice = () => {
    return cart.reduce((acc, { quantity, product: { price } }) => acc + quantity * price, 0)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const removeHandleClose = () => {
    setShowRemoveAll(false)
  }
  useEffect(() => {
    if (cart.length === 0) {
      setShowModal(false)
      setShowRemoveAll(false)
    }
  }, [cart])
  return (
    <section className='cart--section'>
      <div className='body--cart'>
        <AnimatePresence>
          {cart && cart.map((carrito, index) => {
            const { id, quantity, product } = carrito
            return (
              <CardToCart
                key={id}
                product={product}
                idItem={id}
                index={index}
                quantity={quantity}
              />
            )
          })}
        </AnimatePresence>
      </div>
      {showModal &&
        <Modal
          onClose={handleClose}
        >
          <LoginForm>
            { }
          </LoginForm>
        </Modal>
      }
      {cart.length === 0 &&
        <article className='empty--cart'>
          <h1>You Dont have products in your shopping cart</h1>
          <button onClick={() => navigate('/shop')}>Explore more</button>
        </article>
      }
      <div className="footer--cart">
        <div className="footer--cart__btn">
          <button
            disabled={cart.length === 0}
            className={cart.length === 0 ? 'btn-disabled' : null}
            onClick={() => {
              setShowModal(true)
            }}
          >
            Buy
          </button>
          <button
            disabled={cart.length === 0}
            className={cart.length === 0 ? 'btn-disabled' : null}
            onClick={() => {
              setShowRemoveAll(true)
            }}
          >
            Remove All
          </button>
          {showRemoveAll &&
            <Modal
              onClose={removeHandleClose}
            >
              <ConfirmAlert
                onClose={removeHandleClose}

              >
                You want delete <b>ALL</b> products from your cart?
              </ConfirmAlert>
            </Modal>
          }
        </div>
        <div className="global--price">
          <p>Total: {getTotalPrice().toFixed(2)} $</p>
        </div>
      </div>
    </section>
  )
}

export default Cart