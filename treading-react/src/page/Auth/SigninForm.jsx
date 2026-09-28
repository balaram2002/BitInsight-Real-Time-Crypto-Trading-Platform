
import { login, verifyLoginOtp } from '@/State/Auth/Action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SigninForm = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [session,setSession]=useState(null)
    const [otp,setOtp]=useState('')
    const form=useForm({
        resolver:"",
        defaultValues:{
            email:"",
            password:"",
        }
    })
    const onSubmit=async(data)=>{
      const response=await dispatch(login({data,navigate}))
      if(response?.twoFactorAuthEnabled) setSession(response.session)
    }
    const submitOtp=()=>{
      dispatch(verifyLoginOtp({otp,id:session,navigate}))
    }
  return (
    <div >
<h1 className='text-xl font-bold text-center pb-3'>Login</h1>
{session ? <div className="space-y-5">
  <Input value={otp} onChange={(event)=>setOtp(event.target.value)} placeholder="Enter OTP" />
  <Button onClick={submitOtp} className="w-full py-5">Verify OTP</Button>
</div> : <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}
 className='space-y-6'>


<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      
      <FormControl>
        <Input
        className="border w-full border-gray-700 p5"
        placeholder="balaram@gmail.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Input
        className="border w-full border-gray-700 p5"
        placeholder="your password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<Button type="submit" className="w-full py-5">
    Submit
</Button>
 </form>
</Form>}
    </div>
  )
}

export default SigninForm;