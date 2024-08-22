import React from 'react';
import styles from '../css/Settings/Settings.module.css';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.SettingsContainer}>
            <div className={styles.container}>
                <h2>설정</h2>
                <button className={styles.optionButton} onClick={() => navigate('/personal-info-change')}>
                    개인정보 변경
                </button>
                <button className={styles.optionButton} onClick={() => navigate('/password-change')}>
                    비밀번호 변경
                </button>
            </div>
        </div>
    );
};

export default Settings;
