import './charInfo.scss';
import { useState, useEffect, useRef } from 'react';
import useAPIServices from '../../services/APIService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage'
import { Link, useParams } from 'react-router-dom';

function CharInfo({ activeCharId }) {
    const [charInfo, setCharInfo] = useState(null);
    const charInfoRef = useRef();
    const { id } = useParams();

    const { loading, error, getCharacterById } = useAPIServices(false);

    useEffect(() => {
        if (id) {
            updateChar(id);
        }
    }, [id])

    useEffect(() => {
        if (activeCharId?.id) {
            updateChar(activeCharId.id);
        }
    }, [activeCharId])

    function updateChar(id) {
        if (matchMedia('(max-width: 990px)').matches) {
            openModal()
        }
        getCharacterById(id)
            .then((res) => {
                setCharInfo(res);
            })
    }

    function openModal() {
        charInfoRef.current.style.right = '0%';
        document.body.style.overflow = 'hidden';
    }

    function coloseModal() {
        charInfoRef.current.style.right = '-100%';
        document.body.style.overflow = '';
    }

    return (
        <div className="char__modal-blur" ref={charInfoRef} onClick={(e) => {
            if (e.target === charInfoRef.current) {
                coloseModal();
            }
        }}>
            <div className="char__info" >
                <button className='char__close' onClick={coloseModal}>✖</button>
                {
                    error ? <ErrorMassage /> : loading ? <Spinner size={300} /> : charInfo ? <ViewCharInfo charInfo={charInfo} /> : <Skeleton />
                }
            </div>
        </div>
    )

}

const TR = ({ name, value }) => {
    let icon = null;
    if (name === 'status') {
        if (value === 'Dead') {
            icon = <StatusIcon style={{ backgroundColor: '#df2917' }} />
        } else if (value === 'Alive') {
            icon = <StatusIcon style={{ backgroundColor: '#12a012' }} />
        } else {
            icon = <StatusIcon style={{ backgroundColor: 'grey' }} />
        }
    } else if (name === 'gender') {
        if (value === 'Male') {
            icon = <StatusIcon >♂</StatusIcon >
        } else if (value === 'Female') {
            icon = <StatusIcon >♀</StatusIcon >
        } else if (value === 'unknown') {
            icon = <StatusIcon >?</StatusIcon >
        } else {
            icon = <StatusIcon >✖</StatusIcon >
        }
    }
    return (
        <tr>
            <td className="char__descr-prop-name">{name}</td>
            <td className="char__descr-prop-value">{icon}{value}</td>
        </tr>
    )
}

const StatusIcon = ({ style, children }) => {
    return (
        <span className='char__descr-status-icon' style={style}>{children}</span>
    )
}

const ViewCharInfo = ({ charInfo: { name, image, props } }) => {

    return (
        <>
            <div className="char__basics" >
                <img src={image} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__descr">
                        <table >
                            <tbody>
                                {Object.entries(props).map((e, i) => {
                                    if (e[1] === '' || e[1].url === '') {
                                        return
                                    } else if (e[0] === 'first seen') {
                                        return (
                                            < TR key={i} name={e[0]} value={<Link to={'/episodes/' + e[1].url}>{e[1].name}</Link>} />
                                        )
                                    }
                                    return (
                                        < TR key={i} name={e[0]} value={e[1]} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CharInfo;