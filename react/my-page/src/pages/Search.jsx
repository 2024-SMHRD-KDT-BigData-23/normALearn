import React, { useState } from 'react';
import './Search.css'; // Importing the CSS file
import '../fonts.css'; // Import the new CSS file with the font-face rule
import SearchInfo from './SearchInfo';
import Chart from './Chart';
import Table from './Table';
import DoughnutChart from './Chartsup';

function Search() {
  // 선택된 항목의 데이터를 상태로 관리
  const [selectedItem, setSelectedItem] = useState(null);

  // 선택된 아이템이 변경될 때마다 콘솔에 출력
  console.log('table에서 가져온 코드(search:', selectedItem);

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
      <Chart vsData={selectedItem} /> {/* 선택된 데이터를 Chart에 전달 */}
      <Table setSelectedItem={setSelectedItem} /> {/* setSelectedItem 함수 전달 */}
      
    </div>
  );
}

export default Search;
