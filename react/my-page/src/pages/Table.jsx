import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css'; // Import the new CSS file with the font-face rule

const Table = () => {
    const data = [
        { rank: 1, tensileStrength: '700 MPa', yieldStrength: '400 MPa', hardness: '150 Hv', elongation: '12%', efficiency: '85%', changeClass: 'red' },
        { rank: 2, tensileStrength: '750 MPa', yieldStrength: '450 MPa', hardness: '155 Hv', elongation: '14%', efficiency: '90%', changeClass: 'red' },
        { rank: 3, tensileStrength: '800 MPa', yieldStrength: '500 MPa', hardness: '160 Hv', elongation: '10%', efficiency: '88%', changeClass: 'red' },
        { rank: 4, tensileStrength: '650 MPa', yieldStrength: '380 MPa', hardness: '140 Hv', elongation: '15%', efficiency: '92%', changeClass: 'red' },
        { rank: 5, tensileStrength: '600 MPa', yieldStrength: '350 MPa', hardness: '130 Hv', elongation: '11%', efficiency: '87%', changeClass: 'red' },
        { rank: 6, tensileStrength: '720 MPa', yieldStrength: '420 MPa', hardness: '145 Hv', elongation: '13%', efficiency: '80%', changeClass: 'green' },
        { rank: 7, tensileStrength: '680 MPa', yieldStrength: '400 MPa', hardness: '150 Hv', elongation: '12%', efficiency: '75%', changeClass: 'green' },
        { rank: 8, tensileStrength: '740 MPa', yieldStrength: '430 MPa', hardness: '152 Hv', elongation: '14%', efficiency: '82%', changeClass: 'green' },
        { rank: 9, tensileStrength: '710 MPa', yieldStrength: '410 MPa', hardness: '148 Hv', elongation: '13%', efficiency: '89%', changeClass: 'red' },
        { rank: 10, tensileStrength: '670 MPa', yieldStrength: '390 MPa', hardness: '142 Hv', elongation: '12%', efficiency: '85%', changeClass: 'red' },
        { rank: 11, tensileStrength: '700 MPa', yieldStrength: '400 MPa', hardness: '150 Hv', elongation: '12%', efficiency: '85%', changeClass: 'red' },
        { rank: 12, tensileStrength: '750 MPa', yieldStrength: '450 MPa', hardness: '155 Hv', elongation: '14%', efficiency: '90%', changeClass: 'red' },
        { rank: 13, tensileStrength: '800 MPa', yieldStrength: '500 MPa', hardness: '160 Hv', elongation: '10%', efficiency: '88%', changeClass: 'red' },
        { rank: 14, tensileStrength: '650 MPa', yieldStrength: '380 MPa', hardness: '140 Hv', elongation: '15%', efficiency: '92%', changeClass: 'red' },
        { rank: 15, tensileStrength: '600 MPa', yieldStrength: '350 MPa', hardness: '130 Hv', elongation: '11%', efficiency: '87%', changeClass: 'red' },
        { rank: 16, tensileStrength: '720 MPa', yieldStrength: '420 MPa', hardness: '145 Hv', elongation: '13%', efficiency: '80%', changeClass: 'green' },
        { rank: 17, tensileStrength: '680 MPa', yieldStrength: '400 MPa', hardness: '150 Hv', elongation: '12%', efficiency: '75%', changeClass: 'green' },
        { rank: 18, tensileStrength: '740 MPa', yieldStrength: '430 MPa', hardness: '152 Hv', elongation: '14%', efficiency: '82%', changeClass: 'green' },
        { rank: 19, tensileStrength: '710 MPa', yieldStrength: '410 MPa', hardness: '148 Hv', elongation: '13%', efficiency: '89%', changeClass: 'red' },
        { rank: 20, tensileStrength: '670 MPa', yieldStrength: '390 MPa', hardness: '142 Hv', elongation: '12%', efficiency: '85%', changeClass: 'red' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
                                <td className="rank-column">{item.rank}</td>
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
