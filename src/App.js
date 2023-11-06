import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import LoginHome from "./routes/LoginHome";
import ChatRoom from "./routes/ChatRoom";
import MyPage from "./routes/MyPage";
import LoginHandler from "./routes/LoginHandler";
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/tech-mentor-frontend" component={Home} />
          <Route path="/login-home" component={LoginHome} />
          <Route path="/chats/:id" component={ChatRoom} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/oauth/kakao" component={LoginHandler} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;