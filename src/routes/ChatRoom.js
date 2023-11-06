import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import Nav from "../components/Nav";
import { AuthContext } from '../auth/AuthProvider';

function ChatRoom() {
    const { id } = useParams();
    const [chatMessageRecords, setChatMessageRecords] = useState([]);
    const [latestMessage, setLatestMessage] = useState("");
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { authToken } = useContext(AuthContext);

    const url = process.env.REACT_APP_BACKEND_API;

    const getChatMessageRecords = async () => {
        setIsLoading(true);
        const json = await (await fetch(`http://${url}/api/chats/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + authToken,
            }
        })).json();
        setChatMessageRecords(json);
        setIsLoading(false);
    }

    const executeReload = () => {
        setStream("");
        getChatMessageRecords();
    }

    const startSocketSession = () => {
        const newSocket = new WebSocket(`ws://${url}/v1/chat`);
        newSocket.onopen = () => {
            newSocket.send(id + '%start%');
        }
        setSocket(newSocket);
    }

    useEffect(() => {
        startSocketSession();
    }, []);

    const sendDeepDive = () => {
        console.log(latestMessage);
        if (socket && latestMessage) {
            socket.send(`%deepQ%${latestMessage}`);
        }
    }

    const handleSendMessage = () => {
        if (socket && message.trim() !== "") {
            socket.send(message);
            setMessage("");
            setLatestMessage("");
        }
    };

    const saveLatestMessage = (message) => {
        setLatestMessage(message);
    };

    useEffect(() => {
        getChatMessageRecords();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                setIsLoading(true);
                const receivedMessage = JSON.parse(event.data);
                if (receivedMessage == null) {
                    setIsLoading(false);
                    executeReload();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                } else {
                    setStream((prevStream) => prevStream + receivedMessage);
                    saveLatestMessage((prevStream) => prevStream + receivedMessage);
                }
            };
        }
    }, [socket]);

    return (
        <div>
            <Nav />
            <table>
                <tbody>
                    {chatMessageRecords.map((c) => (
                        <ChatMessage
                            key={c.id}
                            sender={c.sender}
                            message={c.message} />
                    ))}
                </tbody>
            </table>
            <div>
                <span>{stream}</span>
            </div>
            <h4>Chat Message:</h4>
            {isLoading ? (<div>Loading...</div>) : (
                <label>
                    <textarea
                        type="text"
                        placeholder="question please!"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </label>
            )}
            <hr />
            <button onClick={handleSendMessage} type="button">submit</button>
            <button onClick={sendDeepDive} type="button">deep dive</button>
        </div>
    );
}

export default ChatRoom;