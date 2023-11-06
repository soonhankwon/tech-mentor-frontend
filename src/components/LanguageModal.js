import { useState, useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';

function LanguageModal({ isOpen, onClose, onLanguageChange }) {
    const options = ["JAVA", "JAVASCRIPT"];
    const [newLanguage, setNewLanguage] = useState("JAVA");
    const [tempLanguages, setTempLanguages] = useState(new Set());
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;

    const handleAdd = () => {
        if (newLanguage.trim() !== "") {
            const updatedTempLanguages = new Set(tempLanguages);
            updatedTempLanguages.add(newLanguage);
            setTempLanguages(updatedTempLanguages);
            setNewLanguage("");
        }
    }

    const handleRemove = (language) => {
        const updatedTempLanguages = new Set(tempLanguages);
        updatedTempLanguages.delete(language);
        setTempLanguages(updatedTempLanguages);
    }

    const handleSave = async () => {
        try {
            const data = {
                languages: [...tempLanguages],
            };
            const response = await fetch(`http://${url}/api/users/languages`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                onLanguageChange([...tempLanguages]);
            }
        } catch (error) {
            console.error('error:', error);
        }
        onClose();
    }

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>Add My Language</h2>
                <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={handleAdd}>추가하기</button>
                <button onClick={handleSave}>저장하기</button>
                <button onClick={onClose}>취소</button>
                <ul>
                    {[...tempLanguages].map((language, index) => (
                        <li key={language}> {language}
                            <button onClick={() => handleRemove(language)}>-</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : null;
}

export default LanguageModal;
