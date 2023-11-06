import { useState, useEffect, useContext } from "react";
import TopLogo from "../components/TopLogo";
import PositionModal from "../components/PositionModal";
import LanguageModal from "../components/LanguageModal";
import TechModal from "../components/TechModal";
import { AuthContext } from '../auth/AuthProvider';

function MyPage() {
    const [user, setUser] = useState([]);
    const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isTechModalOpen, setIsTechModalOpen] = useState(false);
    const [isEditingYearOfWorkExperience, setIsEditingYearOfWorkExperience] = useState(false);
    const [newYearOfWorkExperience, setNewYearOfWorkExperience] = useState(user.yearOfWorkExperience);
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

    const renderLanguages = (items) => {
        if (items && items.length > 0) {
            return (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}
                            <button onClick={() => handleLanguageRemove(item)}>-</button>
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    const renderTechs = (items) => {
        if (items && items.length > 0) {
            return (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}
                            <button onClick={() => handleTechRemove(item)}>-</button>
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    const handleTechRemove = async (tech) => {
        try {
            const data = {
                tech: tech,
            };
            const response = await fetch(`http://${url}/api/users/techs`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const updatedTechs = user.userTechs.filter((item) => item !== tech);
                setUser({ ...user, userTechs: updatedTechs });
            }
        } catch (error) {
            console.error('error:', error);
        }
    }

    const handleLanguageRemove = async (language) => {
        try {
            const data = {
                language: language,
            };
            const response = await fetch(`http://${url}/api/users/languages`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const updatedLanguages = user.userLanguages.filter((item) => item !== language);
                setUser({ ...user, userLanguages: updatedLanguages });
            }
        } catch (error) {
            console.error('error:', error);
        }
    }

    const handleYearOfWorkExperienceChange = async () => {
        try {
            const data = {
                year: newYearOfWorkExperience,
            };
            const response = await fetch(`http://${url}/api/users/work-experience-year`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setUser({ ...user, yearOfWorkExperience: newYearOfWorkExperience });
                setIsEditingYearOfWorkExperience(false);
            }
        } catch (error) {
            console.error('error:', error);
        }
    }

    const handlePositionChange = (newPosition) => {
        setUser({ ...user, position: newPosition });
    }

    const handleLanguageChange = (newLanguageList) => {
        setUser({ ...user, userLanguages: newLanguageList });
    }

    const handleTechChange = (newTechList) => {
        setUser({ ...user, userTechs: newTechList });
    }

    return (
        <div>
            <TopLogo />
            <div>
                <h2>My Page</h2>
            </div>
            <div>
                <h4>Email: <li>{user.email}</li></h4>
            </div>
            <div>
                <h4>Nickname: <li>{user.nickname}</li></h4>
            </div>
            <div>
                <h4>Social Login Type: <li>{user.snsType}</li></h4>
            </div>
            <div>
                <h4>Position: <li>{user.position}</li></h4>
                <button onClick={() => setIsPositionModalOpen(true)}>수정하기</button>
            </div>
            <div>
                <h4>Language: {renderLanguages(user.userLanguages)}</h4>
                <button onClick={() => setIsLanguageModalOpen(true)}>추가하기</button>
            </div>
            <div>
                <h4>Tech: {renderTechs(user.userTechs)}</h4>
                <button onClick={() => setIsTechModalOpen(true)}>추가하기</button>
            </div>
            <div>
                <h4>
                    Year Of Work Experience:{" "}
                    {isEditingYearOfWorkExperience ? (
                        <div>
                            <input
                                type="number"
                                value={newYearOfWorkExperience}
                                onChange={(e) => setNewYearOfWorkExperience(e.target.value)} />
                            <button onClick={handleYearOfWorkExperienceChange}>저장</button>
                        </div>
                    ) : (
                        <span>{user.yearOfWorkExperience}</span>
                    )}
                </h4>
                <button onClick={() => setIsEditingYearOfWorkExperience(true)}>수정하기</button>
            </div>
            <PositionModal
                isOpen={isPositionModalOpen}
                onClose={() => setIsPositionModalOpen(false)}
                currentPosition={user.position}
                onPositionChange={handlePositionChange} />
            <LanguageModal
                isOpen={isLanguageModalOpen}
                onClose={() => setIsLanguageModalOpen(false)}
                onLanguageChange={handleLanguageChange} />
            <TechModal
                isOpen={isTechModalOpen}
                onClose={() => setIsTechModalOpen(false)}
                onTechChange={handleTechChange} />
        </div>
    );
}

export default MyPage;