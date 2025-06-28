import React from 'react'
import { BASE_URL } from '../../Api'

const OrderItem = ({ item }) => {
    return (
        <div className='d-flex justify-content-between algin-items-center my-3' style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <div className='d-flex align-items-center'>
                <img
                    src={`${BASE_URL}${item.product.image}`}
                    alt='Product'
                    className='img-fluid'
                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '5px' }}
                />
                <div className='ms-3'>
                    <h6 className='mb-0'>{item.product.name}</h6>
                    <small>{`Quantity: ${item.quantity}`}</small>
                </div>
            </div>
            <h6 className='mb-0'>{`$${item.product.price}`}</h6>
        </div>
    )
}

export default OrderItem