import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState, useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';

function EnterButton({ topic }) {
    const [id, setId] = useState(0);
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;
    const onClick = async () => {
        try {
            const data = {
                topic: topic,
            };
            const response = await fetch(`http://${url}/api/chats`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setId(await response.json());
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <div>
            <button onClick={onClick}>Mentoring</button>
            {id > 0 && <Link to={`/chats/${id}`}>Go to ChatRoom</Link>}
        </div>
    );
}

export default EnterButton;