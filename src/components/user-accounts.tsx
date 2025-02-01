// Hook
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if(!token) {
        navigate('/')
    }
    return (
        <h1>Account user {0}</h1>
    )
}

export default UserAccount;