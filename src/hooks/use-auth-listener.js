import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function useAuthListener() {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const checkAuthStatus = () => {
      try {
        const token = Cookies.get('token');

        if (token) {
          const payload = jwtDecode(token);
          console.log(payload)
          setUser({ isAuthenticated: true,token:token,user_id:payload.user_id });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
   
    return () => {
     
    };
  }, []);

  return { user };
}