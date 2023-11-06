import { useState, useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';

function PositionModal({ isOpen, onClose, currentPosition, onPositionChange}) {
    const [newPosition, setNewPosition] = useState(currentPosition);
    const options = ["BACKEND_DEVELOPER", "FRONTEND_DEVELOPER", "FULLSTACK_DEVELOPER", "DEV_OPS", "STUDENT"];
    const { authToken } = useContext(AuthContext);
    const url = process.env.REACT_APP_BACKEND_API;
    const handleSave = async () => {
        try {
            const data = {
                position: newPosition,
            };
            const response = await fetch(`http://${url}/api/users/positions`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                onPositionChange(newPosition);
            }
        } catch (error) {
            console.error('error:', error);
        }
        onClose();
    }

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>Verify Position</h2>
                <select
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button onClick={handleSave}>저장</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    ) : null;
}

export default PositionModal;