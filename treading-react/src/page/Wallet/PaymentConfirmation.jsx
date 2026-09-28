import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api, { authHeaders, getApiError } from '@/config/api'

const PaymentConfirmation = ({onComplete}) => {
  const [params] = useSearchParams()
  const orderId = params.get('order_id')
  const providerPaymentId = params.get('payment_id') || params.get('razorpay_payment_id') || params.get('session_id')
  const [paymentId,setPaymentId] = useState(providerPaymentId || '')
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    if (orderId && providerPaymentId) confirmPayment(providerPaymentId)
  }, [orderId, providerPaymentId])

  const confirmPayment = async (id) => {
    if (!orderId || !id) return
    setLoading(true)
    try {
      await api.put(`/api/wallet/deposit?order_id=${orderId}&payment_id=${encodeURIComponent(id)}`,null,{headers:authHeaders()})
      setMessage('Payment confirmed and wallet credited')
      onComplete?.()
    } catch (error) {
      setMessage(getApiError(error))
    } finally {
      setLoading(false)
    }
  }

  if (!orderId) return <p className="p-5">No payment order was provided.</p>

  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">Confirm wallet payment</h1>
    <p>Payment order: {orderId}</p>
    {!providerPaymentId && <>
      <p className="text-sm text-gray-400">Enter the payment ID returned by your provider.</p>
      <input className="border p-3 w-full" value={paymentId} onChange={event => setPaymentId(event.target.value)} placeholder="Payment ID" />
      <button className="border px-4 py-2" disabled={!paymentId || loading} onClick={() => confirmPayment(paymentId)}>Confirm payment</button>
    </>}
    {message && <p>{message}</p>}
  </div>
}

export default PaymentConfirmation
