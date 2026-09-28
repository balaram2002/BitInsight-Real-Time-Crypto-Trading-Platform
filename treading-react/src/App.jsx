
import { Route, Routes } from 'react-router-dom'
import { Button } from './components/ui/button'
import { Home } from './page/Home/Home'
import Navbar from './page/Navbar/Navbar'
import Portfolio from './page/Portfolio/Portfolio'
import Activity from './page/Activity/Activity'
import Wallet from './page/Wallet/Wallet'
import Withdrawal from './page/Withdrawal/Withdrawal'
import PaymentDetails from './page/Payment Details/PaymentDetails'
import StockDetails from './page/Stock Details/StockDetails'
import Watchlist from './page/Watchlist/Watchlist'
import Profile from './page/Profile/Profile'
import SearchCoin from './page/Search/SearchCoin'
import Notfound from './page/Notfound/Notfound'
import WithdrawalAdmin from './page/Admin/WithdrawalAdmin'
import AssetDetails from './page/Portfolio/AssetDetails'
import OrderDetails from './page/Activity/OrderDetails'
import Trending from './page/Home/Trending'
import WatchlistDetails from './page/Watchlist/WatchlistDetails'
import ApiStatus from './page/Status/ApiStatus'
import Auth from './page/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getUser } from './State/Auth/Action'
import './App.css'
import Landing from './page/Landing/Landing'

function App() {
  const {auth}=useSelector(store=>store);
const dispatch=useDispatch()
  const location = useLocation()
  useEffect(()=>{
    const savedTheme=localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark',savedTheme==='dark')
  },[])
  console.log("auth---", auth)
  
useEffect(()=>{
  dispatch(getUser(auth.jwt || localStorage.getItem("jwt")))
},[auth.jwt,dispatch])

  return (
    <>
  
    {auth.user? <div>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/portfolio" element={<Portfolio/>}/>
    <Route path="/portfolio/asset/:id" element={<AssetDetails/>}/>
    <Route path="/activity" element={<Activity/>}/>
    <Route path="/activity/order/:id" element={<OrderDetails/>}/>
    <Route path="/wallet" element={<Wallet/>}/>
    <Route path="/withdrawal" element={<Withdrawal/>}/>
    <Route path="/payment-details" element={<PaymentDetails/>}/>
    <Route path="/market/:id" element={<StockDetails/>}/>
    <Route path="/watchlist" element={<Watchlist/>}/>
    <Route path="/watchlist/:id" element={<WatchlistDetails/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/admin/withdrawals" element={<WithdrawalAdmin/>}/>
    <Route path="/search" element={<SearchCoin/>}/>
    <Route path="/trending" element={<Trending/>}/>
    <Route path="/api-status" element={<ApiStatus/>}/>
    <Route path="*" element={<Notfound/>}/>

    </Routes>
    </div>: location.pathname === '/' ? <Landing /> : <Auth />
    }
    </>
  )
}

export default App
