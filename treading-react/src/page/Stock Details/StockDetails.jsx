import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons"
import { BookmarkIcon } from "lucide-react"
import TreadingForm from "./TreadingForm"
import StockChart from "../Home/StockChart"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCoinDetails } from "@/State/Coin/Action"
import api, { authHeaders, getApiError } from "@/config/api"
import { useState } from "react"
// import { useSelector, useDispatch } from 'react-redux';


const StockDetails = () => {

  const {coin}=useSelector(store=>store)
  const dispatch=useDispatch()
  const {id}=useParams()
  const [watchlistMessage,setWatchlistMessage]=useState('')
  const [holding,setHolding]=useState(null)
  useEffect(()=>{

    dispatch(fetchCoinDetails({coinId:id,jwt:localStorage.getItem("jwt")}))
    api.get(`/api/asset/coin/${id}/user`,{headers:authHeaders()})
      .then(({data})=>setHolding(data))
      .catch(()=>setHolding(null))

  },[id,dispatch])
  const addToWatchlist=async()=>{
    try { await api.patch(`/api/watchlist/add/coin/${id}`,null,{headers:authHeaders()}); setWatchlistMessage('Added to watchlist') }
    catch(error){ setWatchlistMessage(getApiError(error)) }
  }

  return (
    <div className="p-5 mt-5">
    <div className="flex justify-between">
    <div className="flex gap-5 items-center">


    <div>
    <Avatar>
    <AvatarImage
      src={coin.coinDetails?.image.large}/>
    </Avatar>
    </div>
    <div>
      <div className="flex items-center gap-2">
      <p>{coin.coinDetails?.symbol.toUpperCase()}</p>
      <DotIcon className="text-gray-400"/>
      <p className="text-gray-400">{coin.coinDetails?.name}</p>
      </div>
      {holding && <p className="text-sm text-gray-400">Your holding: {holding.quantity}</p>}
      <div className="flex items-end gap-2">
      <p className="text-xl font-bold">${coin.coinDetails?.market_data.current_price.usd}</p>
<p className="text-red-600">
<span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
<span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
</p>
      </div>
    </div>
    </div>
    <div className="flex items-center gap-4">
      <Button onClick={addToWatchlist}>
      {watchlistMessage ?  <BookmarkFilledIcon className="h-6 w-6"/>:
        <BookmarkIcon className="h-6 w-6"/>}
      </Button>
      {watchlistMessage && <span className="text-sm">{watchlistMessage}</span>}
      <Dialog>
  <DialogTrigger>
    <Button size="lg">Tread</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>How Much Do you want to spend ?</DialogTitle>
    </DialogHeader>
    <TreadingForm/>
  </DialogContent>
</Dialog>
    </div>
    </div>
    <div className="mt-14">
    <StockChart coinId={id}/>
    </div>
    </div>
    
  )
}

export default StockDetails
