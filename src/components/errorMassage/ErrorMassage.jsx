import errorPic from '../../resources/img/404.png'

const ErrorMassage = (props) => {
    const height = props.height || '250px';

    return (
        <img src={errorPic} alt="Error" style={{ margin: '0 auto', height: height, display: 'block' }} />
    )
}

export default ErrorMassage;