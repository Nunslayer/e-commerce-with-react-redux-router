import '../assets/styles/Lobi.css'
import {useLocation, useNavigate} from 'react-router-dom'
import bgJewelry from '../assets/images/beautiful-woman-with-artistic-make-up.jpg'
const Lobi =()=>{
  const location =useLocation()
  console.log(location)
  return(
    <>
    <section className="main--lobi">
      <div className='mark--container'>
        <p className='mark--tittle'>Mari<span>{'&'}</span>co</p>
        <p className='mark--description'>Beatiful like you</p>
      </div>
      <img src={bgJewelry} alt="" /> 
    </section>
    </>
  )
}
export default Lobi