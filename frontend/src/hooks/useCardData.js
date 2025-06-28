import React, { useEffect, useState } from 'react';
import api from '../Api';

function useCardData({setNumberOfItems}) {
    const [card, setCard] = React.useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [cardTotal, setCardTotal] = useState(0)
    const [dataFetched, setDataFetched] = useState(false)
    const tax = 0.4; // Assuming a fixed tax rate of 15%

  useEffect(() => {
    if (!dataFetched && localStorage.getItem('card_code')) {
      setLoading(true)
      api.get(`/products/card/?card_code=${localStorage.getItem('card_code')}`)
        .then((res) => {
          if (res.status === 200) {
            setCard(res.data)
            setItems(res.data.items)
            setCardTotal(res.data.sum_total)
            setNumberOfItems(res.data.items.map(item => item).reduce((acc, item) => acc + item.quantity, 0))
            setLoading(false)
            setDataFetched(true)
          }
        }).
        catch((err) => {
          console.log(err)
          setLoading(false)
          setCard([])
          setDataFetched(false)
        })
    }
  }, [loading])

  return {card,loading,items,cardTotal,dataFetched,setCard,setCardTotal,setItems,tax}
}

export default useCardData;