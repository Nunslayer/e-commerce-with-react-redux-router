import '../assets/styles/CardToShop.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { Slider, SliderUnit } from './Slider'
const CardToShop = ({ product }) => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <>
      <div
        className="card--product"
        onClick={() => {
          window.scrollTo(0, 0)
          if (location.pathname.includes('cart')) {
            navigate(`/shop/${product.id}/cart`)
          } else {
            navigate(`/shop/${product.id}`)
          }
        }}
      >
        <Slider
          autoPlay={true}
          images={product.images}
          widthImg='250px'
          heightImg='250px'
          idProduct={product.id}
        >
          {product.images && product.images.map((image, index) => {
            return (
              <SliderUnit
                key={image.url + index}
                widthImg='250px'
                heightImg='250px'
                image={image}
                idProduct={product.id}
              />
            )
          })}
        </Slider>
        <div className="card--product__description">
          <h3>{product.name}</h3>
          <p>{product.price} $</p>
        </div>
      </div>
    </>
  )
}

export default CardToShop