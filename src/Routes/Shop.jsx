import '../assets/styles/Shop.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import Autocomplete from "../components/Autocomplete"
import Products from "../components/Products"
import { getProducts, getProductsByCategory } from "../store/slices/products.slice"


const Shop =()=>{
    const products = useSelector((state)=>state.products)
    const userLog = useSelector((state)=> state.userLog)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(()=>{
        if(userLog.isLogin){
            dispatch(getProducts())
        }
    },[userLog])
    return(
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
                        {products.length>0?<Products 
                            products={products}
                        />:<h1>Product not found... try again please</h1>}
                        {/* {products.length===0 && <h1>Product not found... try again please</h1>} */}
                    </article>
                    <article className='prueba--cart'>
                        <Outlet/>
                    </article>
            </article>
            </section>
            
        </>
    )
}

export default Shop