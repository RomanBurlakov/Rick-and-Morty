import './appHeader.scss'
import logo from '../../resources/img/Rick_and_Morty_Logo.png'
import { NavLink, Link } from 'react-router-dom'

function ActiveLink({ isActive, isPending }) {
	return {
		color: isActive ? '#00a1b7' : isPending ? 'green' : ''
	}
}

const AppHeader = () => {
	return (
		<header>
			<div className='app__content app__header'>
				<Link to='/'>
					<img src={logo} alt="Rick and Morty Logo" style={{}} />
				</Link>
				<nav className='app__menu'>
					<ul>
						<li><NavLink to='/characters' title='Characters' style={ActiveLink}>Characters</NavLink></li>
						<li className='app__menu-separator'>/</li>
						<li><NavLink to='/episodes' title='Episodes' style={ActiveLink}>Episodes</NavLink></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default AppHeader
