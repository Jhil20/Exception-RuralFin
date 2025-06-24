import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { disconnectSocket, getSocket } from './socket';

const logoutAutomatically = () => {
    const token=Cookies.get("token");
    if(token){
        const location=useLocation();
        if(location.pathname!=="/dashboard" || location.pathname!=="/agentDashboard" || location.pathname!=="/adminDashboard"){
            const decoded = jwtDecode(token);
            disconnectSocket();
        }
    }
}

export default logoutAutomatically;