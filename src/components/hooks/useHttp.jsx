import { useState } from 'react'

function useHttp(startLoading) {
    const [loading, setLoading] = useState(startLoading);
    const [error, setError] = useState(false);

    return { loading, setLoading, error, setError }
}

export default useHttp;