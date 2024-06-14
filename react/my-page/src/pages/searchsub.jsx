import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

const SearchSub = ({ onResults, setStart, setInfoData }) => {
  const [cookies] = useCookies(['userId']);
  const [tensileStrength, setTensileStrength] = useState(''); // 인장 강도 상태
  const [yieldStrength, setYieldStrength] = useState(''); // 항복 강도 상태
  const [hardness, setHardness] = useState(''); // 경도 상태
  const [elongation, setElongation] = useState(''); // 연신율 상태

  const handleSearch = useCallback(async () => {
    const userId = cookies.userId; // 쿠키에서 userId 읽어오기
    const searchData = {
      tensileStrength,
      yieldStrength,
      hardness,
      elongation,
      userId
    };
    console.log('전송할 데이터:', JSON.stringify(searchData, null, 2));
    try {
      // 첫 번째 요청
      await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
      });

      // 두 번째 요청
      const response = await fetch('http://localhost:8080/NomAlearn/sendSearchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
      });

      const results = await response.json();
      console.log('서버 응답:', JSON.stringify(results, null, 2));

      if (results) {
        // 0번 인덱스 객체에 new: 'kw' 키값 추가
        results[0] = { ...results[0], new: 'kw' };
        setStart(results);
        onResults(results);
        setInfoData({
          tensileStrength,
          yieldStrength,
          hardness,
          elongation
        });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [cookies.userId, tensileStrength, yieldStrength, hardness, elongation, setStart, onResults, setInfoData]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSearch]);

  return (
    <div className="input-text-group">
      <input
        className="form-field"
        name='tensileStrength'
        type="text"
        placeholder="인장 강도"
        value={tensileStrength}
        onChange={(e) => setTensileStrength(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        name='yieldStrength'
        placeholder="항복 강도"
        value={yieldStrength}
        onChange={(e) => setYieldStrength(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        name='hardness'
        placeholder="경도"
        value={hardness}
        onChange={(e) => setHardness(e.target.value)}
      />
      <input
        className="form-field"
        type="text"
        name='elongation'
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
