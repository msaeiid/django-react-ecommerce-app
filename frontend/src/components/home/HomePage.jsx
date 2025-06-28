import React, { useEffect, useState } from 'react'
import Header from '../home/Header.jsx'
import CardContainer from '../home/CardContainer.jsx'
import api from '../../Api.jsx'
import PlaceHolderContainer from '../ui/PlaceHolderContainer.jsx'
import { toast } from 'react-toastify';


const HomePage = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        api.get('products')
            .then(response => {
                setLoading(false)
                setProducts(response.data)
                setError(null)
            }).catch(error => {
                toast.error('Error fetching products')
                setLoading(true)
                setError(error.message)
            })
    }, [])
    return (
        <>
            <Header />
            {error && <Error error={error} />}
            {loading && <PlaceHolderContainer />}
            {!loading || error === null ? <CardContainer products={products} /> : null}
        </>
    )
}

export default HomePage