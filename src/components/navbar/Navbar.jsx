
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

import { useSelector } from 'react-redux'

function Navbar() {



  return (
    <>
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
       
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          
 
        
          <UserMenu />
        </div>
      </Container>
      

    </div>
  
  </div>
    </>
  )
}

export default Navbar
