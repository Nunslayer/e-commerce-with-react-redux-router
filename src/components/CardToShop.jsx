import {useNavigate} from 'react-router-dom'
const CardToShop =({product})=>{
    const navigate = useNavigate()
    return (
    <>
        <div className="card--product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.images[0].url} style={{width: '300px', height:'300px',}} />
        </div>
        <button onClick={()=>{
            navigate(`/shop/${product.id}`)
        }}>
            👀
        </button>
    </>
)
}

export default CardToShop