import { useDispatch } from 'react-redux'
import '../assets/styles/Autocomplete.css'
import { getProductsByName } from '../store/slices/products.slice'
import { useForm } from 'react-hook-form'

const Autocomplete = () => {
  const { handleSubmit, register, reset } = useForm()
  const dispatch = useDispatch()
  const searchSubmit = data => {
    dispatch(getProductsByName(data.query))
    reset()
  }
  return (
    <>
      <article 
        className="autocomplete" 
        onSubmit={handleSubmit(searchSubmit)}
      >
        <form className="input--autocomplete">
          <input 
            type="text" 
            {...register('query')}
          />
          <button>
            Search
          </button>
        </form>
      </article>
    </>
  )
}

export default Autocomplete