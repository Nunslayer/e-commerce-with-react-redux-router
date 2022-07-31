import '../assets/styles/Modal.css'
import ReactDOM from 'react-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'
export default function Modal ({children, onClose})  {
    const closeIcon= <FontAwesomeIcon icon={faClose} />
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal--content">
                <button onClick={onClose}>
                    {closeIcon}
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('root')
    )
}
