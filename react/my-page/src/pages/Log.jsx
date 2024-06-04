import React, { useState } from 'react';

// 사용자 정보 관련 훅
export const useUserInfoData = (setIsLoggedIn) => {
    const [userName, setUserName] = useState('');
    const [companyName, setCompanyName] = useState('');

    // 로그인 후 사용자 정보 설정
    const setUserInfoAfterLogin = (userInfo) => {
        setUserName(userInfo.name);
        setCompanyName(userInfo.company);
    };

    // 로그아웃 핸들러
    const handleLogout = () => {
        console.log('로그아웃');
        setIsLoggedIn(false);
    };

    return {
        userName,
        companyName,
        handleLogout,
        setUserInfoAfterLogin,
    };
};

// 로그인 정보 관련 훅
export const useLoginInfo = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 아이디 입력 변경 핸들러
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    // 비밀번호 입력 변경 핸들러
    const handlePasswordInputChange = (e) => {
        setPassword(e.target.value);
    };

    // 로그인 처리 핸들러
    const handleLogin = async (setUserInfoAfterLogin) => {
        try {
            const loginResponse = await fetch('http://localhost:8080/NomAlearn/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userPw: password }),
                credentials: 'include',
            });
            const result = await loginResponse.json();
            if (loginResponse.ok) {
                if (result.message === "로그인 성공") {
                    setIsLoggedIn(true);
                    setUserInfoAfterLogin(result.userInfo); // 로그인 성공 시 사용자 정보 설정
                } else {
                    alert(result.message);
                }
            } else {
                alert('로그인 요청 중 오류 발생');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            alert('로그인 요청 중 오류 발생');
        }
    };

    return {
        userId,
        password,
        isLoggedIn,
        handleUserIdChange,
        handlePasswordInputChange,
        handleLogin,
        setIsLoggedIn,
    };
};
