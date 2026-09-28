
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useForm } from 'react-hook-form'
import api, { getApiError } from '@/config/api'
import { useState } from 'react'

const ForgotPasswordForm = () => {
  const [session,setSession]=useState('')
  const [message,setMessage]=useState('')
    const form=useForm({
        resolver:"",
        defaultValues:{
            email:"", otp:"", password:"",
        }
    })
    const onSubmit=async(data)=>{
      try {
        if(!session){
          const {data:response}=await api.post('/auth/users/reset-password/send-otp',{sendTo:data.email,verificationType:'EMAIL'})
          setSession(response.session); setMessage('OTP sent')
        } else {
          await api.patch(`/auth/users/reset-password/verify-otp?id=${session}`,{otp:data.otp,password:data.password},{headers:{Authorization:`Bearer ${localStorage.getItem('jwt')}`}})
          setMessage('Password updated')
        }
      } catch(error){ setMessage(getApiError(error)) }
    }
  return (
    <div >
<h1 className='text-xl font-bold text-center pb-3'>Forgot password</h1>
<Form {...form}>
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
        placeholder="enter your email.." {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{session && <>
<FormField control={form.control} name="otp" render={({field})=><FormItem><FormControl><Input placeholder="OTP" {...field}/></FormControl></FormItem>}/>
<FormField control={form.control} name="password" render={({field})=><FormItem><FormControl><Input type="password" placeholder="New password" {...field}/></FormControl></FormItem>}/>
</>}
{message && <p className="text-sm text-center">{message}</p>}
<Button type="submit" className="w-full py-5">
  {session ? 'Update password' : 'Send OTP'}
</Button>
 </form>
</Form>
    </div>
  )
}

export default ForgotPasswordForm;