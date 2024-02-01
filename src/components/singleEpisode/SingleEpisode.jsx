import './SingleEpisode.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAPIServices from '../../services/APIService';
import Spinner from '../spinner/Spinner'
import Page404 from '../../pages/page404'
import Arrow from '../../resources/img/arrow.svg'

const SingleEpisode = () => {
    const [episode, setEpisode] = useState(null);
    const { loading, error, getEpisodeById, getSomeCharacters } = useAPIServices(true);
    const { id } = useParams();

    useEffect(() => {
        getEpisodeById(id)
            .then((res) => {
                getSomeCharacters(res.chars)
                    .then((res2) => {
                        res.chars = res2;
                        setEpisode(res);
                    })

            })
    }, [id])

    return (
        <>
            {error ? <Page404 /> : loading ? <Spinner size={'200px'} /> : <View episode={episode} />}
        </>
    )
}

const View = ({ episode: { id, name, episode, air_date, chars } }) => {

    return (
        <div className="single-episode">
            <h2 className="single-episode__name">{name}</h2>
            <p className="single-episode__descr">{episode}</p>
            <p className="single-episode__descr">Release date: {air_date}</p>
            <p className="single-episode__descr">Characters:</p>
            <div className="single-episode__chars">{chars.map((e, i, a) => {
                return (
                    <span key={e.id}>
                        <Link to={'/' + e.id} className='single-episode__char' key={e.id}>
                            {e.name}
                        </Link>
                        {a.length > 1 + i ? ', ' : null}
                    </span>
                )
            })}</div>
            <div className="single-episode__navigation-buttons">
                <Link to={'/episodes/' + (-1 + id)} className="single-episode__back">
                    <button className='button button__main button__long' style={{ textAlign: 'end' }}>
                        <img src={Arrow} alt="Arrow" style={{ left: '10px', transform: 'scale(-1, 1)' }} />PREV
                    </button>
                </Link>
                <Link to="/episodes" className="single-episode__back">
                    <button className='button button__main button__long'>
                        Back to all
                    </button>
                </Link>
                <Link to={'/episodes/' + (1 + id)} className="single-episode__back">
                    <button className='button button__main button__long' style={{ textAlign: 'start' }}>
                        NEXT<img src={Arrow} alt="Arrow" style={{ right: '10px' }} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SingleEpisode;