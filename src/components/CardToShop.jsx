import '../assets/styles/CardToShop.css'
import {useNavigate} from 'react-router-dom'
import { Slider } from './Slider'
const CardToShop =({product})=>{
    const navigate = useNavigate()
    return (
    <>
        <div 
            className="card--product"
            onClick={()=>{
                window.scrollTo(0,0)
                navigate(`/shop/${product.id}`)
            }}
        >
            {/* <img src={product.images[0].url}/> */}
            <Slider
                autoPlay={true}
                // controlls={true}
                images={product.images}
                widthImg='250px'
                heightImg='250px'
                idProduct={product.id}
            />
            <div className="card--product__description">
                <h3>{product.name}</h3>
                <p>{product.price} $</p>
            </div>
        </div>
        
    </>
)
}

export default CardToShop