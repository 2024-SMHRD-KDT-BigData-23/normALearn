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
    const [userPw, setUserPw] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 아이디 입력 변경 핸들러
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    // 비밀번호 입력 변경 핸들러
    const handleUserPwChange = (e) => {
        setUserPw(e.target.value);
    };

    // 로그인 처리 핸들러
    const handleLogin = async (setUserInfoAfterLogin) => {
        try {
            const loginResponse = await fetch('http://localhost:8080/NomAlearn/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userPw }), // userId와 userPw를 JSON으로 변환하여 보냄
                credentials: 'include', // 쿠키를 포함하여 요청
            });
    
            const result = await loginResponse.json();
    
            if (loginResponse.ok) {
                if (result.message === "로그인 성공") {
                    setIsLoggedIn(true); // 로그인 상태를 true로 설정
                    setUserInfoAfterLogin({ userId: result.userId }); // 로그인 성공 시 최소한의 사용자 정보 설정
                    // 추가적인 사용자 정보가 필요하면 서버에서 가져올 수 있음
                    console.log("로그인성공")
                } else {
                    alert(result.message); // 실패 메시지를 사용자에게 알림
                }
            } else {
                alert('로그인 요청 중 오류 발생'); // 응답 상태가 OK가 아닌 경우 오류 메시지를 알림
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error); // 요청 중 오류가 발생하면 콘솔에 로그를 출력
            alert('로그인 요청 중 오류 발생'); // 오류 메시지를 사용자에게 알림
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