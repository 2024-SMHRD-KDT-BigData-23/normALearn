import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css'; // Import the new CSS file with the font-face rule
import Tablesub from './Tablesub';

const Table = () => {
    const [data, setData] = useState([]);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

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
                        {currentItems.map((item) => (
                            <tr key={item.rank}>
                                <td className="rank-column-td">{item.rank}</td>
                                <td>{item.tensileStrength}</td>
                                <td>{item.yieldStrength}</td>
                                <td>{item.hardness}</td>
                                <td>{item.elongation}</td>
                                <td><button className="btn btn-primary">상세보기</button></td>
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
