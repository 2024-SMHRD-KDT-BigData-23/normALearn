import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import '../fonts.css';

const Table = ({ setSelectedItem, start }) => {
    const [list, setList] = useState([]);

    // start가 변경될 때마다 리스트를 업데이트합니다.
    useEffect(() => {
        setList(start); // 리스트를 start 데이터로 설정합니다.
        console.log('search 전달한 start:', start); // start 데이터를 로그에 출력합니다.

        // 데이터가 변경될 때마다 다음 렌더링 후에 버튼을 클릭합니다.
        setTimeout(() => {
            // 첫 번째 "상세보기" 버튼을 선택합니다.
            const detailButton = document.querySelector('.btn.btn-primary');
            // 버튼이 있는지 확인합니다.
            if (detailButton) {
                detailButton.click(); // 첫 번째 버튼 클릭
            }
        }, 100); // DOM 업데이트를 위해 100밀리초 지연시킵니다.
    }, [start]); // start가 변경될 때마다 이 useEffect가 실행됩니다.

    // 상세보기 버튼 클릭 핸들러
    const handleViewDetails = (item) => {
        setSelectedItem(item); // 선택된 항목 데이터를 상위 컴포넌트로 전달합니다.
        console.log('상세보기 클릭 시:', item); // 선택된 항목 데이터를 로그에 출력합니다.
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
                                        onClick={() => handleViewDetails(item)} // 클릭 핸들러 추가
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
