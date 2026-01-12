import { Navigate } from "react-router-dom";


const Protected = ({isLoggedIn,children,navigateToLnk,pending}) => {
    if (pending){
      return;
    }
    if (!isLoggedIn){
        return <Navigate to={navigateToLnk}/>
    }
  return (children);
};

export default Protected;
