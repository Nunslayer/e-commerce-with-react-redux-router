import '../assets/styles/CardToShop.css'
import {useNavigate} from 'react-router-dom'
const CardToShop =({product})=>{
    const navigate = useNavigate()
    return (
    <>
        <div 
            className="card--product"
            onClick={()=>{
                navigate(`/shop/${product.id}`)
            }}
        >
            <img src={product.images[0].url}/>
            <div className="card--product__description">
                <h3>{product.name}</h3>
                <p>{product.price} $</p>
            </div>
        </div>
        
    </>
)
}

export default CardToShop