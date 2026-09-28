import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DotFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import api, { authHeaders, getApiError } from '@/config/api'

const TopupForm = ({onComplete}) => {
  const [amount,setAmount]=React.useState('')
  const[paymentMethod,setPaymentMethod]=React.useState("RAZORPAY")
  const handlePaymentMethodChange=(value)=>{
    setPaymentMethod(value)
  }
  const handleChange=(e)=>{
    setAmount(e.target.value)
  }
  const [message,setMessage]=React.useState("")
  const handleSubmit =async () =>{
    try {
      const {data}=await api.post(`/api/payment/${paymentMethod}/amount/${amount}`,null,{headers:authHeaders()})
      setMessage("Payment page opened")
      onComplete?.()
      if(data.payment_url) window.location.assign(data.payment_url)
    } catch (error) {
      setMessage(getApiError(error))
    }
  };
  return (
    <div className='pt-10 space-y-5'>
      <div>   
<h1 className='pb-1'>Enter Amount</h1>
<Input 
onChange={handleChange}
value={amount}
className="py-7 text-lg"
placeholder="$9999"
/>
</div>
<div>
  <h1 className='pb-1'> Select payment method</h1>
  <RadioGroup 
  onValueChange={(value)=>handlePaymentMethodChange(value)}
  className="flex" 
  defaultValue="RAZORPAY">
<div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
<RadioGroupItem
 icon={DotFilledIcon}
 className="h-9 w-9"
 value="RAZORPAY"
 id="r1"
 />
 <Label htmlFor="r1">
<div className='bg-white rounded-md px-5 py-2 w-32 h-12 flex items-center justify-center'>
<img className="max-h-8 max-w-full" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay"/>
</div>
 </Label>

</div>

<div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
<RadioGroupItem
 icon={DotFilledIcon}
 className="h-9 w-9"
 value="STRIPE"
 id="r2"
 />
 <Label htmlFor="r2">
<div className='bg-white rounded-md px-5 w-32 h-12 flex items-center justify-center'>
<img
className='max-h-8 max-w-full'
src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Stripe_Logo%2C_revised_2016.svg" alt="Stripe"/>
</div>
 </Label>

</div>

  </RadioGroup>
</div>
{message && <p className="text-sm text-center">{message}</p>}
<Button onClick={handleSubmit} disabled={!amount} className="w-full py-7">
  Submit
</Button>
</div>
  )
}

export default TopupForm