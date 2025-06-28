import React, { useEffect, useState } from 'react'
import HomePage from './components/home/HomePage'
import MainLayout from './components/layout/MainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/ui/NotFoundPage'
import ProductPage from './components/product/ProductPage'
import api from './Api'
import CardPage from './components/card/CardPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import LoginPage from './components/user/LoginPage'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { AuthProvider } from './components/context/AuthContext'
import UserProfilePage from './components/user/UserProfilePage'
import PaymentSuccess from './components/checkout/PaymentSuccess'
import PaymentFailed from './components/checkout/PaymentFailed'


const App = () => {
  const [card, setCard] = useState([])
  const [loading, setLoading] = useState(false)
  const [numberOfItems, setNumberOfItems] = useState(0)

  useEffect(() => {
    if (!loading && localStorage.getItem('card_code')) {
      api.get(`/products/card/?card_code=${localStorage.getItem('card_code')}`)
        .then((res) => {
          if (res.status === 200) {
            setCard(res.data)
            setNumberOfItems(res.data.number_of_items)
            setLoading(true)
          }
        }).
        catch((err) => {
          console.log(err)
          setLoading(false)
          setNumberOfItems(0)
          setCard([])
        })
    }
  }, [card, loading, numberOfItems])
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numberOfItems={numberOfItems} />}>
            <Route index element={<HomePage />} />
            <Route path='products/:slug' element={<ProductPage setNumberOfItems={setNumberOfItems} />} />
            <Route path="card" element={<CardPage setNumberOfItems={setNumberOfItems} />} />
            <Route path="checkout/" element={<ProtectedRoute><CheckoutPage setNumberOfItems={setNumberOfItems} /></ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-failed" element={<PaymentFailed />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App