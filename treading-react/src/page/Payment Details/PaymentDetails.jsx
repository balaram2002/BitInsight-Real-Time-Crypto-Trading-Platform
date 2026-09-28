import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentDetailsForm from "./PaymentDetailsForm"
import api, { authHeaders } from "@/config/api"
import { useEffect, useState } from "react"

const PaymentDetails = () => {
  const [details,setDetails]=useState(null)
  useEffect(()=>{
    api.get('/api/payment-details',{headers:authHeaders()}).then(({data})=>setDetails(data)).catch(()=>setDetails(null))
  },[])
  return (
    <div className="px-20">
<h1 className="text-3xl font-bold py-10">Payment Details</h1>
 {details? <Card>
  <CardHeader>
    <CardTitle>
      Yes Bank
    </CardTitle>
    <CardDescription>
      A/C No :
      {details.accountNumber}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center">
      <p className="w-32">A/C Holder</p>
      <p className="text-gray-400"> : {details.accountHolderName} </p>
    </div>
    <div className="flex items-center">
      <p className="w-32">IFSC</p>
      <p className="text-gray-400">  : {details.ifsc} </p>

    </div>
  </CardContent>
</Card>: <Dialog>
  <DialogTrigger>
    <Button className="py-6">Add payment details</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Payment Details</DialogTitle>
      
    </DialogHeader>
    <PaymentDetailsForm/>
  </DialogContent>
</Dialog>
} 
</div>
  );
};

export default PaymentDetails