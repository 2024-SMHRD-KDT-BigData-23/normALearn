import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input2.css';
import '../fonts.css';
import InputModal from './InputModal';

const SvgButton = ({ rank, isFavorite, onClick, outputIdx }) => {
  const [color, setColor] = useState(isFavorite ? '#4E5968' : '#f7e600');

  const handleClick = (event) => {
    event.preventDefault();
    const newColor = color === '#f7e600' ? '#4E5968' : '#f7e600';
    setColor(newColor);
    onClick(rank, newColor, outputIdx);
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

const Bookmark = ({ moll }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [localMoll, setLocalMoll] = useState([]);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchMollData();
  }, [moll, renderTrigger]);

  const fetchMollData = () => {
    console.log('전체데이터 북마크페이지:', moll);
    const filteredMoll = moll.filter(item => item.myPage === 'Y');
    setLocalMoll(filteredMoll);
    console.log('필터데이터', filteredMoll);
  };

  const handleDetailClick = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (currentPage < Math.ceil(localMoll.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(localMoll.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li key={number} className={number === currentPage ? 'active' : ''}>
        <a href="#" id={number} onClick={(event) => handlePageClick(event, number)}>
          {number}
        </a>
      </li>
    ));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localMoll.slice(indexOfFirstItem, indexOfLastItem);

  const postData = async (url, data) => {
    try {
      setIsFetching(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('서버 응답:', result);
      setRenderTrigger(prev => prev + 1); // 데이터 전송 후 화면 재렌더링
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleBookmarkClick = (rank, newColor, outputIdxValue) => {
    if (outputIdxValue !== undefined) {
      const updatedData = { outputIdx: outputIdxValue, work: 'ChangeMypage' };
      console.log('북마크된 데이터:', updatedData);

      postData('http://localhost:8080/NomAlearn/sendListResult', updatedData).then(() => {
        // 항목 제거
        setLocalMoll(prev => prev.filter(item => item.outputIdx !== outputIdxValue));
      });
    } else {
      console.warn('outputIdx 값이 정의되어 있지 않습니다. 데이터 전송을 건너뜁니다.');
    }
  };

  return (
    <div className="bookmark-wrap">
      <div className="bookmark-area">
        {isFetching ? <p>데이터를 가져오는 중...</p> : null}
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
            {currentItems.map((item) => (
              <tr key={item.rank}>
                <td>
                  <SvgButton
                    rank={item.rank}
                    isFavorite={item.favorite === 'Y'}
                    onClick={handleBookmarkClick}
                    outputIdx={item.outputIdx}
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
      </div>
      <InputModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
      />
    </div>
  );
};

export default Bookmark;
