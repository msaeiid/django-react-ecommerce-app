import React from 'react'
import { Link } from 'react-router-dom'

const CardSummary = ({ cardTotal, tax }) => {

    const total = cardTotal

    return (
        <div className='col-md-4 align-self-start'>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Card Summary</h5>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <span>Subtotal:</span>
                        <span>${cardTotal.toFixed(2)}</span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <span>Tax:</span>
                        <span>${tax}</span>
                    </div>
                    <div className='d-flex justify-content-between mb-3'>
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Link to='/checkout'>
                        <button
                            className='btn btn-primary w-100'
                            style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}>
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardSummary