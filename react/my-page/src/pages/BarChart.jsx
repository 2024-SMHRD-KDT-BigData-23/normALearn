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
  const [selectedKey, setSelectedKey] = useState(''); // 현재 선택된 키
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Values',
        data: [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const keys = ['tensileStrengthResult', 'yieldStrengthResult', 'hardnessResult', 'elongationResult'];
  const keyLabels = {
    tensileStrengthResult: 'Tensile Strength',
    yieldStrengthResult: 'Yield Strength',
    hardnessResult: 'Hardness',
    elongationResult: 'Elongation',
  };

  useEffect(() => {
    console.log('BarChart received data:', data);

    if (data) {
      const selectedData = keys.map(key => (key === selectedKey ? data[key] || 0 : 0));

      setChartData({
        labels: keys.map(key => keyLabels[key]),
        datasets: [
          {
            label: 'Values',
            data: selectedData,
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data, selectedKey]);

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
      },
      title: {
        display: true,
        text: 'Mechanical Properties', // 차트 제목
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Properties', // X축 제목
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values', // Y축 제목
        },
        beginAtZero: true, // Y축 0부터 시작
        ticks: {
          stepSize: 10, // y축 단위를 10단위로 설정
        },
      },
    },
  };

  return (
    <div className="chart-area">
      <div className="chart-result">
        <Bar data={chartData} options={options} />
      </div>
      <div className="chart-result">
        <button onClick={() => handleButtonClick('tensileStrengthResult')}>인장강도</button>
        <button onClick={() => handleButtonClick('yieldStrengthResult')}>항복강도</button>
        <button onClick={() => handleButtonClick('hardnessResult')}>경도</button>
        <button onClick={() => handleButtonClick('elongationResult')}>연신율</button>
      </div>
    </div>
  );
};

export default BarChart;
