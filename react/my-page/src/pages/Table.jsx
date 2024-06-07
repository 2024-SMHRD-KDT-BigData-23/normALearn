import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css';
import Tablesub from './Tablesub';

const Table = ({ setSelectedItem, start }) => {
    const [data, setData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState([]);

    // start가 변경될 때마다 데이터를 업데이트하고 콘솔에 출력
    useEffect(() => { 
        setList(start); // start 데이터를 data로 설정
        console.log('search 전달한 start:', start); // 콘솔에 출력
    }, [start]);

    const handleClick = (event) => {
        event.preventDefault();
        setCurrentPage(Number(event.target.id));
    };

    const handlePrevClick = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleViewDetails = (item) => {
        setSelectedItem(item); // 선택된 항목의 데이터를 부모 컴포넌트로 전달
        console.log('상세보기 클릭 시:', item); // 콘솔에 데이터 출력
    };

    const handleNextClick = (event) => {
        event.preventDefault();
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                                <td>{item.tensileStrengthResult}</td>
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
