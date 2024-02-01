import './Spinner.scss'
import loadingPic from '../../resources/img/Portal-spinner.png'

const Spinner = ({ size = 200 }) => {
    return (
        <img src={loadingPic} alt="Loading" style={{ width: size + 'px' }} className='spinner' />
    )
}

export default Spinner;