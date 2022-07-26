import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { getUploadCart } from '../store/slices/cart.slice'
import UserProfile from '../components/UserProfile'
const ProductDetails = ()=>{
    const [counter, setCounter] = useState(1)
    const [product, setProduct]= useState({})
    const [category, setCategory]= useState([])
    const products = useSelector((state)=>state.products)
    const cart = useSelector((state)=>state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
        const cartFilter = cart.filter(item=> item.product.id==id)
        const productFilter=products.filter(element=> element.id==id)
        console.log(productFilter)
        const categoryFilter=products.filter((element)=> element.category.id==productFilter[0].category.id)
        console.log(categoryFilter)
        setProduct(productFilter[0])
        setCategory(categoryFilter)
        if(cartFilter.length ===1){
            setCounter(Number(cartFilter[0].quantity))
        }
    },[id])
    return (
        <>
        <UserProfile />
        {product.id && <div className="card--product__details">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.images[0].url} style={{width: '300px', height:'300px',}} />
            <div className="quantity-to-cart">
                <button
                    onClick={()=>{
                        setCounter(counter+1)
                    }}
                >
                    ➕
                </button>
                {counter}
                <button
                    disabled={counter===1}
                    onClick={()=>{
                        setCounter(counter-1)
                    }}
                >
                    ➖
                </button>
            </div>
            <button onClick={()=>{
                    dispatch(getUploadCart(product.id,counter))
                    navigate('/cart')
                }}
            >
                add to cart
            </button>
        </div>}
        {category && category.map((productCategory)=>{
            if(productCategory.id ==id){
                return
            }else{
                const {id, name, description,images}= productCategory
                return(
                    <div key={id} className="card--product__category">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <img src={images[0].url} style={{width: '300px', height:'300px',}} />
                
                        <button onClick={()=>{
                            window.scrollTo(0,0)
                            navigate(`/shop/${id}`)
                        }}
                        >
                            👀
                        </button>
                    </div>
                )
            }
        })}
        </>
    )
}

export default ProductDetails