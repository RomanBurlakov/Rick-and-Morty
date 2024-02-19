import './randomChar.scss'
import picture from '../../resources/img/rick_morty_fu.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAPIServices from '../../services/APIService'
import Spinner from '../spinner/Spinner'
import ErrorMassage from '../errorMassage/ErrorMassage'

function RandomChar({ onCharSelected }) {
	const [char, setChar] = useState({})

	const { loading, error, getRandomCharacter } = useAPIServices(true)

	useEffect(() => {
		updateChar()
	}, [])

	function updateChar() {
		getRandomCharacter().then((res) => {
			if (!res) {
				return
			}
			setChar(res)
		})
	}

	return (
		<div className='randomchar'>
			{error ? <ErrorMassage /> : loading ? <Spinner size={'200px'} /> : <ViewChar char={char} updateChar={updateChar} />}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					You can know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button className='button button__main' onClick={updateChar}>try it</button>
				<img src={picture} alt='rick and morty portal' className='randomchar__decoration' />
			</div>
		</div>
	)
}

const ViewChar = ({ char: { id, name, image, status, species }, updateChar }) => {

	return (
		<div className='randomchar__block'>
			<img src={image} alt={name} className='randomchar__img' />
			<div className='randomchar__container'>
				<div className='randomchar__info'>
					<p className='randomchar__name'>{name}</p>
					<p className='randomchar__descr'>{status + ' — ' + species}</p>
				</div>
				<div className='randomchar__buttons' >
					<Link to={'/character/' + id} >
						<button className='button button__main'>
							More info
						</button>
					</Link>
					<button className='button button__main try' onClick={updateChar}>
						try it
					</button>
				</div>
			</div>
		</div>
	)
}

export default RandomChar
