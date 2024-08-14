import React from 'react';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import me from '../../img/me.jpg'; // 본인 이미지 import
import t1 from '../../img/t1.jpg'; // 아바타 이미지 import
import t2 from '../../img/t2.jpg'; // 아바타 이미지 import
import t3 from '../../img/t3.jpg'; // 아바타 이미지 import
import t4 from '../../img/t4.jpg'; // 아바타 이미지 import
import styles from '../../css/Header/Header.module.css';

const ProfileSidebar = ({ onSelectContact }) => {
    const contacts = [
        { id: 1, name: '심재휘 교사', message: '오늘 수업 참 힘드네요', avatar: t1 },
        { id: 2, name: '우도환 교사', message: '다음 수업 뭐지', avatar: t2 },
        {
            id: 3,
            name: '이하늘 교사',
            message: '글씨를 겁나게 길게 써버리면 사라지게 하는중 글씨를 겁나게 길게 써버리면 사라지게 하는중',
            avatar: t3,
        },
        { id: 4, name: '이제훈 교사', message: '수업 끝나고 올라와요', avatar: t4 },
    ];

    return (
        <>
            <div className={styles.profile}>
                <img src={me} alt="Avatar" className={styles.profileAvatar} />
                <div className={styles.profileInfo}>
                    <div className={styles.profileName}>본인</div>
                    <div className={styles.profileStatus}>내 정보</div>
                </div>
            </div>
            <InputGroup className={styles.searchBar}>
                <FormControl placeholder="이름으로 검색" aria-label="Search" className={styles.searchInput} />
                <InputGroup.Text>검색</InputGroup.Text>
            </InputGroup>
            <ListGroup className={styles.contactList}>
                {contacts.map((contact) => (
                    <ListGroup.Item key={contact.id} onClick={() => onSelectContact(contact)}>
                        <div className={styles.contactItem}>
                            <img src={contact.avatar} alt="Avatar" className={styles.contactAvatar} />
                            <div className={styles.contactInfo}>
                                <div className={styles.contactName}>{contact.name}</div>
                                <div className={styles.contactMessage}>{contact.message}</div>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default ProfileSidebar;
