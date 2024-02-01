import './charList.scss'
import useAPIServices from '../../services/APIService'
import { useState, useEffect } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMassage from '../errorMassage/ErrorMassage'
import { Link } from 'react-router-dom'

function CharList({ activeCharId, onCharSelected }) {
	const [charList, setCharlist] = useState([])
	const [charsOver, setCharsOver] = useState(false)
	const { loading, error, getAllCharacters } = useAPIServices(true)

	useEffect(() => {
		loadCharList()
	}, [])

	function loadCharList() {
		if (charsOver) {
			return
		}
		getAllCharacters(charList.length).then((res) => {
			setCharlist((charList) => [...charList, ...res])
			setCharsOver(res.length < 20)
		})
	}

	const characters = charList.map((e, i) => {
		const activeClass = activeCharId?.id === e.id ? ' char__item_selected' : ''
		return (
			<li className={'char__item' + activeClass}
				onClick={() => onCharSelected({ id: e.id })}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						onCharSelected({ id: e.id })
					}
				}}
				tabIndex={0}
				key={i}>
				<Link to={'/characters/' + e.id} >
					<img src={e.image} alt={e.name} />
					<div className='char__name'>{e.name}</div>
				</Link>
			</li>
		)
	})

	return (
		<div className='char__list'>
			<ul className='char__grid'>{characters}</ul>
			{error ? <ErrorMassage /> : loading ? <Spinner size={'150px'} /> : null}
			<button className='button button__main button__long' onClick={loadCharList} style={charsOver ? { display: 'none' } : null}>
				load more
			</button>
		</div>
	)
}

export default CharList
