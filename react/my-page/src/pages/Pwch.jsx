import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Pwch({ isOpen, onRequestClose }) { // 함수 이름 수정
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (newPassword === confirmPassword) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            onRequestClose();
        } else {
            alert('새 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2>비밀번호 변경</h2>
            <input
                type="password"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>변경</button>
            <button onClick={onRequestClose}>취소</button>
        </Modal>
    );
}

export default Pwch; // 컴포넌트 이름과 일치시키기
