import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import api, { authHeaders, getApiError } from '@/config/api'

const PaymentDetailsForm = () => {
    const form=useForm({
        resolver:"",
        defaultValues:{
            accountHolderName:"",
            ifsc:"",
            bankName:""
        }
    })
    const [message,setMessage]=React.useState('')
    const onSubmit=async(data)=>{
        try {
          await api.post('/api/payment-details',data,{headers:authHeaders()})
          setMessage('Payment details saved')
        } catch (error) {
          setMessage(getApiError(error))
        }
    }
  return (
    <div className='px-10 py-2'>

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}
 className='space-y-6'>

  <FormField
  control={form.control}
  name="accountHolderName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Account Holder Name</FormLabel>
      <FormControl>
        <Input 
        //name="accountHolderName"
        className="border w-full border-gray-700 p5"
        placeholder="Bg Treading" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="ifsc"
  render={({ field }) => (
    <FormItem>
      <FormLabel>IFSC Code</FormLabel>
      <FormControl>
        <Input
        //name="ifsc" 
        className="border w-full border-gray-700 p5"
        placeholder="ifsc code" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="accountNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Account Number</FormLabel>
      <FormControl>
        <Input
        className="border w-full border-gray-700 p5"
        placeholder="***********5605" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="confirmAccountNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm Account Number</FormLabel>
      <FormControl>
        <Input
        className="border w-full border-gray-700 p5"
        placeholder="confirm account number" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="bankName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bank Name</FormLabel>
      <FormControl>
        <Input
        className="border w-full border-gray-700 p5"
        placeholder="yes bank" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
{message && <p className='text-sm text-center'>{message}</p>}
<DialogClose className='w-full'>
<Button type="submit" className="w-full py-5">
    Submit
</Button>
</DialogClose>


 </form>


</Form>
    </div>
  )
}

export default PaymentDetailsForm