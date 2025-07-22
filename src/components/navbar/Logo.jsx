import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { BiSolidChevronDown } from 'react-icons/bi';

function Logo() {
 let navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);
    
     const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
   <>
         <div className="flex flex-row items-center gap-3">

             <img
      onClick={() => navigate('/')}
      className="hidden md:block cursor-pointer" 
      src="/images/das.png" 
      height="100" 
      width="100" 
      alt="DashDelivery" 
    />

            <div 
         onClick={() => navigate('/')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Home 
        </div>
        <div 
         onClick={() => navigate('/track')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Report
        </div>






   </div>
    </>
  )
}

export default Logo
