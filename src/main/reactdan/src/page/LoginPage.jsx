import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'root' && password === '1234') {
            navigate('/mainpage');
        } else {
            alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return (
        <div>
            <h2>임시 로그인 페이지</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>아이디:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
