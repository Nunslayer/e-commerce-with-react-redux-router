import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Products from "../components/Products"
import { getProducts } from "../store/slices/products.slice"

const Shop =()=>{
    const products = useSelector((state)=>state.products)
    const userLog = useSelector((state)=> state.userLog)
    useEffect(()=>{
        if(userLog.isLogin&&products.length===0){
            useDispatch(getProducts())
        }
    },[userLog])
    return(
        <>
            {products &&<Products 
                products={products}
            />}
        </>
    )
}

export default Shop