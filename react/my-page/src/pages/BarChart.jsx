import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 필요한 차트 구성 요소 등록
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const BarChart = ({ data }) => {
  const [mollData, setMollData] = useState([]); // 누적된 데이터를 저장할 공간
  const [selectedKey, setSelectedKey] = useState(''); // 현재 선택된 키
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const keys = ['tensileStrengthResult', 'yieldStrengthResult', 'hardnessResult', 'elongationResult'];
  const keyLabels = {
    tensileStrengthResult: '인장강도',
    yieldStrengthResult: '항복강도',
    hardnessResult: '경도',
    elongationResult: '연신율',
  };

  const colors = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
  ];

  const borderColors = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
  ];

  useEffect(() => {
    if (data) {
      setMollData((prevData) => {
        const newData = [...prevData, data];
        if (newData.length > 5) {
          newData.shift(); // 첫 번째 데이터를 제거하여 최대 5개로 유지
        }
        console.log('바차트 데이터 누적:', newData); // 누적된 데이터를 콘솔에 출력
        return newData;
      });
    }
  }, [data]);

  useEffect(() => {
    if (selectedKey) {
      const labels = mollData.map((_, index) => `Data ${index + 1}`);
      const dataset = {
        label: keyLabels[selectedKey],
        data: mollData.map(entry => entry[selectedKey] || 0),
        backgroundColor: mollData.map((_, index) => colors[index % colors.length]),
        borderColor: mollData.map((_, index) => borderColors[index % borderColors.length]),
        borderWidth: 1,
      };

      setChartData({
        labels,
        datasets: [dataset],
      });
    }
  }, [mollData, selectedKey]);

  useEffect(() => {
    // 데이터의 길이가 0에서 2 사이일 때 인장강도 버튼 클릭
    if (mollData.length >= 0 && mollData.length <= 2) {
      const tensileStrengthButton = document.querySelector('.btn-tensileStrengthResult');
      if (tensileStrengthButton) {
        tensileStrengthButton.click(); // 인장강도 버튼 클릭
      }
    }
  }, [mollData]); // mollData가 변경될 때마다 이 useEffect가 실행됩니다.

  const handleButtonClick = (key) => {
    setSelectedKey(key);
  };

  // 차트 옵션 설정
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // 범례 위치
        labels: {
          boxWidth: 0, // 범례의 색상 박스 너비를 0으로 설정
          font: {
            size: 15, // 폰트 크기
            weight: 'bold', // 폰트 굵기
          },
        },
      },
      title: {
        display: true,
        text: '비교차트', // 차트 제목
        font: {
          size: 20, // 폰트 크기
          weight: 'bold', // 폰트 굵기
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '데이터 비교', // X축 제목
          font: {
            size: 15, // 폰트 크기
            weight: 'bold', // 폰트 굵기
          },
        },
        ticks: {
          font: {
            size: 15, // 폰트 크기
            weight: 'bold', // 폰트 굵기
          },
        },
      },
      y: {
        title: {
          display: true,
          text: '값', // Y축 제목 추가
          font: {
            size: 15, // 폰트 크기
            weight: 'bold', // 폰트 굵기
          },
        },
        beginAtZero: true, // Y축 0부터 시작
        ticks: {
          stepSize: 10, // y축 단위를 10단위로 설정
          font: {
            size: 15, // 폰트 크기
            weight: 'bold', // 폰트 굵기
          },
        },
      },
    },
  };

  return (
    <div className="chart-area">
      <div className="chart-result">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="canvas">
        <button className="btn-tensileStrengthResult" onClick={() => handleButtonClick('tensileStrengthResult')}>
          인장강도
        </button>
        <button onClick={() => handleButtonClick('yieldStrengthResult')}>항복강도</button>
        <button onClick={() => handleButtonClick('hardnessResult')}>경도</button>
        <button onClick={() => handleButtonClick('elongationResult')}>연신율</button>
      </div>
    </div>
  );
};

export default BarChart;
