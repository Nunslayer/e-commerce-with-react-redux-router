import '../assets/styles/CardToStore.css'
import {motion} from 'framer-motion'
const variants = {
    noShow:{
        opacity: 0
    },
    show:({delay})=>({
        opacity: 1,
        transition:{
            delay,
            duration: 1
        }
    })
}
const CardToStore = ({order, index}) => {
    return(
        <motion.div 
            custom={{delay: (index + 1)*0.2}}
            className="card--store"
            initial='noShow'
            animate='show'
            variants={variants}
            layoutId={order.id}
        >
            <div>
              <img src={order.product.images[0].url} alt="" />
              <p>{order.product.name}</p>  
            </div>
            <p>{order.purchase_date.slice(0,10)}</p>
            
            <p>{order.quantity}</p>
            <p>{order.product.price} $</p>
            
        </motion.div>
    )
}

export default CardToStore