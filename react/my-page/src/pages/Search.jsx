import React, { useState, useEffect } from 'react';
import './Search.css';
import '../fonts.css';
import SearchInfo from './SearchInfo';
import Chart from './Chart';
import Table from './Table';

function Search() {
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 아이템이 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('table에서 가져온 코드(search:', selectedItem);
  }, [selectedItem]); // selectedItem이 변경될 때만 실행

  return (
    <div className="Search">
      <div className="checkbox-table">
        <h1>검색 페이지</h1>
        <div className="input-text-group">
          <input className="form-field" type="text" placeholder="인장 강도" />
          <input className="form-field" type="text" placeholder="항복 강도" />
          <input className="form-field" type="text" placeholder="경도" />
          <input className="form-field" type="text" placeholder="연신율" />
          <button className="input-button">입력</button>
        </div>
      </div>
      <SearchInfo />
      <Chart vsData={selectedItem} />
      <Table setSelectedItem={setSelectedItem} />
    </div>
  );
}

export default Search;
