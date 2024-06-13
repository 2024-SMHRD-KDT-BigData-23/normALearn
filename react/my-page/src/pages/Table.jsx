import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css';

const Table = ({ setSelectedItem, start }) => {
    const [list, setList] = useState([]);

    // Update list whenever start changes
    useEffect(() => {
        setList(start); // Set list to start data
        console.log('search 전달한 start:', start); // Log start data
    }, [start]);

    const handleViewDetails = (item) => {
        setSelectedItem(item); // Send selected item data to parent component
        console.log('상세보기 클릭 시:', item); // Log item data
    };

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
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td className="rank-column-td">{index + 1}</td>
                                <td>{item.tensileStrengthResult}</td>
                                <td>{item.yieldStrengthResult}</td>
                                <td>{item.hardnessResult}</td>
                                <td>{item.elongationResult}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleViewDetails(item)} // Add click handler
                                    >
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
