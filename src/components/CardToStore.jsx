import '../assets/styles/CardToStore.css'
const CardToStore = ({order}) => {
    return(
        <div className="card--store">
            <div>
              <img src={order.product.images[0].url} alt="" />
              <p>{order.product.name}</p>  
            </div>
            <p>{order.purchase_date.slice(0,10)}</p>
            
            <p>{order.quantity}</p>
            <p>{order.product.price} $</p>
            
        </div>
    )
}

export default CardToStore