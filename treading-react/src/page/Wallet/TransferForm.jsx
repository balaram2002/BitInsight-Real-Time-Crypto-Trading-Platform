import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React from 'react'
import api, { authHeaders, getApiError } from '@/config/api'

const TransferForm = ({onComplete}) => {
const [formData,setFormData] = React.useState({
  amount:'',
  walletId:'',
  purpose:'',
})

const handleChange = (e) =>{
setFormData({...formData,[e.target.name]: e.target.value})
}

const [message,setMessage]=React.useState('')
const handleSubmit = async () =>{
  try {
    await api.put(`/api/wallet/${formData.walletId}/transfer`,{
      amount:Number(formData.amount),
      purpose:formData.purpose
    },{headers:authHeaders()})
    setMessage('Transfer completed')
    onComplete?.()
  } catch (error) {
    setMessage(getApiError(error))
  }
}

  return (
<div className="pt-10 space-y-5">
<div>
  <h1 className='pb-1'>Enter Amount</h1>
  <Input
  name="amount"
  onChange={handleChange}
  value ={formData.amount}
  className ="py-7"
  placeholder="$9999"
  />
</div>

<div>
  <h1 className='pb-1'>Wallet Id</h1>
  <Input
  name="walletId"
  onChange={handleChange}
  value ={formData.walletId}
  className ="py-7"
  placeholder="$ADER455"

  />
</div>

<div>
  <h1 className='pb-1'>Purpose</h1>
  <Input
  name="purpose"
  onChange={handleChange}
  value ={formData.purpose}
  className ="py-7"
  placeholder="gift for your friend ..."

  />
</div>
{message && <p className='text-sm text-center'>{message}</p>}
<DialogClose className='w-full'>
<Button onClick = {handleSubmit}
className="w-full py-7">
  Submit
</Button>
</DialogClose>
    </div>
  )
}

export default TransferForm