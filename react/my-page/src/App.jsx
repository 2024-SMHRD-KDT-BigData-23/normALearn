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
import { useCookies } from 'react-cookie';
import Pwch from "./pages/Pwch";

function App() {
    const { orderedData, fixedList, handleCheckboxChange } = Sidedown();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [moll, setMoll] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [userId, setUserId] = useState(null); // userId 상태 추가
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        removeCookie('userId'); // 'userId' 쿠키 삭제
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const cookieId = cookies.userId;

    useEffect(() => {
        // 쿠키에서 userId 확인
        
        console.log('쿠키에 있는 userId 확인:', cookieId);

        if (!cookieId) {
            console.error('쿠키에 userId가 없습니다.');
            navigate('/login'); // 로그인 페이지로 이동
        } else {
            setUserId(cookieId); // userId 상태에 설정
        }
    }, [cookies, navigate]); // 종속성 배열에 cookies와 navigate 추가

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
        const url = `http://localhost:8080/NomAlearn/getListOutput?userId=${cookieId}`;
        fetch(url)
            .then(response => response.json())
            .then(moll => {
                console.log('전체데이터', moll);
                setMoll(moll);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                                    <p onClick={handleOpenModal}>비밀번호 변경</p>
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
                            <Route path="/counter" element={<Counter moll={moll} />} />
                        </Routes>
                    </div>
                    <Pwch 
                        isOpen={isModalOpen} 
                        onRequestClose={handleCloseModal} // onRequestClose로 prop 전달
                        userId={userId} // userId를 Pwch 컴포넌트에 전달
                    />
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
