import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import React from 'react'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sidebar } from './Sidebar'
import { useSelector } from 'react-redux'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {auth}=useSelector(store=>store)
  const navigate=useNavigate()
  const [darkMode,setDarkMode]=useState(()=>localStorage.getItem('theme') !== 'light')

  useEffect(()=>{
    document.documentElement.classList.toggle('dark',darkMode)
    localStorage.setItem('theme',darkMode ? 'dark' : 'light')
  },[darkMode])

  const userName=auth.user?.fullName || auth.user?.email || 'Trader'
  return (
    <div className='px-4 lg:px-8 py-3 border-b border-border/70 z-50 bg-background/80 backdrop-blur-xl sticky
     top-0 left-0 right-0 flex justify-between items-center'> 
     <div className='flex items-center gap-3'>
     <Sheet>
  <SheetTrigger>
    <Button variant="ghost" 
    size="icon"
     className="rounded-full h-11 w-11">
   <DragHandleHorizontalIcon className="h-7 w-7"/>

    </Button>
  </SheetTrigger>
  <SheetContent className="w-72 border-r-0 flex flex-col justify-center" side="left">
    <SheetHeader>
      <SheetTitle>
        <div className="text-3xl flex justify-center items-center gap-1">
     <Avatar>
<AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png"/>
      </Avatar>
      <div>
        <span className="font-bold text-orange-700">Bg</span>
        <span>Treading</span>
      </div>
      </div>
      </SheetTitle>
    </SheetHeader>
    <Sidebar/>
  </SheetContent>
</Sheet>
<p className="text-sm lg:text-base cursor-pointer tracking-wide font-semibold" onClick={()=>navigate('/')}>
  BG <span className="text-accent">TRADING</span>
</p>
<div className="p-0 ml-3 lg:ml-9">
<Button variant="outline"
className="flex items-center gap-3 border-border/70">
    <MagnifyingGlassIcon/>
  <span className="hidden sm:inline">Search</span>
</Button>
</div>
     </div>

     <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={()=>setDarkMode(value=>!value)}
          className="rounded-full text-accent hover:bg-accent/10"
        >
          {darkMode ? <Sun /> : <Moon />}
        </Button>
        <Avatar>
            <AvatarFallback>
                {userName[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
     </div>
    </div>
  )
}

export default Navbar