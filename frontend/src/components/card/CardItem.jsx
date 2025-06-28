import React from 'react'
import { BASE_URL } from '../../Api'
import api from '../../Api'
import { toast } from 'react-toastify';

const CardItem = ({ item, setCardTotal, items, setNumberOfItems, setItems }) => {

  const [quantity, setQuantity] = React.useState(item.quantity);
  const [loading, setLoading] = React.useState(false);




  const handleUpdate = () => {
    setLoading(true)


    const itemData = { 'item_id': item.id, 'quantity': quantity };

    api.patch('products/update_quantity/', itemData)
      .then((response) => {
        const updatedItems = items.map(i => i.id === item.id
          ? response.data : i);
        const newTotal = updatedItems.reduce(
          (acc, curr) => acc + Number(curr.total_price), 0);
        setCardTotal(newTotal);

        setNumberOfItems(updatedItems.map(item => item).
          reduce((acc, curr) => acc + curr.quantity, 0))
        setLoading(false);
        toast.success('Cart updated successfully!')
      }
      )
      .catch((error) => {
        toast.error('Error updating item in cart');
        setLoading(false);
      })
  }


  const handleRemove = () => {
    const confirmRemove = window.confirm('Are you sure you want to remove this item from the cart?');
    if (!confirmRemove) return;

    setLoading(true)
    api.delete(`products/delete_product/${item.id}`)
      .then((response) => {
        const updatedItems = items.filter(i => i.id !== item.id);

        setItems(updatedItems);

        setNumberOfItems(updatedItems.map(item => item).
          reduce((acc, curr) => acc + curr.quantity, 0))

        setCardTotal(updatedItems.reduce(
          (acc, curr) => acc + Number(curr.total_price), 0));
        toast.success('Product removed successfully!')
        setLoading(false)
      }
      )
      .catch((error) => {
        toast.error('Error removing item from cart');
        setLoading(false);
      })
  }

  return (
    <div className='col-md-12'>
      <div
        className='card-item d-flex align-items-center p-3 mb-3'
        style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>

        <img
          src={`${BASE_URL}${item.product.image}`}
          alt={item.product.name}
          className='img-fluid'
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50px' }}
        />
        <div className='ms-3 flex-grow-1'>
          <h5 className='mb-1'>{item.product.name}</h5>
          <p className='mb-0 text-muted'>{`$${item.product.price}`}</p>
        </div>
        <div className='d-flex align-items-center'>
          <input
            type='number'
            className='form-control me-3'
            style={{ width: '70px' }}
            min='1'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button
          className='btn mx-2 btn-sm'
          onClick={handleUpdate}
          style={{ backgroundColor: '#4b3bcb', color: 'white' }}
          disabled={loading}
        >Update</button>
        <button
          className='btn btn-danger btn-sm'
          onClick={handleRemove}
          disabled={loading}
        >Remove</button>
      </div>

    </div>
  )
}

export default CardItem