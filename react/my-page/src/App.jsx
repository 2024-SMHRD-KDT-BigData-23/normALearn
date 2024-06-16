import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts.css';
import Search from "./pages/Search";
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";
import Loginpage from "./Loginpage";
import Sidedown from "./pages/Sidedown";
import Table from "./pages/Table"; // Table 컴포넌트가 있는 경로를 올바르게 설정하세요.
import { useCookies } from 'react-cookie';
import Pwch from "./pages/Pwch";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [moll, setMoll] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookies, removeCookie] = useCookies(['userId']);
    const [userId, setUserId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목을 저장하는 상태
    const [start, setStart] = useState([]); // 테이블의 데이터를 저장하는 상태
    const [results, setResults] = useState([]); // 검색 결과를 저장하는 상태

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        removeCookie('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cookieId = cookies.userId;

    useEffect(() => {
        console.log('쿠키에 있는 userId 확인:', cookieId);

        if (!cookieId) {
            console.error('쿠키에 userId가 없습니다.');
            navigate('/login');
        } else {
            setUserId(cookieId);
        }
    }, [cookies, navigate]);

    useEffect(() => {
        const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (savedUserInfo) {
            setIsLoggedIn(true);
            setCompanyName(savedUserInfo.companyName);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fetchData = () => {
        const url = `http://localhost:8080/NomAlearn/getListOutput?userId=${cookieId}`;
        fetch(url)
            .then(response => response.json())
            .then(moll => {
                console.log('전체데이터', moll);
                setMoll(moll);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (location.pathname === '/App/input2') {
            fetchData();
        }
    }, [location.pathname]);

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
                                        <span className="nav-text">모델관리 페이지</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="scrollbar" id="style-1">
                            <Sidedown 
                                setSelectedItem={setSelectedItem} 
                                setStart={setStart} 
                                onResults={setResults}
                            />
                        </div>
                    </nav>
                    <div className="content-container">
                        <Routes>
                            <Route path="/" element={<Search onStartChange={() => {}} />} />
                            <Route path="/input2" element={<Input2 moll={moll} />} />
                            <Route path="/counter" element={<Counter moll={moll} />} />
                        </Routes>
                        {start.length > 0 && <Table setSelectedItem={setSelectedItem} start={start} />}
                    </div>
                    <Pwch 
                        isOpen={isModalOpen} 
                        onRequestClose={handleCloseModal} 
                        userId={userId} 
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
