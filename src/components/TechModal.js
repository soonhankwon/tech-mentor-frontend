import { useState, useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';

function TechModal({ isOpen, onClose, onTechChange }) {
    const options = ["SPRING", "REACT"];
    const [newTech, setNewTech] = useState("SPRING");
    const [tempTechs, setTempTechs] = useState(new Set());
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;

    const handleAdd = () => {
        if (newTech.trim() !== "") {
            const updatedTempTechs = new Set(tempTechs);
            updatedTempTechs.add(newTech);
            setTempTechs(updatedTempTechs);
            setNewTech("");
        }
    }

    const handleRemove = (tech) => {
        const updatedTempTechs = new Set(tempTechs);
        updatedTempTechs.delete(tech);
        setTempTechs(updatedTempTechs);
    }

    const handleSave = async () => {
        try {
            const data = {
                techs: [...tempTechs],
            };
            const response = await fetch(`http://${url}/api/users/techs`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                onTechChange([...tempTechs]);
            }
        } catch (error) {
            console.error('error:', error);
        }
        onClose();
    }

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>Add My Tech</h2>
                <select
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={handleAdd}>추가하기</button>
                <button onClick={handleSave}>저장하기</button>
                <button onClick={onClose}>취소</button>
                <ul>
                    {[...tempTechs].map((tech, index) => (
                        <li key={tech}> {tech}
                            <button onClick={() => handleRemove(tech)}>-</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : null;
}

export default TechModal;
