import ProductPagePlaceHolder from './ProductPagePlaceHolder'
import RelatedProducts from './RelatedProducts'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../Api'
import { BASE_URL } from '../../Api'
import { toast } from 'react-toastify'

const ProductPage = ({ setNumberOfItems }) => {

    const { slug } = useParams()
    const [product, setProduct] = React.useState({})
    const [similarProducts, setSimilarProducts] = React.useState([])
    const [loading, setLoading] = useState(true)
    const [inCard, setInCard] = useState(false)


    function add_product_to_cart() {
        api.post('products/add_product/', { card: localStorage.getItem('card_code'), product_id: product.id })
            .then((reposnse) => {
                if (reposnse.status === 200) {
                    toast.success('Product added to cart successfully');
                    localStorage.setItem('card_code', reposnse.data.code);
                    setInCard(true);
                    setNumberOfItems(curr => curr + 1);
                }
            }).catch((error) => {
                toast.error('Error adding product to cart');
            }
            );
    }

    useEffect(() => {
        if (product.id) {
            api.get(`products/product_in_card/?card_code=${localStorage.getItem('card_code')}&product_id=${product.id}`)
                .then((response) => {
                    setInCard(response.data.product_exists);

                }).catch((error) => {
                    toast.error('Error checking product in cart');
                }
                );
        }
    }, [product.id])

    useEffect(() => {
        api.get(`products/${slug}`)
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setProduct(response.data);
                    setSimilarProducts(response.data.similar_products || []);
                } else {
                    setLoading(true);
                    setProduct({});
                    setSimilarProducts([]);
                }
            })
            .catch((error) => {
                setProduct({});
                toast.error('Error fetching product details');
            });
    }, [slug]);


    return (
        <div>
            {loading && <ProductPagePlaceHolder />}
            {!loading && <>
                <section className='py-3'>
                    <div className='container px-4 px-lg-5 my-5'>
                        <div className='row gx-4 gx-lg-5 align-items-center'>
                            <div className='col-md-6'>
                                <img
                                    className='card-img-top mb-5 mb-md-0'
                                    src={`${BASE_URL}${product.image}`}
                                    alt='Product Image'
                                />
                            </div>
                            <div className='col-md-6'>
                                <div className='small mb-1'>SKU: {product.slug}</div>
                                <h1 className='display-5 fw-bolder'>{product.name}</h1>
                                <div className='fs-5 mb-5'>
                                    {/* <span className='text-decoration-line-through'>$49.99</span> */}
                                    <span>{`$${product.price}`}</span>
                                </div>
                                <p className='lead'>{product.description}</p>
                                <div className='d-flex'>
                                    <button
                                        className='btn btn-outline-dark flex-shrink-0'
                                        type='button'
                                        onClick={add_product_to_cart}
                                        disabled={inCard}
                                    >
                                        <i className='bi-cart-fill me-1'></i>
                                        {inCard ? 'In Cart' : 'Add to cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <RelatedProducts similarProducts={similarProducts} />
            </>}
        </div>
    )
}

export default ProductPage