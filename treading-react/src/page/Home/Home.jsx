import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import StockChart from './StockChart';
import AssetTable from './AssetTable';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons';
import { MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '@/State/Store';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const Home = () => {
  const [category, setCategory] = React.useState("all");
  const[inputValue,setInputValue]=React.useState("");
  const [isBotRealease,setIsBotRealease]=React.useState(false);
  const{coin}=useSelector(store=>store);
  const dispatch=useDispatch();

  const handleBotRealease=()=>setIsBotRealease(!isBotRealease);

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleChange=(e)=>{
    setInputValue(e.target.value);
  }
  const handleKeyPress=(event)=>{
    if(event.key=="Enter"){
      console.log(inputValue)
    }
    setInputValue("")
  };

  useEffect(()=>{
    if(category==="top50" && coin.top50?.length===0){
      dispatch(getTop50CoinList())
    }
  },[category,dispatch,coin.top50])


  useEffect(()=>{

    dispatch(getCoinList(1))
  },[])

  return (
    <div className='relative'>
      <div className='lg:flex'>
        {/* Left Side - Buttons & Table */}
        <div className='lg:w-[50%] lg:border-r'>
          <div className='p-3 flex items-center gap-4 flex-wrap'>
            <Button
              onClick={() => handleCategory("all")}
              variant={category === "all" ? "default" : "outline"}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              onClick={() => handleCategory("top50")}
              variant={category === "top50" ? "default" : "outline"}
              className="rounded-full"
            >
              Top 50
            </Button>
            <Button
              onClick={() => handleCategory("topGainers")}
              variant={category === "topGainers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Gainers
            </Button>
            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category === "topLosers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          <AssetTable coin={category=="all"?coin.coinList:coin.top50} category={category}/>
          <div>
            <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
          </div>
        </div>

        {/* Right Side - Chart & Info */}
        <div className='lg:w-[50%] p-4'>
          <StockChart coinId={"bitcoin"}/>
          <div className="flex gap-5 items-center mt-5">
            <Avatar>
              <AvatarImage
                className="w-12 h-12"
                src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
              />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p>ETH</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Ethereum</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">5464</p>
                <p className="text-red-600">
                  <span>-1319049822.578 </span>
                  <span>(-0.29803%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Chat Bot Section */}
      <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        
       {isBotRealease && <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
          <div className="flex justify-between items-center border-b px-6 h-[12%]">
            <p>Chat Bot</p>
            <Button onClick={handleBotRealease} variant="ghost" size="icon">
              <Cross1Icon />
            </Button>
          </div>

          <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
            <div className="self-start pb-5 w-auto">
              <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                <p>hi, Raam Arora</p>
                <p>you can ask crypto related any question</p>
                <p>like, price, market cap etc....</p>
              </div>
            </div>

           {
            [1,1,1,1].map((item,i)=><div key={i}
            className={`${i % 2 === 0 ? "self-start" : "self-end"} pb-5 w-auto`}
            >
              {i%2==0?<div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                <p>prompt who are you</p>
              </div>: <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                <p>ans hi, Raam Arora</p>
              </div>}
            </div>
            )}
           
          </div>

          <div className="h-[12%] border-t">
<Input
className="w-full h-full order-none outline-none"
placeholder="write prompt"
onChange={handleChange}
value={inputValue}
onKeyPress={handleKeyPress}
/>
          </div>
        </div>}

      <div className="relative w-[10rem] cursor-pointer group">
    <Button
    onClick={handleBotRealease}
    className="w-full h-[3rem] gap-2 items-center">
      <MessageCircle 
        size={30}
        className="fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]"
      />
      <span className="text-2xl">Chat Bot</span>
    </Button>
  </div>
      </section>
    </div>
  );
};
