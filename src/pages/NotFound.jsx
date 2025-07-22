
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

function NotFound() {

     let navigate = useNavigate();

      const navigateToHome = () => {
   navigate('/'); 
  };

    return (
        <>
        <EmptyState
          title="404"
          subtitle="Page Not Found"
           label="Home"
            onClick={navigateToHome}
        />

 
      </>
    );


}

export default NotFound




