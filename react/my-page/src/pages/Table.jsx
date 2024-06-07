import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css'; // Import the new CSS file with the font-face rule
import Tablesub from './Tablesub';

const Table = ({ setSelectedItem }) => {
    const [data, setData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지 클릭 핸들러
    const handleClick = (event) => {
        event.preventDefault();
        setCurrentPage(Number(event.target.id));
    };

    // 이전 페이지 클릭 핸들러
    const handlePrevClick = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 상세보기 클릭 핸들러
    const handleViewDetails = (item) => {
        setSelectedItem(item); // 선택된 항목의 데이터를 부모 컴포넌트로 전달
        console.log('상세보기 클릭 시:', item); // 콘솔에 데이터 출력
    };

    // 다음 페이지 클릭 핸들러
    const handleNextClick = (event) => {
        event.preventDefault();
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 페이지 번호 렌더링 함수
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <li key={number} className={number === currentPage ? 'active' : ''}>
                <a href="#" id={number} onClick={handleClick}>{number}</a>
            </li>
        ));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="table-wrap">
            <Tablesub setData={setData} />
            <div className="table-area">
                <table className="table-group">
                    <thead>
                        <tr className="spaced-title">
                            <th className="rank-column">목차</th>
                            <th>인장강도</th>
                            <th>항복강도</th>
                            <th>경도</th>
                            <th>연신율</th>
                            <th>조성</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td className="rank-column-td">{index + 1}</td>
                                <td>{item.tensileTtrengthResult}</td>
                                <td>{item.yieldStrengthResult}</td>
                                <td>{item.hardnessResult}</td>
                                <td>{item.elongationResult}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => handleViewDetails(item)} // 클릭 핸들러 추가
                                    >
                                        상세보기
                                    </button>
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

export default Table;
