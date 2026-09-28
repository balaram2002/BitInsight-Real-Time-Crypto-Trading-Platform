import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import api, { authHeaders } from '@/config/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Activity = () => {
  const [orders,setOrders]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{ api.get('/api/orders',{headers:authHeaders()}).then(({data})=>setOrders(data)).catch(()=>setOrders([])) },[])
  return (
    <div className="p-5 lg:px-20">
    <h1 className="font-bold text-3xl pb-5">Activity</h1>
    <Table className="border">
  <TableHeader>
    <TableRow>
      <TableHead className="py-5">Date & Time</TableHead>
      <TableHead>Treading pair</TableHead>
      <TableHead>Buy Price</TableHead>
      <TableHead>Sell Price</TableHead>
      <TableHead>Order Type</TableHead>
      <TableHead className="">Profite/Loss</TableHead>
      <TableHead className="text-right">Value</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.map((item)=><TableRow key={item.id} onClick={()=>navigate(`/activity/order/${item.id}`)} className="cursor-pointer">
       <TableCell>
        <p>{item.timestamp}</p>
       </TableCell>
      <TableCell className="font-medium flex items-center gap-2">
        <Avatar className="-z-50">
          <AvatarImage src={item.orderItem?.coin?.image}/>
        </Avatar>
        <span>{item.orderItem?.coin?.name}</span>
      </TableCell>
    
      <TableCell className="">{item.price}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.orderType}</TableCell>
      <TableCell className="">{item.status}</TableCell>
      <TableCell className="text-right">
        {item.orderItem?.quantity}
      </TableCell>
    </TableRow>)}
  </TableBody>
</Table>
</div>
  )
}

export default Activity