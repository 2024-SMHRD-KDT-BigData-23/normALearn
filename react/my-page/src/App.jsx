import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// css 관련
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS
import './index.css'; // This is where your global styles might be
import './fonts.css'; // Import the new CSS file with the font-face rule

// 변수 관련
import Sidedown, { RenderList } from "./pages/Sidedown";

// 페이지 관련
import Search from "./pages/Search";

import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";

function App() {
    // Sidedown.jsx에서 불러오는 기능들
    const {
        orderedData,
        fixedList,
        handleCheckboxChange
    } = Sidedown(); // 커스텀 훅

    return (
        <div className="App">
            <nav className="main-menu">
                {/* 사이트 탑 관련 기능 정의 */}
                <div className="side-top">
                    <ul className="user-info">
                        <li>
                            <p>normALearn </p><i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <p>비밀번호 변경</p>
                            <p> | </p>
                            <p>logout</p>
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
