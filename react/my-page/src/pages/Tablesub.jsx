import React, { useState, useEffect } from 'react';
import Table from './Table';

const Tablesub = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/NomAlearn/getListResult'); // 백엔드 API 주소
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        <div className="container">
            <Table data={currentItems} currentPage={currentPage} />
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
    );
};

export default Tablesub;
