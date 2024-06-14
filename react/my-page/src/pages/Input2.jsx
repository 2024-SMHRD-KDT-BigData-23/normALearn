// React와 필요한 라이브러리 및 스타일 시트들을 불러옵니다.
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input2.css';
import '../fonts.css';
import InputModal from './InputModal';

// 즐겨찾기 버튼을 정의하는 SvgButton 컴포넌트입니다.
const SvgButton = ({ rank, isFavorite, onClick, outputIdx }) => {
    // 버튼의 색상을 상태로 관리합니다. 초기 색상은 즐겨찾기 여부에 따라 설정됩니다.
    const [color, setColor] = useState(isFavorite ? '#f7e600' : '#f7e600');

    // 버튼 클릭 시 호출되는 함수입니다.
    const handleClick = (event) => {
        // 기본 이벤트 동작을 막습니다 (예: 폼 제출 방지).
        event.preventDefault();
        // 현재 색상이 노란색이면 회색으로, 회색이면 노란색으로 바꿉니다.
        const newColor = color === '#f7e600' ? '#f7e600' : '#f7e600';
        // 버튼의 색상을 변경합니다.
        setColor(newColor);
        // 부모 컴포넌트로 클릭 이벤트를 전달합니다.
        onClick(rank, newColor, outputIdx);
    };

    return (
        // SVG 버튼을 반환합니다.
        <svg
            onClick={handleClick} // 클릭 이벤트 핸들러를 설정합니다.
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }} // 스타일을 설정합니다.
        >
            {/* 이 부분은 SVG 아이콘의 백그라운드와 트레이서용입니다. */}
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            {/* 이 부분은 실제 SVG 아이콘입니다. */}
            <g id="SVGRepo_iconCarrier">
                <path
                    fill={color} // SVG 아이콘의 채우기 색상을 설정합니다.
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

