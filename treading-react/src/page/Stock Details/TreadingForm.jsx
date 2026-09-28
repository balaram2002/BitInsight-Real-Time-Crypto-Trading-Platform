import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DotIcon } from "lucide-react"
import { useState } from "react"
import api, { authHeaders, getApiError } from "@/config/api"
import { useParams } from "react-router-dom"

const TreadingForm = () => {
    const [orderType,setOrderType]=useState("BUY")
  const [quantity,setQuantity]=useState("")
  const [message,setMessage]=useState("")
  const {id}=useParams()
  const handleSubmit=async()=>{
    try {
      await api.post("/api/orders/pay",{coinId:id,quantity:Number(quantity),orderType},{headers:authHeaders()})
      setMessage(`${orderType} order placed`)
    } catch (error) {
      setMessage(getApiError(error))
    }
  }
  return (
    <div className="space-y-10 p-5">
<div>
<div className="flex gap-4 items-center justify-between">
<Input
className="py-7 focus:outline-none"
placeholder="Enter Amount..."
onChange={(event)=>setQuantity(event.target.value)}
type="number"
name="amount"
/>
<div>
    <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
        4563
    </p>
</div>
</div>
{message && <h1 className="text-center pt-4">{message}</h1>}
</div>
<div className="flex gap-5 items-center">


<div>
<Avatar>
<AvatarImage
  src={"https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
}/>
</Avatar>
</div>
<div>
  <div className="flex items-center gap-2">
  <p>BTC</p>
  <DotIcon className="text-gray-400"/>
  <p className="text-gray-400">Bitcoin</p>
  </div>
  <div className="flex items-end gap-2">
  <p className="text-xl font-bold">$6554</p>
<p className="text-red-600">
<span>-1319049822</span>
<span>(-0.29803%)</span>
</p>
  </div>
</div>
</div>
<div className="flex items-center justify-between">
<p>Order Type</p>
<p> Market Order</p>
</div>
<div className="flex items-center justify-between">
<p>{orderType=="BUY"?"Available Cash":"Available Quantity"}</p>
<p>
{orderType=="BUY"?"9000":"23.08"}
</p>
</div>
<div>
    <Button onClick={handleSubmit} disabled={!quantity} className={`w-full py-6
${orderType=="SELL"?"bg-red-600 text-white":""}`}>
        {orderType} 
    </Button>
    <Button
    variant="link"
    className="w-full mt-5 text-xl"
     onClick={()=>setOrderType(orderType=="BUY"?"SELL":"BUY")}>
        {orderType=="BUY"?"Or Sell":"Or Buy"}
    </Button>
</div>
</div>
  )
}

export default TreadingForm