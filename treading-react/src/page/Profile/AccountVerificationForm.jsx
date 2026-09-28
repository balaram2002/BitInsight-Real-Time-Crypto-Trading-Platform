import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useState } from 'react'
import api, { authHeaders, getApiError } from '@/config/api'

const AccountVerificationForm = () => {
    const [value,setValue]=useState("");
  const [sent,setSent]=useState(false)
  const [message,setMessage]=useState('')
const handleSend=async()=>{
  try { await api.post('/api/users/verification/EMAIL/send-otp',null,{headers:authHeaders()}); setSent(true); setMessage('OTP sent') }
  catch(error){ setMessage(getApiError(error)) }
}
const handleSubmit=async()=>{
  try { await api.patch(`/api/users/enable-two-factor/verify-otp/${value}`,null,{headers:authHeaders()}); setMessage('Two-factor authentication enabled') }
  catch(error){ setMessage(getApiError(error)) }
}

  return (
    <div className='flex justify-center'>
    <div className='space-y-5 mt-10 w-full'>
<div className='flex justify-between items-center'>
<p>Email :</p>
<p>balaramgochhayat2002@gmail.com</p>
<Dialog>
  <DialogTrigger asChild>
    <Button onClick={handleSend}>Send OTP</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enter OTP</DialogTitle>
    </DialogHeader>
    <div className='py-5 flex gap-10 justify-center items-center'>
<InputOTP 
  value={value}
  onChange={(newValue) => setValue(newValue)}
  maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator/>
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
<DialogClose disabled={!sent}>
    <Button
    onClick={handleSubmit}
    className={"w-[10rem]"}>Submit</Button>
</DialogClose>
  {message && <p className='text-sm'>{message}</p>}
    </div>
  </DialogContent>
</Dialog>
    </div>
    </div>
    </div>
  )
}

export default AccountVerificationForm