import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api, { authHeaders } from '@/config/api'
import { useEffect, useState } from 'react'

const Withdrawal = () => {
  const [withdrawals,setWithdrawals]=useState([])
  useEffect(()=>{ api.get('/api/withdrawal',{headers:authHeaders()}).then(({data})=>setWithdrawals(data)).catch(()=>setWithdrawals([])) },[])
  return (
    <div>
        <div className="p-5 lg:px-20">
    <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
    <Table className="border">
  <TableHeader>
    <TableRow>
      <TableHead className="py-5">Date</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {withdrawals.map((item)=><TableRow key={item.id}>
       <TableCell>
        <p>{item.date}</p>
       </TableCell>
      <TableCell className="">Bank</TableCell>
      <TableCell className="">{item.amount}</TableCell>
      <TableCell className="text-right">
        {item.status}
      </TableCell>
    </TableRow>)}
  </TableBody>
</Table>
</div>
    </div>
  )
}

export default Withdrawal