import { faHourglass1 } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Autocomplete from "../components/Autocomplete"
import Products from "../components/Products"
import { getProducts, getProductsByCategory } from "../store/slices/products.slice"


const Shop =()=>{
    const products = useSelector((state)=>state.products)
    const userLog = useSelector((state)=> state.userLog)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(userLog.isLogin){
            dispatch(getProducts())
        }
    },[userLog])
    return(
        <>
            <section className="main--shop">
                <Autocomplete/>
                {/* <h1>Categorys</h1> */}
                <div className="">
                    <button onClick={()=>dispatch(getProducts())}>All</button>
                    <button onClick={()=>dispatch(getProductsByCategory(1))}>Earrings</button>
                    <button onClick={()=>dispatch(getProductsByCategory(2))}>Necklaces</button>
                    <button onClick={()=>dispatch(getProductsByCategory(3))}>Rings</button>
                    <button onClick={()=>dispatch(getProductsByCategory(4))}>Bracelets</button>
                </div>
            </section>
            {products.length>0 &&<Products 
                products={products}
            />}
            {products.length===0 && <h1>Product not found... try again please</h1>}
        </>
    )
}

export default Shop