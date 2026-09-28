import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import api, { authHeaders, getApiError } from '@/config/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Watchlist = () => {
  const [watchlist,setWatchlist]=useState({coins:[]})
  const [error,setError]=useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    api.get('/api/watchlist/user',{headers:authHeaders()}).then(({data})=>setWatchlist(data)).catch(error=>setError(getApiError(error)))
  },[])
  return (
    <div className="p-5 lg:px-20">
    <div className="flex items-center justify-between pb-5">
      <h1 className="font-bold text-3xl">Watchlist</h1>
      {watchlist.id && <button className="border px-3 py-2" onClick={()=>navigate(`/watchlist/${watchlist.id}`)}>Open details</button>}
    </div>
    <Table className="border">
  <TableHeader>
    <TableRow>
      <TableHead className="py-5">COIN</TableHead>
      <TableHead>SYMBOL</TableHead>
      <TableHead>VOLUME</TableHead>
      <TableHead>MARKET CAP</TableHead>
      <TableHead>24h</TableHead>
      <TableHead className="">PRICE</TableHead>
      <TableHead className="text-right text-red-600">REMOVE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {(watchlist.coins || []).map((item)=><TableRow key={item.id}>
      <TableCell className="font-medium flex items-center gap-2">
        <Avatar className="-z-50">
          <AvatarImage src={item.image}/>
        </Avatar>
        <span>{item.name}</span>
      </TableCell>
      <TableCell>{item.symbol}</TableCell>
      <TableCell>{item.total_volume}</TableCell>
      <TableCell>{item.market_cap}</TableCell>
      <TableCell>{item.price_change_percentage_24h}</TableCell>
      <TableCell className="">{item.current_price}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" disabled size="icon" className="h-10 w-10">
          <BookmarkFilledIcon className="w-6 h-6"/>
        </Button>
      </TableCell>
    </TableRow>)}
  </TableBody>
</Table>
{error && <p className="text-red-500 mt-4">{error}</p>}
</div>
  )
}

export default Watchlist