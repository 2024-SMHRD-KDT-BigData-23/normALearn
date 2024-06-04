import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// css 관련
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS
import './fonts.css'; // Import the new CSS file with the font-face rule

// 변수 관련
import Sidedown, { RenderList } from "./pages/Sidedown";

// 페이지 관련
import Search from "./pages/Search";
import { useUserInfoData, useLoginInfo } from "./pages/Log"; 
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";



function App() {
    // Sidedown.jsx에서 불러오는 기능들
    const {
        orderedData,
        fixedList,
        handleCheckboxChange
    } = Sidedown(); // 커스텀 훅

    // Log에서 커스텀 훅 사용
    const {
        userId,
        userPw,
        isLoggedIn,
        handleUserIdChange,
        handleUserPwChange,
        handleLogin,
        setIsLoggedIn
    } = useLoginInfo();

    // Log에서 사용자 정보 관련 훅 사용
    const {
        userName,
        companyName,
        handleLogout,
        setUserInfoAfterLogin,
    } = useUserInfoData(setIsLoggedIn);

    return (
        <div className="App">
            <nav className="main-menu">
                {/* 사이트 탑 관련 기능 정의 */}
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
                                    <p>{userId} ({companyName})</p><i className="fa fa-angle-right"></i>
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
                            <Link to="/about">
                                <i className="fa fa-bar-chart"></i>
                                <span className="nav-text">시각화 페이지</span>
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

                {/* side-down 관련 기능 정의 */}
               
                    <div className="scrollbar" id="style-1">
                        <RenderList data={orderedData} fixedList={fixedList} handleCheckboxChange={handleCheckboxChange} />
                    </div>
                
            </nav>

            {/* 메인 페이지 변경 부분 링크 기능 */}
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