import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { authHeaders, getApiError } from '@/config/api'

const WatchlistDetails = () => {
  const { id } = useParams()
  const [watchlist,setWatchlist] = useState(null)
  const [message,setMessage] = useState('')

  useEffect(() => {
    api.get(`/api/watchlist/${id}`, {headers:authHeaders()})
      .then(({data}) => setWatchlist(data))
      .catch(error => setMessage(getApiError(error)))
  }, [id])

  if (message) return <p className="p-5 text-red-500">{message}</p>
  if (!watchlist) return <p className="p-5">Loading watchlist...</p>

  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">Watchlist #{watchlist.id}</h1>
    <div className="space-y-3">
      {(watchlist.coins || []).map(coin => <div key={coin.id} className="border p-4">
        {coin.name} ({coin.symbol})
      </div>)}
    </div>
  </div>
}

export default WatchlistDetails
