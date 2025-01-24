import { useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log("IN REQUIRE AUTH");
    console.log(auth);

    return(
        auth?.username
        ? <Outlet/> 
        : <Navigate to="/" state={{ from: location }} replace/>
    )
}

export default RequireAuth;