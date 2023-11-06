import React from 'react';
import { Link } from 'react-router-dom';

function TopLogo() {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo">
                <Link to="/login-home">TECH MENTOR</Link>
            </div>
        </nav>
    );
}

export default TopLogo;