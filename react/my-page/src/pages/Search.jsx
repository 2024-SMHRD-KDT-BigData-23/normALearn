import React, { useState, useEffect } from 'react';
import './Search.css';
import '../fonts.css';
import SearchInfo from './SearchInfo';
import Chart from './Chart';
import Table from './Table';
import SearchSub from './searchsub'


function Search() {
  const [selectedItem, setSelectedItem] = useState(null); // 테이블에서 상세보기 클릭시 받아온정보
  const [start, setStart] = useState([]); // searchsub에서 가져온 정보

  // 선택된 아이템이 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('table에서보낸 상세보기:', selectedItem);
  }, [selectedItem]); // selectedItem이 변경될 때만 실행

  // start가 변경될 때마다 콘솔에 값을 출력
  useEffect(() => {
    console.log('searchsub에서 search로 가져온정보:', start);
  }, [start]); // start가 변경될 때만 실행

  // SearchSub에서 전달받은 결과를 처리하는 함수
  const handleResults = (results) => {
    console.log('검색 결과:', results);
    // 검색 결과를 start 상태 변수에 저장
    setStart(results);
  };

  return (
    <div className="Search">
      <div className="checkbox-table">
        <h1>검색 페이지</h1>
        {/* SearchSub 컴포넌트를 추가하고 onResults 콜백을 전달 */}
        <SearchSub onResults={handleResults} setStart={setStart} />
      </div>
      <SearchInfo />
      {/* 검색 결과를 전달하여 차트를 렌더링 */}
      <Chart vsData={selectedItem} />
      {/* 검색 결과를 테이블에 전달 */}
      <Table setSelectedItem={setSelectedItem} start={start}/>
    </div>
  );
}

export default Search;
