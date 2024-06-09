import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input2.css';
import '../fonts.css'; // Import the new CSS file with the font-face rule

// 개별 항목을 위한 SVG 버튼 컴포넌트
const SvgButton = ({ rank, isFavorite, onClick }) => {
    const [color, setColor] = useState(isFavorite ? '#f7e600' : '#4E5968');

    const handleClick = (event) => {
        event.preventDefault();
        const newColor = color === '#000000' ? '#f7e600' : '#000000';
        setColor(newColor);
        onClick(rank, newColor);
    };

    return (
        <svg
            onClick={handleClick}
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    fill={color}
                    d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 
                       C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096
                       c-1.458,0.223-2.669,1.242-3.138,2.642c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977
                       c-0.242,1.488,0.389,2.984,1.62,3.854c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365
                       c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72c1.231-0.869,1.861-2.365,1.619-3.854
                       l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"
                ></path>
            </g>
        </svg>
    );
};

// Bookmark 컴포넌트
const Bookmark = () => {
    const [data, setData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // 데이터 가져오기 함수
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // 필요한 요청 데이터를 여기에 추가하세요.
                })
            });

            const result = await response.json();
            console.log('북마크페이지 받아온정보:', result); // 데이터를 콘솔에 출력
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // 페이지가 마운트되면 데이터를 가져오기
    }, []);

    const handleClick = (rank, newColor) => {
        console.log(`아이템 ${rank}의 새로운 색상: ${newColor}`);
        // 여기서 추가적인 클릭 로직을 처리할 수 있습니다.
    };

    const handlePrevClick = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <li key={number} className={number === currentPage ? 'active' : ''}>
                <a href="#" id={number} onClick={(event) => handlePageClick(event, number)}>{number}</a>
            </li>
        ));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bookmark-wrap">
            <div className="bookmark-area">
                <table className="bookmark-group">
                    <thead>
                        <tr className="spaced-title">
                            <th className="rank-column">즐겨찾기</th>
                            <th>인장강도</th>
                            <th>항복강도</th>
                            <th>경도</th>
                            <th>연신율</th>
                            <th>조성</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.rank}>
                                <td>
                                    <SvgButton 
                                        rank={item.rank} 
                                        isFavorite={item.favorite === 'Y'}
                                        onClick={handleClick} 
                                    />
                                </td>
                                <td>{item.tensileStrength}</td>
                                <td>{item.yieldStrength}</td>
                                <td>{item.hardness}</td>
                                <td>{item.elongation}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={(event) => handleClick(event, item)}>상세보기</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <ul>
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <a href="#" onClick={handlePrevClick}>&laquo; Prev</a>
                        </li>
                        {renderPageNumbers()}
                        <li className={currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}>
                            <a href="#" onClick={handleNextClick}>Next &raquo;</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;
