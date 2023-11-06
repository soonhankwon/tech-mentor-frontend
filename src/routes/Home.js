function Home() {
    const onClick = () => {
        const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=https://soonhankwon.github.io/tech-mentor-frontend/oauth/kakao&response_type=code`;
    }
    
    return (
        <div>
            <div>
                <h2>WELCOME TO TECH AI MENTOR AND DEEPDIVE!</h2>
                <p>An AI Mentoring And Deep Dive with Tech Specialist</p>
            </div>
            <div>
                <p>PRESS UNDER BUTTON</p>
                <img
                    src="/kakao_login_large_wide.png"
                    alt=""
                    onClick={onClick}>
                </img>
            </div>
        </div>
    );
}

export default Home;