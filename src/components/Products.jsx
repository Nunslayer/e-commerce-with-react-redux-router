import '../assets/styles/Products.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from '../store/slices/products.slice'
import CardToShop from './CardToShop'
const Products = ({products}) => {
    // const [products, setProducts] = useState([])
    // const products = useSelector((state)=>state.products)
    // const userLog = useSelector((state)=> state.userLog)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // useEffect(()=>{
    //     if(userLog.isLogin&&products.length===0){
    //         dispatch(getProducts())
    //     }
    // },[userLog])
    return(
        <div className="container--products">
            {products && products.map((product)=>{
                return (
                    <CardToShop
                        key={product.id}
                        product={product}
                    />
                )
            })}
        </div>
    )
}
export default Products