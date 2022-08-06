import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import '../assets/styles/ConfirmAlert.css'
import { setRemoveItem, removeAllItemsCart } from '../store/slices/cart.slice'
const ConfirmAlert = ({children, idItem = false, onClose}) => {
    const dispatch = useDispatch()
    return(
        <article className="container--alert--confirm">
            <p>{children}</p>
            <div>
            <button
                onClick={()=>{
                    if(idItem===false){
                        dispatch(removeAllItemsCart())
                    }else{
                        dispatch(setRemoveItem(idItem))
                    }
                }}
            >
                Confirm
            </button>
            <button
                onClick={onClose}
            >
                Cancel
            </button>
            </div>
        </article>
    )
}

export default ConfirmAlert