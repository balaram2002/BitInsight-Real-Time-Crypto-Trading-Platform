import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { authHeaders, getApiError } from '@/config/api'

const OrderDetails = () => {
  const { id } = useParams()
  const [order,setOrder] = useState(null)
  const [message,setMessage] = useState('')
  const [paymentMessage,setPaymentMessage] = useState('')

  useEffect(() => {
    api.get(`/api/orders/${id}`, {headers:authHeaders()})
      .then(({data}) => setOrder(data))
      .catch(error => setMessage(getApiError(error)))
  }, [id])

  if (message) return <p className="p-5 text-red-500">{message}</p>
  if (!order) return <p className="p-5">Loading order...</p>

  const payOrder = async () => {
    try {
      await api.put(`/api/wallet/order/${order.id}/pay`,null,{headers:authHeaders()})
      setPaymentMessage('Order payment completed')
    } catch (error) {
      setPaymentMessage(getApiError(error))
    }
  }

  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">Order #{order.id}</h1>
    <div className="border p-5 space-y-3">
      <p>Coin: {order.orderItem?.coin?.name}</p>
      <p>Type: {order.orderType}</p>
      <p>Quantity: {order.orderItem?.quantity}</p>
      <p>Price: {order.price}</p>
      <p>Status: {order.status}</p>
      <p>Created: {order.timestamp}</p>
      {paymentMessage && <p>{paymentMessage}</p>}
      {order.status === 'PENDING' && <button className="border px-4 py-2" onClick={payOrder}>Pay order</button>}
    </div>
  </div>
}

export default OrderDetails
