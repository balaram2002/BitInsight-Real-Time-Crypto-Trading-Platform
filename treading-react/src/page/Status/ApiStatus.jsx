import { useEffect, useState } from 'react'
import api, { getApiError } from '@/config/api'

const ApiStatus = () => {
  const [status,setStatus] = useState({home:'Loading...',secure:'Loading...'})
  useEffect(() => {
    Promise.allSettled([api.get('/'),api.get('/api')]).then(([home,secure]) => setStatus({
      home: home.status === 'fulfilled' ? home.value.data : getApiError(home.reason),
      secure: secure.status === 'fulfilled' ? secure.value.data : getApiError(secure.reason)
    }))
  }, [])
  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">API status</h1>
    <p>Public: {status.home}</p>
    <p>Secure: {status.secure}</p>
  </div>
}

export default ApiStatus
