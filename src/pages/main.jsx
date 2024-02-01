import { useState } from 'react'
import RandomChar from '../components/randomChar/RandomChar'
import CharList from '../components/charList/CharList'
import CharInfo from '../components/charInfo/CharInfo'

function MainPage() {
	const [activeCharId, setActiveCharId] = useState(null);

	return (
		<>
			<RandomChar onCharSelected={setActiveCharId} />
			<div className='char__content'>
				<CharList onCharSelected={setActiveCharId} activeCharId={activeCharId} />
				<CharInfo activeCharId={activeCharId} />
			</div>
		</>
	)
}

export default MainPage
