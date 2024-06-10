import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Chart.js에서 필요한 요소들을 등록합니다.
ChartJS.register(
  ArcElement,  // 도넛 차트를 구성하는 아크 요소
  Tooltip,     // 차트의 툴팁(마우스 오버 시 정보 표시) 요소
  Legend,      // 차트의 범례 요소
  Title        // 차트의 제목 요소
);

// 도넛 차트 가운데 텍스트를 표시하는 플러그인 정의
const centerTextPlugin = {
  id: 'centerTextPlugin', // 플러그인 ID
  beforeDraw: function(chart) {
    const ctx = chart.ctx; // 차트의 2D 렌더링 컨텍스트
    const width = chart.width;
    const height = chart.height;
    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2; // 차트의 중앙 X 좌표
    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2; // 차트의 중앙 Y 좌표

    ctx.save(); // 기존의 캔버스 상태를 저장
    ctx.font = '20px Arial'; // 텍스트 폰트 설정
    ctx.textBaseline = 'middle'; // 텍스트의 수직 정렬 기준
    ctx.textAlign = 'center'; // 텍스트의 수평 정렬 기준
    ctx.fillStyle = 'black'; // 텍스트 색상 설정
    const text = chart.config.data.datasets[0].alValue || '준범팀'; // 중앙에 표시할 텍스트 (alValue가 없으면 '준범팀')
    ctx.fillText(text, centerX, centerY); // 중앙에 텍스트 그리기
    ctx.restore(); // 이전에 저장한 캔버스 상태로 복원
  }
};

// 도넛 차트 컴포넌트 정의
const DoughnutChart = ({ data }) => {
  // chartData 상태 설정: 차트에 표시할 데이터를 관리
  const [chartData, setChartData] = useState({
    labels: [], // 데이터 라벨 (차트의 각 부분에 해당)
    datasets: [
      {
        label: '# of Votes', // 데이터셋의 레이블
        data: [], // 데이터셋의 데이터 값
        backgroundColor: [], // 데이터셋의 배경색
        borderColor: [], // 데이터셋의 테두리 색
        borderWidth: 1, // 데이터셋의 테두리 두께
        alValue: '', // 도넛 차트 중앙에 표시할 텍스트
      },
    ],
  });

  // 체크박스 상태 관리: 체크박스가 체크되었는지 여부를 관리
  const [isChecked, setIsChecked] = useState(false);

  // 데이터 전송 함수 정의
  const postData = async (url, data) => {
    console.log('전송할 데이터:', data); // 전송할 데이터를 콘솔에 출력
    try {
      const response = await fetch(url, {
        method: 'POST', // HTTP POST 메서드를 사용
        headers: {
          'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
        },
        body: JSON.stringify(data) // 데이터를 JSON 문자열로 변환하여 전송
      });
      if (!response.ok) {
        throw new Error(`Failed to submit data to ${url}`); // 전송 실패 시 에러 발생
      }
      console.log(`Data submitted successfully to ${url}`); // 전송 성공 메시지 출력
    } catch (error) {
      console.error(`Error submitting data to ${url}:`, error); // 전송 실패 시 에러 메시지 출력
    }
  };

  // 북마크 상태 변경 및 데이터 전송 함수
  const chartbookmark = () => {
    const newCheckedState = !isChecked; // 체크박스 상태를 반전
    setIsChecked(newCheckedState); // 상태 업데이트
  
    if (newCheckedState) {
      const outputIdxValue = data.outputIdx; // data 객체에서 outputIdx 값을 가져옴
  
      if (outputIdxValue !== undefined) {
        // outputIdx가 정의되어 있으면 서버로 데이터 전송
        const updatedData = { outputIdx: outputIdxValue, work: 'ChangeMypage' };
        console.log('북마크된 데이터:', updatedData); // 업데이트된 데이터를 콘솔에 출력
  
        // 서버로 데이터 전송
        postData('http://localhost:8080/NomAlearn/sendListResult', updatedData);
      } else {
        console.warn('outputIdx 값이 정의되어 있지 않습니다. 데이터 전송을 건너뜁니다.');
      }
    }
  };

  // 데이터가 변경될 때마다 콘솔에 출력하고 차트 데이터를 업데이트
  useEffect(() => {
    console.log('DoughnutChart.jsx에서 받은 data:', data);

    if (data?.learnin === 'Y') {
      setIsChecked(true); // data.learnin이 'Y'이면 체크박스를 체크 상태로 설정
    } else {
      setIsChecked(false); // 그렇지 않으면 체크박스를 체크 해제 상태로 설정
    }

    if (data) {
      const keys = ['si', 'cu', 'sc', 'fe', 'mn', 'mg', 'zr', 'sm', 'zn', 'ti', 'sr', 'ni', 'ce']; // 변경 가능한 데이터 키 목록
      const alValue = data['al']; // 'al' 값을 추출
      console.log('alValue:', alValue); // 'al' 값을 콘솔에 출력

      const labels = [];
      const datasetData = [];

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (data[key] !== null && data[key] !== 0) { // 값이 null이 아니고 0이 아닐 때
          labels.push(key); // 라벨 목록에 추가
          datasetData.push(data[key]); // 데이터 목록에 추가
        }
      }

      setChartData({
        labels, // 데이터 라벨 설정
        datasets: [
          {
            label: labels, // 데이터셋의 레이블 설정
            data: datasetData, // 데이터셋의 데이터 값 설정
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 배경색 설정
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // 테두리 색 설정
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1, // 테두리 두께 설정
            alValue, // 차트 중앙에 표시할 텍스트
          },
        ],
      });
    }
  }, [data]); // data가 변경될 때마다 이 effect가 실행됨

  // 객체의 정보를 표시하는 JSX
  const renderObjectInfo = () => {
    if (!data) {
      return <div className="data-info">No data available</div>; // 데이터가 없을 경우 메시지 표시
    }

    const keysToShow = [
      { key: 'elongationResult', name: '연신율' },
      { key: 'hardnessResult', name: '경도' },
      { key: 'tensileStrengthResult', name: '인장강도' },
      { key: 'yieldStrengthResult', name: '항복강도' },
      { key: 'firstTemperature', name: '1차 용체화온도' },
      { key: 'firstTime', name: '1차 용체화 시간' },
      { key: 'secondTemperature', name: '2차 용체화온도' },
      { key: 'secondTime', name: '2차 용체화 시간' },
      { key: 'agingTemperature', name: '시효온도' },
      { key: 'agingTime', name: '시효시간' }
    ];

    const infoItems = keysToShow.map(({ key, name }, index) => (
      <div key={index}>
        {name}: {data[key] !== undefined ? data[key] : '데이터 없음'}
      </div>
    ));

    return <div className="data-info">{infoItems}</div>; // 정보를 화면에 출력
  };

  return (
    <div className="chart-area">
      <div className="chart-result">
        <Doughnut data={chartData} plugins={[centerTextPlugin]} /> {/* 도넛 차트 렌더링 */}
      </div>
      <div className="chart-result">
        {renderObjectInfo()} {/* 객체의 정보 렌더링 */}
      </div>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isChecked} // 체크 상태에 따라 체크박스 표시
            onChange={chartbookmark} // 체크박스 상태 변경 시 호출
          />
          북마크
        </label>
      </div>
    </div>
  );
};

export default DoughnutChart;
