import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Desktop1 from "./pages/Desktop1";
import Desktop11 from "./pages/Desktop11";
import PatientList from "./pages/PatientList";
import ProfileSettings from "./pages/ProfileSettings.js";
import { useEffect,useState } from "react";
import Protected from "./pages/protected";
import axios from "axios";
import Session from "./pages/Session";
import PatientHistory from "./pages/PatientHistory";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [isLoggedIn,setLogin] = useState(false);
  const [pending,setPending] = useState(true);
  const [userDetails,setUserDetails] = useState({firstname:"",lastname:""});

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/signin":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  useEffect(()=>{
    axios.get("http://localhost:3001/current",{withCredentials:true}).then((res)=>{
      localStorage.setItem("currentUser",JSON.stringify(res.data));
      setUserDetails(res.data);
      setLogin(true);
      setPending(false);
    })
    .catch((err)=>{
      setLogin(false);
      localStorage.setItem("currentUser","")
      setPending(false);
    })
  },[isLoggedIn])

  return (
    <Routes>
      <Route path="/" element={<Protected pending={pending} isLoggedIn={isLoggedIn} navigateToLnk="/signin"><Desktop1 userDetails={userDetails} logout={()=>{setLogin(false)}} /></Protected>} />
      <Route path="/patientList" element={<Protected pending={pending} isLoggedIn={isLoggedIn} navigateToLnk="/signin"><PatientList userDetails={userDetails} logout={()=>{setLogin(false)}}/></Protected>} />
      <Route path="/profileSettings" element={<Protected pending={pending} isLoggedIn={isLoggedIn} navigateToLnk="/signin"><ProfileSettings userDetails={userDetails} logout={()=>{setLogin(false)}}/></Protected>} />
      <Route path="/patientHistory" element={<Protected pending={pending} isLoggedIn={isLoggedIn} navigateToLnk="/signin"><PatientHistory userDetails={userDetails} logout={()=>{setLogin(false)}}/></Protected>} />
      <Route path="/session" element={<Protected pending={pending} isLoggedIn={isLoggedIn} navigateToLnk="/signin"><Session userDetails={userDetails} logout={()=>{setLogin(false)}}/></Protected>} />
      <Route path="/signin" element={<Protected pending={pending} isLoggedIn={!isLoggedIn} navigateToLnk="/session"><Desktop11  login={()=>{setLogin(true)}} /></Protected>} />
    </Routes>
  );
}
export default App;

