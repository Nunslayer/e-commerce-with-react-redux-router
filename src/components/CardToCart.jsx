import '../assets/styles/CardToCart.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getUploadCart, setRemoveItem } from "../store/slices/cart.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose, faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { Slider } from './Slider'

const CardToCart=({idItem, product, quantity})=>{
  const restIcon = <FontAwesomeIcon icon={faCaretLeft} />
  const plusIcon = <FontAwesomeIcon icon={faCaretRight} />
  const closeIcon = <FontAwesomeIcon icon={faClose} />
  const [counter, setCounter] = useState(Number(quantity))
  const dispatch= useDispatch()
  return(
    <>
      <div className="card--cart">
        {/* <img src={product.images[0].url}/> */}
        <div className="img--cart--slider">
        <Slider
          // autoPlay={true}
          controlls={true}
          images={product.images}
          widthImg='150px'
          heightImg='150px'
          idProduct={product.id}
        />
        </div>
        <h3>{product.name}</h3>
        <div className="card--cart__details">
          <div className="card--cart__unit--price">
            <p><small>Unit Price: </small><b className='price--card'>{product.price} $</b></p>
          </div>
          <div className="card--cart__quantity">
            <p>Quantity: {quantity}</p>
            <div>
              <button
                  disabled={counter===1}
                  onClick={()=>{
                      setCounter(counter-1)
                  }}
              >
                  {restIcon}
              </button>
              <b>
                {counter}
              </b>
              <button
                  onClick={()=>{
                      setCounter(counter+1)
                  }}
              >
                {plusIcon}
              </button>
            </div>
            <button
              className={quantity==counter?'btn--modify btn-disabled':'btn--modify'}
              disabled={quantity==counter}
              onClick={()=>{
                  dispatch(getUploadCart(product.id, counter))
              }}
            >
                Modify
            </button>
          </div>
          <div className="card--cart__total--price">
            <p><small>T. Price: </small><b className='price--card'>{(product.price * quantity).toFixed(2)} $</b></p>
            
            <p><small>Change: </small>{quantity!==counter? <b className='price--card modify'>{(product.price * counter).toFixed(2)} $</b>:'nothing'}</p>
            
          </div>
        </div>
        <button
          className='btn--remove'
          onClick={()=>{
            dispatch(setRemoveItem(idItem))
          }}
        >
          {closeIcon}
        </button>
      </div>
      
    </>
  )
}

export default CardToCart