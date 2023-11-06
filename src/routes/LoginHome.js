import { useEffect, useState, useContext } from "react";
import Chat from "../components/Chat";
import EnterButton from "../components/EnterButton";
import Nav from "../components/Nav";
import { AuthContext } from '../auth/AuthProvider';

function LoginHome() {
    const [chats, setChats] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("JAVA");
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;

    const getChats = async () => {
        try {
            const json = await (await fetch(`http://${url}/api/chats`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            })).json();
            setChats(json);

        } catch (exception) {
            console.error(exception);
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    const topicOptions = ["JAVA", "KOTLIN", "SPRING", "JAVASCRIPT", "REACT", "NEXT_JS", "NODE_JS", "NEST_JS", "JPA", "CS"];

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    return (
        <div>
            <Nav />
            <div>
                <h2>An AI Mentoring And Deep Dive with Tech Specialist</h2>
            </div>
            <div>
                <h4>MY CHAT ROOM</h4>
                <table>
                    <thead>
                        <tr>
                            <th>주제</th>
                            <th>시작일</th>
                            <th>입장</th>
                            <th>채팅방삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(chats) ? chats.map((chat) => (
                            <Chat
                                key={chat.id}
                                topic={chat.topic}
                                createdAt={chat.createdAt}
                                id={chat.id}
                            />
                        )) : null}
                    </tbody>
                </table>
                <hr />
                <div>
                    <select value={selectedTopic} onChange={handleTopicChange}>
                        {topicOptions.map((topic) => (
                            <option key={topic} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>
                    <EnterButton
                        topic={selectedTopic} />
                </div>
            </div>
        </div>
    );
}

export default LoginHome;