// 즐겨찾기 항목을 관리하고 표시하는 Bookmark 컴포넌트입니다.
const Bookmark = ({ moll }) => {
    // 현재 페이지 번호를 상태로 관리합니다.
    const [currentPage, setCurrentPage] = useState(1);
    // 모달 창 표시 여부를 상태로 관리합니다.
    const [showModal, setShowModal] = useState(false);
    // 모달에 표시할 데이터를 상태로 관리합니다.
    const [modalData, setModalData] = useState({});
    // 데이터를 가져오는 중인지 상태로 관리합니다.
    const [isFetching, setIsFetching] = useState(false);
    // 로컬에서 사용할 필터된 데이터를 상태로 관리합니다.
    const [localMoll, setLocalMoll] = useState([]);
    // 화면 재렌더링을 트리거하는 상태입니다.
    const [renderTrigger, setRenderTrigger] = useState(0);

    // 페이지당 표시할 항목 수를 정의합니다.
    const itemsPerPage = 10;

    // 컴포넌트가 마운트되거나 moll 또는 renderTrigger가 변경될 때 데이터 필터링 함수를 호출합니다.
    useEffect(() => {
        fetchMollData();
    }, [moll, renderTrigger]);

    // moll 데이터를 필터링하여 즐겨찾기 항목만 남깁니다.
    const fetchMollData = () => {
        console.log('전체데이터 북마크페이지:', moll);
        // 즐겨찾기(myPage === 'Y') 항목만 필터링합니다.
        const filteredMoll = moll.filter(item => item.myPage === 'Y');
        // 필터된 데이터를 상태에 설정합니다.
        setLocalMoll(filteredMoll);
        console.log('필터데이터', filteredMoll);
    };

    // 상세보기 버튼 클릭 시 모달을 열고 데이터를 설정합니다.
    const handleDetailClick = (item) => {
        setModalData(item);
        setShowModal(true);
    };

    // 이전 페이지 버튼 클릭 시 현재 페이지를 감소시킵니다.
    const handlePrevClick = (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지 버튼 클릭 시 현재 페이지를 증가시킵니다.
    const handleNextClick = (event) => {
        event.preventDefault();
        if (currentPage < Math.ceil(localMoll.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // 페이지 번호 클릭 시 해당 페이지로 이동합니다.
    const handlePageClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    // 페이지 번호를 렌더링하는 함수입니다.
    const renderPageNumbers = () => {
        const pageNumbers = [];
        // 전체 항목 수에 따라 페이지 번호를 계산합니다.
        for (let i = 1; i <= Math.ceil(localMoll.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        // 각 페이지 번호를 렌더링합니다.
        return pageNumbers.map((number) => (
            <li key={number} className={number === currentPage ? 'active' : ''}>
                <a href="#" id={number} onClick={(event) => handlePageClick(event, number)}>
                    {number}
                </a>
            </li>
        ));
    };

    // 현재 페이지의 마지막 항목 인덱스를 계산합니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    // 현재 페이지의 첫 번째 항목 인덱스를 계산합니다.
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // 현재 페이지에 표시할 항목을 자릅니다.
    const currentItems = localMoll.slice(indexOfFirstItem, indexOfLastItem);

    // 서버로 POST 요청을 보내는 함수입니다.
    const postData = async (url, data) => {
        try {
            // 데이터 전송 중 상태를 true로 설정합니다.
            setIsFetching(true);
            // 서버로 POST 요청을 보냅니다.
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // 요청이 성공했는지 확인합니다.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 서버 응답을 JSON으로 변환합니다.
            const result = await response.json();
            console.log('서버 응답:', result);
            // 데이터 전송 후 화면을 재렌더링합니다.
            setRenderTrigger(prev => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            // 데이터 전송 중 상태를 false로 설정합니다.
            setIsFetching(false);
        }
    };

    // 즐겨찾기 버튼 클릭 시 호출되는 함수입니다.
    const handleBookmarkClick = (rank, newColor, outputIdxValue) => {
        if (outputIdxValue !== undefined) {
            // 변경된 즐겨찾기 상태를 서버로 보낼 데이터 객체입니다.
            const updatedData = { outputIdx: outputIdxValue, work: 'ChangeMypage' };
            console.log('북마크된 데이터:', updatedData);

            // 서버로 POST 요청을 보내고 데이터 전송 후 화면을 재렌더링합니다.
            postData('http://localhost:8080/NomAlearn/sendListResult', updatedData).then(() => {
                // 로컬 상태에서 항목을 제거합니다.
                setLocalMoll(prev => prev.filter(item => item.outputIdx !== outputIdxValue));
            });
        } else {
            console.warn('outputIdx 값이 정의되어 있지 않습니다. 데이터 전송을 건너뜁니다.');
        }
    };

    return (
        <div className="bookmark-wrap">
            <div className="bookmark-area">
                {/* 데이터 가져오는 중 상태를 표시합니다. */}
               
                <table className="bookmark-group">
                    <thead>
                        <tr className="spaced-title">
                            <th className="rank-column">즐겨찾기</th>
                            <th>인장강도</th>
                            <th>항복강도</th>
                            <th>경도</th>
                            <th>연신율</th>
                            <th>공법</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 현재 페이지의 항목을 테이블로 렌더링합니다. */}
                        {currentItems.map((item) => (
                            <tr key={item.rank}>
                                <td>
                                    <SvgButton
                                        rank={item.rank} // 항목의 순위
                                        isFavorite={item.favorite === 'Y'} // 즐겨찾기 여부
                                        onClick={handleBookmarkClick} // 즐겨찾기 클릭 핸들러
                                        outputIdx={item.outputIdx} // 항목의 고유 인덱스
                                    />
                                </td>
                                <td>{item.tensileStrengthResult}</td>
                                <td>{item.yieldStrengthResult}</td>
                                <td>{item.hardnessResult}</td>
                                <td>{item.elongationResult}</td>
                                <td>{item.composition}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleDetailClick(item)}>
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
                            <a href="#" onClick={handlePrevClick}>
                                &laquo; Prev
                            </a>
                        </li>
                        {renderPageNumbers()}
                        <li className={currentPage === Math.ceil(localMoll.length / itemsPerPage) ? 'disabled' : ''}>
                            <a href="#" onClick={handleNextClick}>
                                Next &raquo;
                            </a>
                        </li>
                    </ul>
                </div>
                {isFetching ? <p>데이터를 가져오는 중...</p> : null}
            </div>
            <InputModal
                show={showModal} // 모달 표시 여부
                onClose={() => setShowModal(false)} // 모달 닫기 핸들러
                data={modalData} // 모달에 표시할 데이터
            />
        </div>
    );
};

export default Bookmark;
