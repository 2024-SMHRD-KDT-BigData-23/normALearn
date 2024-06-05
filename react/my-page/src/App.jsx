import React, { useEffect } from "react";
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

    return (
        <div className="App">
            <nav className="main-menu">
                <div className="side-top">
                    <ul className="user-info">
                        {!isLoggedIn ? (
                            <li className="login-fields">
                                <input 
                                    type="text" 
                                    placeholder="아이디" 
                                    value={userId} 
                                    onChange={handleUserIdChange} 
                                />
                                <input 
                                    type="password" 
                                    placeholder="비밀번호" 
                                    value={userPw} 
                                    onChange={handleUserPwChange} 
                                />
                                <button onClick={() => handleLogin(setUserInfoAfterLogin)}>로그인</button>
                            </li>
                        ) : (
                            <>
                                <li className="user-name">
                                    <p>{companyName}</p><i className="fa fa-angle-right"></i>
                                </li>
                                <li className="user-actions">
                                    <p onClick={handleLogout}>logout</p>
                                </li>
                            </>
                        )}
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
                    <Route path="/" element={<Search />} />
                    <Route path="/input2" element={<Input2 />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;