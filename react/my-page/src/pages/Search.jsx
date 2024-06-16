import React, { useState, useEffect } from 'react';
import './Search.css';
import '../fonts.css';
import SearchInfo from './SearchInfo';
import Chart from './Chart';
import Table from './Table';
import SearchSub from './searchsub';

function Search({ 
  onStartChange, 
  selectedItem, 
  setSelectedItem, 
  start, 
  setStart, 
  results, 
  setResults 
}) {
  const [infoData, setInfoData] = useState(null);

  useEffect(() => {
    console.log('table에서 가져온 코드(search):', selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    console.log('searchsub에서 search로 가져온 정보:', start);
    onStartChange(start);
  }, [start, onStartChange]);

  useEffect(() => {
    console.log('처음 검색한 데이터:', infoData);
  }, [infoData]);

  const handleResults = (results) => {
    console.log('검색 결과:', results);
    setStart(results);
    setSelectedItem(results[0]);
  };

  return (
    <div className="Search">
      <div className="checkbox-table">
        <h1>검색 페이지</h1>
        <SearchSub 
          onResults={handleResults} 
          setStart={setStart} 
          setInfoData={setInfoData} 
        />
      </div>
      <SearchInfo infoData={infoData} />
      <Chart vsData={selectedItem} />
      <Table setSelectedItem={setSelectedItem} start={start} selectedItem={selectedItem} />
    </div>
  );
}

export default Search;
