import { useEffect, useState, useContext } from "react";
import Avatar from "../css/Avatar";
import { AuthContext } from '../auth/AuthProvider';

function ChatMessage({ sender, message }) {
    const [user, setUser] = useState([]);
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;
    const getLoginUser = async () => {
        const json = await (await fetch(`http://${url}/api/users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        })).json();
        setUser(json);
    }

    useEffect(() => {
        getLoginUser();
    }, []);


    return (
        <tr>
            <td>
                {sender === "AI" ? (
                    <Avatar imgUrl={`https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png`} />
                ) : (
                    <Avatar imgUrl={user.imageUrl} />
                )}
                <span style={{ whiteSpace: "pre-line" }}>{message}</span>
                <hr />
            </td>
        </tr>
    );
}

export default ChatMessage;