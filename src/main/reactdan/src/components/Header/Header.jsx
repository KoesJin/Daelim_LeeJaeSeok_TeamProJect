import React, { useState } from 'react';
import { Navbar, Button, Modal } from 'react-bootstrap';
import { FaBars, FaComments } from 'react-icons/fa';
import styles from '../../css/Header/Header.module.css'; // 스타일 임포트

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar bg="light" expand="lg" className={`${styles.navbarCustom} mb-0`}>
                <Button variant="outline-secondary" className={styles.navbarButton} onClick={handleShowModal}>
                    <FaBars />
                </Button>
                <Navbar.Brand href="/mainpage" className={`mx-auto ${styles.navbarBrandCustom}`}>
                    우리 이름좀 넣자
                </Navbar.Brand>
                <Button variant="outline-secondary" className={styles.navbarButton}>
                    <FaComments />
                </Button>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>모달 제목</Modal.Title>
                </Modal.Header>
                <Modal.Body>모달 내용</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;
