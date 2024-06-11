import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const Loginpage = ({ setIsLoggedIn }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/NomAlearn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userPw }),
        credentials: 'include', // 필요에 따라 쿠키를 포함시킬 수 있습니다.
      });

      const result = await response.json();
      if (response.ok && result.message === "로그인 성공") {
        localStorage.setItem('isLoggedIn', true); // 로컬 스토리지에 로그인 상태 저장
        localStorage.setItem('companyName', result.companyName); // 회사 이름 저장
        setIsLoggedIn(true); // 로그인 상태 업데이트
        navigate('/'); // 메인 페이지로 이동
      } else {
        alert(result.message || '로그인 실패'); // 서버로부터 받은 메시지 혹은 기본 메시지 표시
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="title">
        <p>NORMALEARN</p>
      </div>
      <div className="title-message">
        <p>AI기반 알루미늄 열처리 공정 시스템</p>
      </div>
      <div className="login-box">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
};

export default Loginpage;
