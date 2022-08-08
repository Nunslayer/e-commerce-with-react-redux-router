import '../assets/styles/User.css'
import { useDispatch, useSelector } from "react-redux"
import CardToStore from "../components/CardToStore"
import { useEffect, useState } from 'react'
import { getOrdersOfUser, reverseSort, sortByDate, sortByName, sortByPrice, sortByQuantity } from '../store/slices/orders.slice'

const User = () => {
  const userEntity = useSelector((state) => state.userEntity)
  const orders = useSelector((state)=> state.orders)
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState(null)
  useEffect(()=>{
    dispatch(getOrdersOfUser())
  },[])
  // useEffect(()=>{
  //   let arrayOrders = [...orders]
  //   const da = new Date(arrayOrders[0].purchase_date)
  //   console.log(da)
  //   arrayOrders = arrayOrders.sort((a, b)=> a.quantity - b.quantity)
  //   orders.sort((a, b)=> a.quantity - b.quantity)
  //   setSortArray(arrayOrders)
  // },[])
  return (
    <section className="user--page">
      <article className='user--page--data'>
        <h2>{userEntity.first_name} {userEntity.last_name}</h2>
        <h1>{userEntity.email}</h1>
      </article>
      <article className='tab--orders'>
        <div className="tab--header">
          <p
            className={sortBy==='name'? 'filter--active':null}
            onClick={()=>{
              if(sortBy==='name'){
                dispatch(reverseSort())
              }else{
                dispatch(sortByName())
              }
              setSortBy('name')
            }}
          >
            Name
          </p>
          <p
            className={sortBy==='date'? 'filter--active':null}
            onClick={()=>{
              if(sortBy==='date'){
                dispatch(reverseSort())
              }else{
                dispatch(sortByDate())
              }
              setSortBy('date')
            }}
          >
            Purchase date
          </p>
          <p
            className={sortBy==='quantity'? 'filter--active':null}
            onClick={()=>{
              if(sortBy==='quantity'){
                dispatch(reverseSort())
              }else{
                dispatch(sortByQuantity())
              }
              setSortBy('quantity')
            }}
          >
            Quantity
          </p>
          <p
            className={sortBy==='price'? 'filter--active':null}
            onClick={()=>{
              if(sortBy==='price'){
                dispatch(reverseSort())
              }else{
                dispatch(sortByPrice())
              }
              setSortBy('price')
            }}
          >
            Price
          </p>
        </div>
        <div className="body--orders">
          {orders && orders.map((order, index)=> {
            return(
              <CardToStore
              index={index}
                key={order.id}
                order={order}
              />
            )
          })}
          {orders.length === 0 && <h1>Nothing to see</h1>}
        </div>
      </article>
    </section>
  )
}

export default User