import React, { useState } from 'react';

// SearchSub 컴포넌트 정의. 'onResults', 'setStart', 'setInfoData' 콜백을 속성으로 받음.
const SearchSub = ({ onResults, setStart, setInfoData }) => {
  // 상태 변수 선언
  const [tensileStrength, setTensileStrength] = useState(''); // 인장 강도 상태
  const [yieldStrength, setYieldStrength] = useState(''); // 항복 강도 상태
  const [hardness, setHardness] = useState(''); // 경도 상태
  const [elongation, setElongation] = useState(''); // 연신율 상태

  // 서버에 요청을 보내는 공통 함수
  const sendRequest = async (url, expectsResponse = true) => {
    // 전송할 데이터 객체 생성
    const searchData = {
      tensileStrength, // 인장 강도 데이터
      yieldStrength, // 항복 강도 데이터
      hardness, // 경도 데이터
      elongation // 연신율 데이터
    };

    // 콘솔에 사용자가 입력한 내용을 JSON 형식으로 출력
    console.log('전송할 데이터:', JSON.stringify(searchData, null, 2));

    try {
      // 서버에 검색 조건을 POST 요청으로 전송
      const response = await fetch(url, {
        method: 'POST', // 요청 방법: POST
        headers: {
          'Content-Type': 'application/json', // 요청 헤더: JSON 데이터 전송
        },
        body: JSON.stringify(searchData), // JSON 형식으로 데이터 전송
      });

      if (expectsResponse) {
        // 서버로부터 받은 결과를 JSON 형식으로 변환
        const results = await response.json();
        // 서버 응답을 콘솔에 출력
        console.log('서버 응답:', JSON.stringify(results, null, 2));
        return results;
      }
    } catch (error) {
      // 오류 발생 시 콘솔에 에러 출력
      console.error('Error fetching search results:', error);
    }
    return null;
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async () => {
    // 첫 번째 요청 (predict)
    await sendRequest('http://127.0.0.1:5001/predict', true);
    // 두 번째 요청 (sendSearchData)
    const results = await sendRequest('http://localhost:8080/NomAlearn/sendSearchData', true);
    
    if (results) {
      // 검색 결과를 부모 컴포넌트에 전달
      setStart(results);
      onResults(results); // onResults를 호출하여 부모 컴포넌트에 결과 전달
      // 처음 검색한 데이터를 설정
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
      {/* 인장 강도 입력 필드 */}
      <input
        className="form-field"
        name='tensileStrength'
        type="text"
        placeholder="인장 강도"
        value={tensileStrength}
        onChange={(e) => setTensileStrength(e.target.value)}
      />
      {/* 항복 강도 입력 필드 */}
      <input
        className="form-field"
        type="text"
        name='yieldStrength'
        placeholder="항복 강도"
        value={yieldStrength}
        onChange={(e) => setYieldStrength(e.target.value)}
      />
      {/* 경도 입력 필드 */}
      <input
        className="form-field"
        type="text"
        name='hardness'
        placeholder="경도"
        value={hardness}
        onChange={(e) => setHardness(e.target.value)}
      />
      {/* 연신율 입력 필드 */}
      <input
        className="form-field"
        type="text"
        name='elongation'
        placeholder="연신율"
        value={elongation}
        onChange={(e) => setElongation(e.target.value)}
      />
    
      {/* 입력 버튼 */}
      <button className="input-button" onClick={handleSearch}>
        입력
      </button>
    </div>
  );
};

export default SearchSub;