import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input2.css';
import '../fonts.css'; // Import the new CSS file with the font-face rule
import InputModal from './InputModal'; // InputModal 컴포넌트를 import

const SvgButton = ({ rank, isFavorite, onClick }) => {
  const [color, setColor] = useState(isFavorite ? '#f7e600' : '#4E5968');

  const handleClick = (event) => {
    event.preventDefault();
    const newColor = color === '#f7e600' ? '#4E5968' : '#f7e600';
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

const Bookmark = ({ moll }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [showModal, setShowModal] = useState(false); // 모달 창의 표시 여부 상태
  const [modalData, setModalData] = useState({}); // 모달 창에 표시할 데이터
  const [isFetching, setIsFetching] = useState(false); // 데이터 가져오는 상태 표시
  const [localMoll, setLocalMoll] = useState(moll); // 가져온 moll을 저장할 상태

  const itemsPerPage = 10; // 한 페이지당 아이템 수

  useEffect(() => {
    console.log('전체데이터 북마크페이지:', moll); // moll을 콘솔에 출력
    setLocalMoll(moll); // 가져온 moll을 상태에 저장
  }, [moll]);



  const handleDetailClick = (item) => {
    setModalData(item); // 모달 창에 표시할 데이터를 설정
    setShowModal(true); // 모달 창을 표시
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
              <th>조성</th>
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
                    onClick={() => console.log(`즐겨찾기 클릭: ${item.rank}`)}
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
        show={showModal} // 모달 창의 표시 여부
        onClose={() => setShowModal(false)} // 모달 창 닫기 함수
        data={modalData} // 모달 창에 표시할 데이터
      />
    </div>
  );
};

export default Bookmark;
