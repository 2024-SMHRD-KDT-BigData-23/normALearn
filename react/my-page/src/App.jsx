import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts.css';
import Sidedown, { RenderList } from "./pages/Sidedown";
import Search from "./pages/Search";
import { useUserInfoData, useLoginInfo } from "./pages/Log";
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";

function App() {
    const {
        orderedData,
        fixedList,
        handleCheckboxChange
    } = Sidedown();

    const {
        userId,
        userPw,
        isLoggedIn,
        handleUserIdChange,
        handleUserPwChange,
        handleLogin,
        setIsLoggedIn
    } = useLoginInfo();

    const {
        companyName,
        handleLogout,
        setUserInfoAfterLogin,
    } = useUserInfoData(setIsLoggedIn);

    useEffect(() => {
        const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (savedUserInfo) {
            setIsLoggedIn(true);
            setUserInfoAfterLogin(savedUserInfo);
        }
    }, [setIsLoggedIn, setUserInfoAfterLogin]);

    const [start, setStart] = useState([]); // searchsub에서 가져온 정보를 상태로 관리

    // start 상태가 변경될 때마다 콘솔에 값을 출력
    useEffect(() => {
        console.log('App에서 관리하는 start 데이터:', start);
    }, [start]); // start가 변경될 때마다 실행

    return (
        <div className="App">
            <nav className="main-menu">
                <div className="side-top">
                <ul className="user-info">
                    <li className="user-name">
                    <p>{companyName}companyName</p><i className="fa fa-angle-right"></i>
                        </li>
                        <li className="user-actions">
                            <p>비밀번호 변경</p>
                            <p> | </p>
                            <p onClick={handleLogout}>logout</p>
                        </li>
                    </ul>

                    <ul className="top-ul">
                        <li>
                            <Link to="/">
                                <i className="fa fa-search"></i>
                                <span className="nav-text">검색 페이지</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/input2">
                                <i className="fa fa-bookmark"></i>
                                <span className="nav-text">북마크 페이지</span>
                            </Link>
                        </li>
                        <li className="darkerlishadow">
                            <Link to="/counter">
                                <i className="fa fa-wrench"></i>
                                <span className="nav-text">모델설정 페이지</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="scrollbar" id="style-1">
                    <RenderList data={orderedData} fixedList={fixedList} handleCheckboxChange={handleCheckboxChange} />
                </div>
            </nav>
            <div className="content-container">
                <Routes>
                    <Route path="/" element={<Search setStart={setStart} />} />
                    <Route path="/input2" element={<Input2 />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
