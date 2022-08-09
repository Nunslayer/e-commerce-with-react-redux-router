import '../assets/styles/Products.css'
import CardToShop from './CardToShop'
const Products = ({ products }) => {
  return (
    <div className="container--products">
      {products && products.map((product) => {
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