import { useAuth } from '../context/AuthContext'
import {Navigate} from "react-router-dom" 

const ProtectedRoute = ({children,type}) => {
    
    const {user,loading} = useAuth();

    if(loading) return <p>Loading...</p>
    
    if(type === "protected" && !user)
    return <Navigate to="/"/>

    if(type === "guest" && user) return <Navigate to="/dashboard"/> 

    return children
}

export default ProtectedRoute
