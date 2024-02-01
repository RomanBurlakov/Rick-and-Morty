import useHttp from '../components/hooks/useHttp'

function useAPIServices(startLoading) {
    const { loading, setLoading, error, setError } = useHttp(startLoading);

    const _apiBase = 'https://rickandmortyapi.com/api/';

    async function getResources(url) {
        setLoading(true);
        setError(false);
        try {
            let res = await fetch(url);
            if (!res.ok) {
                setError(true);
                throw new Error('Could not find ' + url + ', status: ' + res.status);
            } else {
                setError(false);
            }
            res = await res.json();
            setLoading(false);
            return res
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    async function getAllCharacters(offset) {
        const page = offset / 20 + 1;
        const res = await getResources(_apiBase + 'character/?page=' + page);
        return res.results.map(({ id, name, image }) => {
            return {
                id,
                name,
                image
            }
        });
    }

    async function getSomeCharacters(array) {
        const res = await getResources(_apiBase + 'character/' + array);
        return res.map(({ id, name }) => {
            return {
                id,
                name,
            }
        });
    }

    async function getRandomCharacter() {
        const res = await getResources(_apiBase + 'character/' + Math.floor(Math.random() * (826 - 1 + 1) + 1));
        return res;
    }

    async function getCharacterById(id) {
        const res = await getResources(_apiBase + 'character/' + id);
        return transformCharacter(res)
    }

    async function getAllEpisodes(offset) {
        const page = offset / 20 + 1;
        const res = await getResources(_apiBase + 'episode/?page=' + page);
        return res.results.map((e) => transformEpisode(e));
    }

    async function getEpisodeById(id) {
        const res = await getResources(_apiBase + 'episode/' + id);
        const chars = res.characters.map(e => e.replace(/\D/g, ""))
        return { ...transformEpisode(res), chars };
    }

    async function transformCharacter({ id, name, image, status, gender, species, type, episode, location }) {
        let episode1 = { name: '', url: '' }
        if (id < 6) {
            episode[0] = _apiBase + "episode/1";
        }
        if (episode.length > 0) {
            episode1 = await getResources(episode[0])
        }
        return {
            id,
            name,
            image,
            props: {
                status,
                gender,
                species,
                type,
                location: location.name,
                'first seen': {
                    name: episode1.name,
                    url: episode1.url.replace(/\D/g, "")
                },
            }
        }
    }

    function transformEpisode({ id, name, air_date, episode }) {
        return {
            id,
            name,
            air_date,
            episode: episode.replace(/E0*|E(?=\d)/, " Episode ").replace(/S0*|S(?=\d)/, "Season "),
        }
    }

    return { loading, error, getAllCharacters, getSomeCharacters, getRandomCharacter, getCharacterById, getAllEpisodes, getEpisodeById }
}

export default useAPIServices;