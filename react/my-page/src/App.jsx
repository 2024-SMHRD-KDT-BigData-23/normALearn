import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// css.관련 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS
import './index.css'; // This is where your global styles might be
import './fonts.css'; // Import the new CSS file with the font-face rule

// 변수 관련
import Sidedown from "./pages/Sidedown";

// 페이지관련
import Search from "./pages/Search";
import About from "./pages/About";
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";

function App() {

    // Sidedown.jsx에서 불러오는 기능들
    const {
        data,
        fixedList,
        checkedData,
        uncheckedData,
        handleCheckboxChange
    } = Sidedown();// 커스텀 훅

    return (
        <div className="App">
            <nav className="main-menu">

                {/* 사이트 탑관련 기능 정의 */}
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
                
                {/* side-down관련 기능정의 */}
                <div className="side-down">
                    <div className="scrollbar" id="style-1">
                        <ul id="checked-sortable">
                            {checkedData.slice(0, 23).map((item, index) => (
                                <li key={index} className="darkerli">
                                    <a href="#">
                                        <i className="fa fa-rocket fa-lg"></i>
                                        <span className="nav-text">
                                            <input
                                                type="checkbox"
                                                name="item"
                                                value={item}
                                                checked={fixedList.includes(item)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                            {`${item}`}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {uncheckedData.slice(0, 23).map((item, index) => (
                                <li key={index} className="darkerli">
                                    <a href="#">
                                        <i className="fa fa-rocket fa-lg"></i>
                                        <span className="nav-text">
                                            <input
                                                type="checkbox"
                                                name="item"
                                                value={item}
                                                checked={fixedList.includes(item)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                            {`${item}`}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </nav>
            
            {/*메인 페이지 변경부분 링크 기능 */}
            <div>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/input2" element={<Input2 />} />
                    <Route path="/counter" element={<Counter />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;