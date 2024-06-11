import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const SearchSub = ({ onResults, setStart, setInfoData }) => {
  const [cookies, setCookie] = useCookies(['userId']);
  const [tensileStrength, setTensileStrength] = useState(''); // 인장 강도 상태
  const [yieldStrength, setYieldStrength] = useState(''); // 항복 강도 상태
  const [hardness, setHardness] = useState(''); // 경도 상태
  const [elongation, setElongation] = useState(''); // 연신율 상태

  useEffect(() => {
    // 쿠키에서 userId 확인
    const userId = cookies.userId;
    console.log('쿠키에 있는 userId 확인:', userId);

    if (!userId) {
      console.error('쿠키에 userId가 없습니다.');
      // navigate('/login'); // 로그인 페이지로 이동하는 코드를 추가하세요.
    }
  }, [cookies]);

  const sendRequest = async (url, expectsResponse = true) => {
    const userId = cookies.userId; // 쿠키에서 userId 읽어오기

    if (!userId) {
      console.error('쿠키에 userId가 없습니다.');
      return;
    }

    const searchData = {
      tensileStrength,
      yieldStrength,
      hardness,
      elongation,
      userId
    };

    console.log('전송할 데이터:', JSON.stringify(searchData, null, 2));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if (expectsResponse) {
        const results = await response.json();
        console.log('서버 응답:', JSON.stringify(results, null, 2));
        return results;
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    return null;
  };

  const handleSearch = async () => {
    await sendRequest('http://127.0.0.1:5001/predict', true);
    const results = await sendRequest('http://localhost:8080/NomAlearn/sendSearchData', true);
    
    if (results) {
      setStart(results);
      onResults(results);
      setInfoData({
        tensileStrength,
        yieldStrength,
        hardness,
        elongation
      });
    }
  };

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