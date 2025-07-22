import {  useEffect } from "react";
import Navbar from  '../components/navbar/Navbar'
import Footer from  '../components/navbar/Footer'
import { getDriversAsync } from "../features/driver/driverActions";
import DriverModal from '../components/modals/DriverModal';
import { Toaster } from "react-hot-toast";
import NotFound from "../pages/NotFound";
import HomePage from "../pages/home";;
import ContactForm from "../pages/ContactForm";
import TrackPage from "../pages/Track";
import DriversPage from "../pages/DriversPage";
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import useAuthListener from '../hooks/use-auth-listener'





function Router() {

const { user } = useAuthListener()


const dispatch = useDispatch();
const { drivers } = useSelector((state) => state.drivers)


  return (
    <>
       <BrowserRouter>
           <Toaster />
          <DriverModal />
      

   <div className="pb-30">
      <Routes>
      <Route path='/' element={ <><Navbar/><HomePage /> </>} />
   
      <Route path='/contact' element={ <><Navbar/><ContactForm /> </>} />
      <Route path='/track' element={ <><Navbar/><DriversPage /> </>}  />
      <Route path="*" element={<NotFound />} />

      </Routes>
        
         
          </div>
           <Footer/>
        </BrowserRouter>
        </>

  )
}

export default Router
