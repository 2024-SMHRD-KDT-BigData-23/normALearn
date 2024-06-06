import React, { useState } from 'react';

const SearchSub = ({ onResults }) => {
  const [tensileStrength, setTensileStrength] = useState('');
  const [yieldStrength, setYieldStrength] = useState('');
  const [hardness, setHardness] = useState('');
  const [elongation, setElongation] = useState('');

  const handleSearch = async () => {
    // 사용자가 입력한 내용을 콘솔에 출력합니다.
    console.log('검색 조건:', {
      tensileStrength,
      yieldStrength,
      hardness,
      elongation,
    });

    try {
      const response = await fetch('http://localhost:8080/sendSearchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tensileStrength,
          yieldStrength,
          hardness,
          elongation,
        }),
      });

      const results = await response.json();
      onResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="input-text-group">
      <input
        className="form-field"
        type="text"
        placeholder="인장 강도"
        value={tensileStrength}
        onChange={(e) => setTensileStrength(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        placeholder="항복 강도"
        value={yieldStrength}
        onChange={(e) => setYieldStrength(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        placeholder="경도"
        value={hardness}
        onChange={(e) => setHardness(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        placeholder="연신율"
        value={elongation}
        onChange={(e) => setElongation(e.target.value)}
      />
      <button className="input-button" onClick={handleSearch}>
        입력
      </button>
    </div>
  );
};

export default SearchSub;
