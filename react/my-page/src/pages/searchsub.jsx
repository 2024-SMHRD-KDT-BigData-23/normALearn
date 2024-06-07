import React, { useState } from 'react';

// SearchSub 컴포넌트 정의. 'onResults'라는 콜백 함수를 속성으로 받음.
const SearchSub = ({ onResults }) => {
  // 상태 변수 선언
  const [tensileStrength, setTensileStrength] = useState(''); // 인장 강도 상태
  const [yieldStrength, setYieldStrength] = useState(''); // 항복 강도 상태
  const [hardness, setHardness] = useState(''); // 경도 상태
  const [elongation, setElongation] = useState(''); // 연신율 상태

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async () => {
    // 콘솔에 사용자가 입력한 내용을 출력
    console.log('검색 조건:', {
      tensileStrength,
      yieldStrength,
      hardness,
      elongation,
    });

    try {
      // 서버에 검색 조건을 POST 요청으로 전송
      const response = await fetch('http://localhost:8080/sendSearchData', {
        method: 'POST', // 요청 방법: POST
        headers: {
          'Content-Type': 'application/json', // 요청 헤더: JSON 데이터 전송
        },
        body: JSON.stringify({
          tensileStrength, // 인장 강도 데이터
          yieldStrength, // 항복 강도 데이터
          hardness, // 경도 데이터
          elongation, // 연신율 데이터
        }),
      });

      // 서버로부터 받은 결과를 JSON 형식으로 변환
      const results = await response.json();
      onResults(results); // 부모 컴포넌트로 결과 전달
    } catch (error) {
      // 오류 발생 시 콘솔에 에러 출력
      console.error('Error fetching search results:', error);
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

export default SearchSub; // 컴포넌트를 외부에서 사용할 수 있도록 내보냄.
