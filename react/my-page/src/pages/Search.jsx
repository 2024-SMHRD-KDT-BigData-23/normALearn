import React, { useState, useEffect } from 'react';
import './Search.css';
import '../fonts.css';
import SearchInfo from './SearchInfo';
import Chart from './Chart';
import Table from './Table';
import SearchSub from './searchsub';

function Search() {
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 아이템이 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('table에서 가져온 코드(search:', selectedItem);
  }, [selectedItem]); // selectedItem이 변경될 때만 실행

  // SearchSub에서 전달받은 결과를 처리하는 함수
  const handleResults = (results) => {
    console.log('검색 결과:', results);
    // 필요한 경우 selectedItem 상태 업데이트
    setSelectedItem(results);
  };

  return (
    <div className="Search">
      <div className="checkbox-table">
        <h1>검색 페이지</h1>
        {/* SearchSub 컴포넌트를 추가하고 onResults 콜백을 전달 */}
        <SearchSub onResults={handleResults} />
      </div>
      <SearchInfo />
      <Chart vsData={selectedItem} />
      <Table setSelectedItem={setSelectedItem} />
    </div>
  );
}

export default Search;
