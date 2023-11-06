import React from 'react';
import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import Avatar from "../css/Avatar";

function Nav() {
    const [user, setUser] = useState([]);
    const history = useHistory();
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;
    const getLoginUser = async () => {
        try {
            const response = await fetch(`http://${url}/api/users`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    history.push("/");
                } else {
                    console.error(`HTTP Error: ${response.status}`);
                }
            } else {
                const json = await response.json();
                setUser(json);
            }
        } catch (exception) {
            console.error(exception);
        }
    }

    useEffect(() => {
        getLoginUser();
    }, []);

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">
                <Link to="/login-home">TECH MENTOR</Link>
            </div>
            <div className="user">
                <Link to="/mypage">
                    <Avatar imgUrl={user.imageUrl} />
                </Link>
            </div>
        </nav>
    );
}

export default Nav;