import '../assets/styles/Slider.css'
import { useCallback, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

const Slider = ({children, controlls = false, widthImg, heightImg, autoPlay = false}) => {
    const leftControlIcon = <FontAwesomeIcon icon={faAngleLeft} />
    const rightControlIcon = <FontAwesomeIcon icon={faAngleRight} />
    const sliderAutoPlay = useRef()
    const sliderArea = useRef(null)
    const location = useLocation()
    const nextSlice = useCallback(()=>{
        if(sliderArea.current?.children.length > 0){
            // console.log(sliderArea.current?.children[0])
            const firstElement = sliderArea.current?.children[0]
            sliderArea.current.style.transition = `300ms ease-out all`
            const widthElement = sliderArea.current?.children[0].offsetWidth
            sliderArea.current.style.transform = `translateX(-${widthElement}px)`
            const transicion = () =>{
                sliderArea.current.style.transition = 'none'
                sliderArea.current.style.transform = `translateX(0)`
                sliderArea.current.appendChild(firstElement)
                sliderArea.current.removeEventListener('transitionend', transicion)
            }
            sliderArea.current.addEventListener('transitionend', transicion)
            return
        }
        return
    },[children, autoPlay])
    // const nextSlice =()=>{
    //     console.log('siguiente')
        
    // }
    const prevSlice = useCallback(() => {
        console.log('anterior')
        if(sliderArea.current.children.length > 0){
            sliderArea.current.insertBefore(sliderArea.current.children[sliderArea.current.children.length - 1], sliderArea.current.firstChild)
            sliderArea.current.style.transition = 'none'
            sliderArea.current.style.transform = `translateX(-${sliderArea.current.children[0].offsetWidth}px)`
            setTimeout(()=> {
                sliderArea.current.style.transition = `300ms ease-out all`
                sliderArea.current.style.transform = `translateX(0)`
            }, 30)
        }
    }, [])

    useEffect(()=>{
        if(autoPlay){
            sliderAutoPlay.current = setInterval(()=>{
                nextSlice()
            },5000)

            // sliderArea.current.addEventListener('mouseenter', () => {
            //     clearInterval(sliderAutoPlay.current)
            // })
            // sliderArea.current.addEventListener('mouseleave', () => {
            //     sliderAutoPlay.current = setInterval(()=>{
            //         nextSlice()
            //     },5000)
            // })
            // return
        }
        return
    },[])
    return(
        <article 
            style={{width: widthImg, height: heightImg}}
            className="main--container--slider"
        >
            <div ref={sliderArea} className="container--slider">
                {/* {images && images.map((image, index)=>{
                    
                })
                    
                } */}
                {children}
            </div>
            {controlls && <div className="container--controlls--slider">
                <button
                    className='prev-btn'
                    onClick={prevSlice}
                >
                    {leftControlIcon}
                </button>
                <button
                    className='next-btn'
                    onClick={nextSlice}
                >
                    {rightControlIcon}
                </button>
            </div>}
        </article>
    )
}

const SliderUnit = ({widthImg, heightImg, idProduct, image}) =>{
    const location = useLocation()
    return(
        <div 
            className="slider--single"
            style={{width: widthImg, height: heightImg}}
        >
            <Link to={location.pathname.includes('cart')?`/shop/${idProduct}/cart`:`/shop/${idProduct}`}>
                <img 
                    src={image.url} 
                    alt={image.name} 
                    style={{display: 'block', width: '100%', height: '100%'}}
                />
            </Link>
        </div>
        )
}


export {Slider, SliderUnit}

