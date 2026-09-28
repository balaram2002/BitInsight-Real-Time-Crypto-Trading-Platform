import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { authHeaders, getApiError } from '@/config/api'

const AssetDetails = () => {
  const { id } = useParams()
  const [asset,setAsset] = useState(null)
  const [message,setMessage] = useState('')

  useEffect(() => {
    api.get(`/api/asset/${id}`, {headers:authHeaders()})
      .then(({data}) => setAsset(data))
      .catch(error => setMessage(getApiError(error)))
  }, [id])

  if (message) return <p className="p-5 text-red-500">{message}</p>
  if (!asset) return <p className="p-5">Loading asset...</p>

  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">{asset.coin?.name} holding</h1>
    <div className="border p-5 space-y-3">
      <p>Symbol: {asset.coin?.symbol}</p>
      <p>Quantity: {asset.quantity}</p>
      <p>Buy price: {asset.buyPrice}</p>
      <p>Current price: {asset.coin?.current_price}</p>
      <p>Current value: {(asset.quantity || 0) * (asset.coin?.current_price || 0)}</p>
    </div>
  </div>
}

export default AssetDetails
