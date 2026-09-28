import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { CopyIcon, DollarSign, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react"
import TopupForm from "./TopupForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import api, { authHeaders, getApiError } from "@/config/api";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaymentConfirmation from "./PaymentConfirmation";

const Wallet = () => {
  const [wallet,setWallet]=useState(null)
  const [error,setError]=useState("")
  const [searchParams]=useSearchParams()
  const loadWallet=useCallback(async()=>{
    try {
      setError("")
      const {data}=await api.get("/api/wallet",{headers:authHeaders()})
      setWallet(data)
    } catch (requestError) {
      setError(getApiError(requestError))
    }
  },[])

  useEffect(()=>{ loadWallet() },[loadWallet])

  if (searchParams.get("order_id")) {
    return <PaymentConfirmation onComplete={loadWallet}/>
  }

  return (
    <div className="flex flex-col items-center">
<div className="pt-10 w-full lg:w-[60%]">
<Card>
  <CardHeader className="pb-9">
<div className="flex justify-between items-center">
  <div className="flex items-center gap-5">
    <WalletIcon size={30}/>
    <div>
      <CardTitle className="text-2xl">My Wallet</CardTitle>
      <div className="flex items-center gap-2">
<p className="text-gray-200 text-sm">
  #A475Ed
</p>
<CopyIcon size={12}
className="cursor-pointer hover:text-slate-300"/>
      </div>
    </div>
  </div>
  <div>
    <ReloadIcon onClick={loadWallet} className="w-6 h-6 cursor-pointer 
    hover:text-gray-400"/>
  </div>
</div>
</CardHeader>
<CardContent>
  <div className="flex items-center">
<DollarSign/>
<span className="text-2xl font-semibold">
  {wallet?.balance ?? "-"}
</span>
  </div>
  <div className="flex gap-7 mt-5">
<Dialog>
  <DialogTrigger>
    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
    flex flex-col items-center justify-center rounded-md
    shadow-slate-800 shadow-md">
      <UploadIcon/>
      <span className="text-sm mt-2">Add Money</span>

    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Top Up Your Wallet 
      </DialogTitle>
    </DialogHeader>
    <TopupForm onComplete={loadWallet}/>
  </DialogContent>
</Dialog>

<Dialog>
  <DialogTrigger>
    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
    flex flex-col items-center justify-center rounded-md
    shadow-slate-800 shadow-md">
      <UploadIcon/>
      <span className="text-sm mt-2">Withdrawal</span>

    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Request Withdrawal
      </DialogTitle>
    </DialogHeader>
    <WithdrawalForm onComplete={loadWallet}/>
  </DialogContent>
</Dialog>
<Dialog>
  <DialogTrigger>
    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer
    flex flex-col items-center justify-center rounded-md
    shadow-slate-800 shadow-md">
      <ShuffleIcon/>
      <span className="text-sm mt-2">Transfer</span>

    </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-center text-xl"> 
        Transfer to other wallet 
      </DialogTitle>
    </DialogHeader>
    <TransferForm onComplete={loadWallet}/>
  </DialogContent>
</Dialog>

  </div>
</CardContent>
</Card>
<div className="py-5 pt-10">
  <div className="flex gap-2 items-center pb-5 ">
<h1 className="text-2xl font-semibold">History</h1>
<UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400"/>
  </div>
  {error && <p className="text-red-500 pb-4">{error}</p>}
  <div className="space-y-5">
{(wallet?.transactions || []).map((item,i)=><div key={item.id || i}>
  <Card className="px-5 flex justify-between items-center p-2">
<div className="flex items-center gap-5">
  <Avatar>
<AvatarFallback>
<ShuffleIcon className=""/>

</AvatarFallback>
  </Avatar>
  <div className="space-y-1">
<h1>{item.type || "Wallet transaction"}</h1>
<p className="text-sm text-gray-500">{item.date || ""}</p>
  </div>

</div>
<div>
  <p className={`text-green-500`}>{item.amount ?? ""} USD</p>
</div>

  </Card>
  </div>)}

  </div>
</div>


</div>
</div>
  )
}
export default Wallet;
