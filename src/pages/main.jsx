import { useParams } from 'react-router-dom'
import RandomChar from '../components/randomChar/RandomChar'
import CharList from '../components/charList/CharList'
import CharInfo from '../components/charInfo/CharInfo'

function MainPage() {
	const { id } = useParams();

	return (
		<>
			<RandomChar />
			<div className='char__content'>
				<CharList activeCharId={id} />
				<CharInfo activeCharId={id} />
			</div>
		</>
	)
}

export default MainPage
