import '../assets/styles/User.css'
import { useSelector } from "react-redux"
import CardToStore from "../components/CardToStore"

const User = () => {
  const userEntity = useSelector((state) => state.userEntity)
  const orders = useSelector((state)=> state.orders)
  return (
    <section className="user--page">
      <article className='user--page--data'>
        <h2>{userEntity.first_name} {userEntity.last_name}</h2>
        <h1>{userEntity.email}</h1>
      </article>
      <article className='tab--orders'>
        <div className="tab--header">
          <p>Name</p>
          <p>Purchaise date</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        <div className="body--orders">
          {orders && orders.map((order)=> {
            return(
              <CardToStore
                key={order.id}
                order={order}
              />
            )
          })}
        </div>
      </article>
    </section>
  )
}

export default User