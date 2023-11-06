import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

function Chat({ topic, createdAt, id }) {
    const { authToken } = useContext(AuthContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const url = process.env.REACT_APP_BACKEND_API;
    const onClick = async () => {
        try {
            const response = await fetch(`http://${url}/api/chats/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            });
            if (response.ok) {
                setIsDeleted(true);                
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    if(isDeleted) {
        return <Link to={`/login-home`}></Link>
    }

    return (
        <tr>
            <td>{topic}</td>
            <td>{createdAt}</td>
            <td><Link to={`/chats/${id}`}>입장</Link></td>
            <td><button onClick={onClick}>채팅방 삭제</button></td>
        </tr>
    );
}

export default Chat;