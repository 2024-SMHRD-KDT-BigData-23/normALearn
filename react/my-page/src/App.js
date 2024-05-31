import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS
import './index.css'; // This is where your global styles might be
import './fonts.css'; // Import the new CSS file with the font-face rule





import Search from "./pages/Search";
import About from "./pages/About";
import Input2 from "./pages/Input2";
import Counter from "./pages/Counter";

function App() {
  const data = { message: "Hello, World!" }; // Example data
  return (
    <div className="App">
      <nav className="main-menu">
        <div className="side-top">





          <ul className="user-info">
            <li>

              <p>normALearn </p><i className="fa fa-angle-right"></i>

            </li>
            <li>
              <p>비밀번호 변경</p>
              <p> ｜</p>
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

        <div className="scrollbar" id="style-1">
          <ul>
            <li className="darkerli scroll-first">
              <a>
                <i className="fa fa-circle-o"></i>
                <span className="nav-text">연신율 70 인장강도 30</span>
              </a>
            </li>



            {/* Add more list items as needed */}
          </ul>
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </nav>

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
