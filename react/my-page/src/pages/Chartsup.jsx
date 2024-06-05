import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

<<<<<<< HEAD
// Register the required elements for Chart.js
=======
// Chart.js에서 필요한 요소들을 등록합니다. (3)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

<<<<<<< HEAD
// 플러그인 정의
=======
// 도넛 차트 가운데 텍스트를 표시하는 플러그인 정의 (4)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: function(chart) {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

<<<<<<< HEAD
    // 도넛 차트의 가운데 구멍 크기 계산
    const innerRadius = Math.min(width, height) / 4; // 대략적인 innerRadius 계산

    // 가운데 원 색칠
    ctx.save();
    ctx.fillStyle = 'white'; // 원하는 색상으로 변경
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

=======
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
    // 가운데 텍스트
    ctx.save();
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
<<<<<<< HEAD
    const text = '중앙 텍스트';
=======
    const text = chart.config.data.datasets[0].alValue || 'N/A'; // 중앙에 표시할 텍스트
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  }
};

const DoughnutChart = () => {
<<<<<<< HEAD
=======
  // chartData와 currentIndex, alValue라는 상태를 정의하고 초기값을 설정합니다. (5)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
<<<<<<< HEAD
        label: '하이',
=======
        label: '# of Votes', // 차트에 표시될 데이터의 라벨 (변경 가능)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
        data: [],
        backgroundColor: [], // 데이터 항목의 배경색 (변경 가능)
        borderColor: [], // 데이터 항목의 테두리 색 (변경 가능)
        borderWidth: 1, // 테두리 두께 (변경 가능)
        alValue: '', // 중앙 텍스트로 표시할 'al' 값
      },
    ],
  });

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스를 관리하는 상태 (6)

  // 차트 데이터를 불러오는 비동기 함수 (1)
  const fetchChartData = async (pienum) => {
    try {
      // API를 호출하여 데이터를 가져옵니다. (2)
      const response = await fetch('http://localhost:8080/NomAlearn/getListOutput');
      const result = await response.json();
      console.log('Fetched Data:', result); // 불러온 데이터를 콘솔에 출력

<<<<<<< HEAD
      const labels = result.map(item => item.outputIdx);
      const data = result.map(item => item.al);
=======
      // 특정 인덱스의 객체의 특정 속성만을 사용합니다. (7)
      const firstItem = result[pienum];
      const keys = ['si', 'cu', 'sc', 'fe', 'mn', 'mg', 'zr', 'sm', 'zn', 'ti', 'sr', 'ni', 'ce']; // 시각화할 특정 속성 (변경 가능)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4

      // 'al' 값을 상태에 저장합니다. (8)
      const alValue = firstItem['al']; // 'al' 값 추출
      console.log('alValue:', alValue); // 'al' 값 확인

      const labels = [];
      const data = [];

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (firstItem[key] !== null && firstItem[key] !== 0) {
          labels.push(key);
          data.push(firstItem[key]);
        }
      }

      // 불러온 데이터를 바탕으로 chartData 상태를 업데이트합니다. (9)
      setChartData({
        labels,
        datasets: [
          {
<<<<<<< HEAD
            label: '하이',
=======
            label: labels,
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 각 데이터 항목의 배경색 (변경 가능)
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
              'rgba(255, 99, 132, 1)', // 각 데이터 항목의 테두리 색 (변경 가능)
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
            borderWidth: 1, // 테두리 두께 (변경 가능)
            alValue, // 'al' 값을 dataset에 추가
          },
        ],
      });
    } catch (error) {
      // 데이터를 불러오는 도중 에러가 발생하면 콘솔에 에러를 출력합니다. (10)
      console.log('Error fetching data:', error);
    }
  };

<<<<<<< HEAD
=======
  // 컴포넌트가 마운트될 때 fetchChartData 함수가 실행되도록 useEffect 훅을 사용합니다. (11)
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
  useEffect(() => {
    fetchChartData(currentIndex);
  }, [currentIndex]);

<<<<<<< HEAD
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doughnut Chart with Center Text',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          }
        }
      }
    },
    cutout: '70%', // 도넛 차트의 가운데 구멍 크기
  };

  return <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />;
=======
  // 버튼 클릭 시 호출될 함수 (12)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Doughnut 컴포넌트를 사용하여 데이터를 시각화하고 버튼을 추가합니다. (13)
  return (
    <div>
      <Doughnut data={chartData} plugins={[centerTextPlugin]} /> {/* 중앙 텍스트를 표시하는 플러그인 추가 */}
      <button onClick={handleNext}>Next</button>
    </div>
  );
>>>>>>> 309c47de347d90b78243fd229c2e28da6d683ff4
};

export default DoughnutChart;
