import '../assets/styles/CardToCart.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUploadCart, setRemoveItem } from "../store/slices/cart.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose, faCaretRight, faCaretLeft} from '@fortawesome/free-solid-svg-icons'
import { Slider, SliderUnit } from './Slider'
import Modal from './Modal'
import ConfirmAlert from './ConfirmAlert'

import {motion} from 'framer-motion'

const variants = {
  hidden:{
    opacity:0
  },
  visible: ({delay})=>({
    opacity: 1,
    transition: {
      delay,
      duration: 1
    }
  })
}

const CardToCart=({idItem, product, quantity, index})=>{
  const restIcon = <FontAwesomeIcon icon={faCaretLeft} />
  const plusIcon = <FontAwesomeIcon icon={faCaretRight} />
  const closeIcon = <FontAwesomeIcon icon={faClose} />
  const [counter, setCounter] = useState(Number(quantity))
  const [showConfirm, setShowConfirm] = useState(false)
  const handleConfirmClose = () => {
    setShowConfirm(false)
  }
  const dispatch= useDispatch()
  useEffect(()=>{
    setCounter(Number(quantity))
  },[quantity])
  return(
      <motion.div 
        className="card--cart"
        custom={{delay: (index + 1)*0.1}}
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={variants}
        layoutId={idItem}
      >
        {/* <img src={product.images[0].url}/> */}
        <div className="img--cart--slider">
        <Slider
          // autoPlay={true}
          controlls={true}
          images={product.images}
          widthImg='150px'
          heightImg='150px'
          idProduct={product.id}
        >
          {product.images && product.images.map((image, index)=>{
                    return(
                        <SliderUnit 
                            key={image.url + index}
                            widthImg='150px'
                            heightImg='150px'
                            image={image} 
                            idProduct={product.id}
                        />
                    )
                })}
        </Slider>
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
            setShowConfirm(true)
            // dispatch(setRemoveItem(idItem))
          }}
        >
          {closeIcon}
        </button>
        {showConfirm &&
          <Modal
            onClose={handleConfirmClose}
          >
            <ConfirmAlert
              onClose={handleConfirmClose}
              idItem={idItem}
            >
              You want delete <b>{product.name}</b>  from your cart?
            </ConfirmAlert>
          </Modal>
        }
      </motion.div>
  )
}

export default CardToCart