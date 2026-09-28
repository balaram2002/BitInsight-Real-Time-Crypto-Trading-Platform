import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import api, { authHeaders } from '@/config/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Portfolio = () => {
  const [assets,setAssets]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{ api.get('/api/asset',{headers:authHeaders()}).then(({data})=>setAssets(data)).catch(()=>setAssets([])) },[])
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="">Asset</TableHead>
      <TableHead>Price</TableHead>
      
      <TableHead>Unit</TableHead>
      <TableHead>Change</TableHead>
      <TableHead >Change%</TableHead>
      <TableHead className="text-right">VOLUME</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {assets.map((item)=><TableRow key={item.id} onClick={()=>navigate(`/portfolio/asset/${item.id}`)} className="cursor-pointer">
      <TableCell className="font-medium flex items-center gap-2">
        <Avatar className="-z-50">
          <AvatarImage src={item.coin?.image}/>
        </Avatar>
        <span>{item.coin?.name}</span>
      </TableCell>
      <TableCell>{item.coin?.symbol}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.coin?.market_cap}</TableCell>
      <TableCell>{item.coin?.price_change_percentage_24h}</TableCell>
      <TableCell className="text-right">{item.coin?.current_price}</TableCell>
    </TableRow>)}
  </TableBody>
</Table>
    </div>
  )
}

export default Portfolio