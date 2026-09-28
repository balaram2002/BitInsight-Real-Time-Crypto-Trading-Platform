import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { getApiError } from '@/config/api'

const Trending = () => {
  const [coins,setCoins] = useState([])
  const [message,setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/coins/treading')
      .then(({data}) => setCoins(data.coins || data))
      .catch(error => setMessage(getApiError(error)))
  }, [])

  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">Trending coins</h1>
    {message && <p className="text-red-500">{message}</p>}
    <div className="grid gap-3 md:grid-cols-2">
      {coins.map(coin => <button key={coin.id} onClick={() => navigate(`/market/${coin.id}`)} className="border p-4 text-left">
        <span className="font-semibold">{coin.name || coin.item?.name}</span>
        <span className="block text-sm text-gray-400">{coin.symbol || coin.item?.symbol}</span>
      </button>)}
    </div>
  </div>
}

export default Trending
