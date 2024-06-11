// InputModal.jsx
import React, { useEffect, useState } from 'react';
import './InputModal.css'; // 스타일을 추가할 경우 사용
import './Chart.css';
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

const InputModal = ({ show, onClose, data }) => {
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

  // 데이터가 변경될 때마다 콘솔에 출력하고 차트 데이터를 업데이트
  useEffect(() => {
    console.log('InputModal로 전달된 데이터:', data);

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

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>상세 정보</h2>
        <div className="chart-container">
          <Doughnut data={chartData} plugins={[centerTextPlugin]} /> {/* 도넛 차트 렌더링 */}
        </div>
        <button className="btn btn-secondary" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default InputModal;
