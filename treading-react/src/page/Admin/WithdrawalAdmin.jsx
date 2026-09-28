import { useEffect, useState } from 'react'
import api, { authHeaders, getApiError } from '@/config/api'

const WithdrawalAdmin = () => {
  const [withdrawals,setWithdrawals]=useState([])
  const [message,setMessage]=useState('')
  const load=async()=>{
    try {
      const {data}=await api.get('/api/admin/withdrawal',{headers:authHeaders()})
      setWithdrawals(data)
    } catch (error) {
      setMessage(getApiError(error))
    }
  }
  useEffect(()=>{ load() },[])
  const processWithdrawal=async(id,accept)=>{
    try {
      await api.patch(`/api/admin/withdrawal/${id}/proceed/${accept}`,null,{headers:authHeaders()})
      await load()
    } catch (error) {
      setMessage(getApiError(error))
    }
  }
  return <div className="p-5 lg:px-20 space-y-5">
    <h1 className="font-bold text-3xl">Withdrawal Requests</h1>
    {message && <p className="text-red-500">{message}</p>}
    <div className="space-y-3">
      {withdrawals.map(item=><div key={item.id} className="border p-4 flex justify-between items-center">
        <span>{item.amount} | {item.status}</span>
        <div className="space-x-2">
          <button className="border px-3 py-1" onClick={()=>processWithdrawal(item.id,true)}>Approve</button>
          <button className="border px-3 py-1" onClick={()=>processWithdrawal(item.id,false)}>Reject</button>
        </div>
      </div>)}
    </div>
  </div>
}

export default WithdrawalAdmin