import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from 'react';
import { AuthContext } from "../auth/AuthProvider";

const LoginHandler = (props) => {

    const history = useHistory();
    const code = new URL(window.location.href).searchParams.get("code");
    const { setAuthToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const response = await fetch(`http://${url}/oauth/kakao?code=${code}`, {
                    method: 'GET',
                });
                if (response.ok) {
                    const jwt = response.headers.get("Authorization");
                    setAuthToken(jwt);
                    history.push("/login-home");
                } else {
                    console.log("Login failed");
                }
            } catch (ex) {
                console.error("Error:", ex);
            }
        };
        kakaoLogin();
    }, [code, history]);


    return (
        <div className="LoginHandler">
            <div className="notice">
                <p>Logging......</p>
                <p>Please wait.</p>
            </div>
        </div>
    )
}


export default LoginHandler;