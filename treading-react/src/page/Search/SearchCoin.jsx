import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchCoin } from '@/State/Coin/Action'
import { Input } from '@/components/ui/input'

const SearchCoin = () => {
  const [keyword,setKeyword]=useState('')
  const dispatch=useDispatch()
  const {coin}=useSelector(store=>store)
  const handleSearch=(event)=>{
    const value=event.target.value
    setKeyword(value)
    if(value.trim()) dispatch(searchCoin({keyword:value}))
  }
  return (
    <div className="p-5 lg:px-20 space-y-5">
      <Input value={keyword} onChange={handleSearch} placeholder="Search coins" />
      <div className="space-y-2">
        {(coin.searchCoinList || []).map(item=><div key={item.id} className="border p-3">{item.name} ({item.symbol})</div>)}
      </div>
    </div>
  )
}

export default SearchCoin