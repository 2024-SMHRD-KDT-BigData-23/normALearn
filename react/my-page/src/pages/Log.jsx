import React, { useState } from 'react';

// 사용자 정보 관련 훅
export const useUserInfoData = (setIsLoggedIn) => {
    const [userId, setUserId] = useState('');
    const [companyName, setCompanyName] = useState('');

    const setUserInfoAfterLogin = (userInfo) => {
        setUserId(userInfo.userId);
        setCompanyName(userInfo.companyName);
        localStorage.setItem('userInfo', JSON.stringify(userInfo)); // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
    };

    const handleLogout = () => {
        console.log('로그아웃');
        setIsLoggedIn(false);
        localStorage.removeItem('userInfo'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
    };

    return {
        userId,
        companyName,
        handleLogout,
        setUserInfoAfterLogin,
    };
};

// 로그인 정보 관련 훅
export const useLoginInfo = () => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleUserPwChange = (e) => {
        setUserPw(e.target.value);
    };

    const handleLogin = async (setUserInfoAfterLogin) => {
        try {
            const loginResponse = await fetch('http://localhost:8080/NomAlearn/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userPw }),
                credentials: 'include',
            });
    
            const result = await loginResponse.json();
    
            if (loginResponse.ok) {
                if (result.message === "로그인 성공") {
                    setIsLoggedIn(true);
                    setUserInfoAfterLogin({ companyName: result.companyName, userId: userId });
                    console.log("로그인 성공");
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
        userPw,
        isLoggedIn,
        handleUserIdChange,
        handleUserPwChange,
        handleLogin,
        setIsLoggedIn,
    };
};