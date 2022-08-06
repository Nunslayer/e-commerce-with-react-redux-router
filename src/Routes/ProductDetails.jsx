import '../assets/styles/ProductDetails.css'
import {useParams, useNavigate, Outlet} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { getUploadCart } from '../store/slices/cart.slice'
import Products from '../components/Products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { Slider, SliderUnit } from '../components/Slider'
import Autocomplete from '../components/Autocomplete'

const ProductDetails = ()=>{
    const [counter, setCounter] = useState(1)
    const [product, setProduct]= useState({})
    const [category, setCategory]= useState([])
    const products = useSelector((state)=>state.products)
    const cart = useSelector((state)=>state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const moreIcon = <FontAwesomeIcon icon={faPlus} />
    const lessIcon = <FontAwesomeIcon icon={faMinus} />
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
        }else{
            setCounter(1)
        }
    },[id, cart])
    return (
        <>
        <section className="body--shop">
                <article className='header--shop'>
                    <Autocomplete/>
                    {/* <h1>Categorys</h1> */}
                    <div className="">
                        <button onClick={()=>dispatch(getProducts())}>All</button>
                        {' | '}
                        <button onClick={()=>dispatch(getProductsByCategory(1))}>Earrings</button>
                        {' | '}
                        <button onClick={()=>dispatch(getProductsByCategory(2))}>Necklaces</button>
                        {' | '}
                        <button onClick={()=>dispatch(getProductsByCategory(3))}>Rings</button>
                        {' | '}
                        <button onClick={()=>dispatch(getProductsByCategory(4))}>Bracelets</button>
                    </div>
                </article>
                <article className="main--shop">
                    <article className={location.pathname==='/shop'?'isOnlyShop prueba':'isCartActive prueba'}>
                    {
                        product.id && 
                            <div className="card--product__details">
                                {/* <img src={product.images[0].url}  /> */}
                                <Slider 
                                    controlls={true}
                                    images={product.images}
                                    widthImg='300px'
                                    heightImg='300px'
                                    idProduct={product.id}
                                >
                                    {product.images && product.images.map((image, index)=>{
                                        return(
                                            <SliderUnit 
                                                key={index}
                                                widthImg='300px'
                                                heightImg='300px' 
                                                image={image}
                                                idProduct={product.id}
                                            />
                                        )
                                    })}
                                </Slider>
                                <div className="product__details--description">
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <div className="quantity-to-cart">
                                        <button
                                            onClick={()=>{
                                                setCounter(counter+1)
                                            }}
                                        >
                                            {moreIcon}
                                        </button>
                                        <span> 
                                            {counter} 
                                        </span>
                                        <button
                                            disabled={counter===1}
                                            onClick={()=>{
                                                setCounter(counter-1)
                                            }}
                                        >
                                            {lessIcon}
                                        </button>
                                    </div>
                                    <button onClick={()=>{
                                            dispatch(getUploadCart(product.id,counter))
                                            // navigate('/cart')
                                        }}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                    }
                    {category && <Products products={category}/>}
                    </article>
                    <article className='prueba--cart'>
                        <Outlet/>
                    </article>
            </article>
            </section>
        </>
    )
}

export default ProductDetails