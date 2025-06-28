import React from 'react'
import CardItem from './CardItem'
import CardSummary from './CardSummary'
import Spinner from '../ui/Spinner'
import useCardData from '../../hooks/useCardData'


const CardPage = ({ setNumberOfItems }) => {
  const { card, loading, items, cardTotal, dataFetched, setCard, setCardTotal, setItems, tax } = useCardData({ setNumberOfItems })

  if (items.length < 1 && !loading) {
    return (<div className='alert alert-primary text-center my-5' role='alert'>
      <h5 className='text-center'>Your Shopping Card is Empty</h5>
      <p className='text-center'>Please add some products to your card</p>
    </div>
    )
  }

  if (loading) {
    return <Spinner loading={loading} />
  }


  return (
    <div className='container my-3 py-3' style={{ height: '80vh', overflow: 'scroll' }}>
      <h5 className='mb-4'>Shopping Card</h5>
      <div className='row'>
        <div className='col-md-8'>
          {items.map(item => <CardItem item={item} key={item.id} setCardTotal={setCardTotal} items={items} setNumberOfItems={setNumberOfItems} setItems={setItems} />)}
        </div>

        <CardSummary cardTotal={cardTotal} tax={tax} />
      </div>
    </div>
  )
}

export default CardPage