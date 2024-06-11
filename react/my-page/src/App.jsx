import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts.css';
import Search from "./pages/Search";
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";
import Loginpage from "./Loginpage";
import Sidedown, { RenderList } from "./pages/Sidedown";

function App() {
    // Sidedown 관련 상태와 함수
    const { orderedData, fixedList, handleCheckboxChange } = Sidedown();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [moll, setMoll] = useState([]); // 서버에서 받아온 데이터를 저장할 상태
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/login');
    };

    useEffect(() => {
        const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (savedUserInfo) {
            setIsLoggedIn(true);
            setCompanyName(savedUserInfo.companyName);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        // Fetch API를 사용하여 Java 서버로부터 데이터를 받아옴
        fetch("http://localhost:8080/NomAlearn/getListOutput")
            .then(response => response.json())
            .then(moll => {
                console.log('전체데이터', moll); // 데이터를 콘솔에 출력
                setMoll(moll); // 받아온 데이터를 상태에 저장
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // 빈 배열을 두 번째 인자로 사용하여 컴포넌트 마운트 시 한 번만 실행

    return (
        <div className="App">
            {isLoggedIn ? (
                <>
                    <nav className="main-menu">
                        <div className="side-top">
                            <ul className="user-info">
                                <li className="user-name">
                                    <p>{companyName}</p>
                                    <i className="fa fa-angle-right"></i>
                                </li>
                                <li className="user-actions">
                                    <p>비밀번호 변경</p>
                                    <p> | </p>
                                    <p onClick={handleLogout}>logout</p>
                                </li>
                            </ul>
                            <ul className="top-ul">
                                <li>
                                    <Link to="/App/">
                                        <i className="fa fa-search"></i>
                                        <span className="nav-text">검색 페이지</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/App/input2">
                                        <i className="fa fa-bookmark"></i>
                                        <span className="nav-text">북마크 페이지</span>
                                    </Link>
                                </li>
                                <li className="darkerlishadow">
                                    <Link to="/App/counter">
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
                            <Route path="/" element={<Search onStartChange={() => {}} />} />
                            <Route path="/input2" element={<Input2 moll={moll} />} />
                            <Route path="/counter" element={<Counter moll={moll}/>} />
                        </Routes>
                    </div>
                </>
            ) : (
                <Routes>
                    <Route path="/login" element={<Loginpage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="*" element={<Loginpage setIsLoggedIn={setIsLoggedIn} />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
