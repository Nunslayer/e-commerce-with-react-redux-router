import '../assets/styles/Lobi.css'
import {useNavigate} from 'react-router-dom'
import bgJewelry from '../assets/images/beautiful-woman-with-artistic-make-up.jpg'
const Lobi =()=>{
  return(
    <>
    <section className="main--lobi">
      <div className='mark--container'>
        <p className='mark--tittle'>Mari<span>{'&'}</span>co</p>
        <p className='mark--description'>Unica como tu</p>
      </div>
      <img src={bgJewelry} alt="" /> 
    </section>
    </>
  )
}
export default Lobi