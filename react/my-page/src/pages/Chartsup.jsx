import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1. Chart.js에서 필요한 요소들을 등록합니다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // 2. chartData라는 상태를 정의하고 초기값을 설정합니다.
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  // 3. 차트 데이터를 불러오는 비동기 함수
  const fetchChartData = async () => {
    try {
      // 4. API를 호출하여 데이터를 가져옵니다.
      const response = await fetch('http://localhost:8080/NomAlearn/getListOutput');
      const result = await response.json();
      console.log('Fetched Data:', result); // 불러온 데이터를 콘솔에 출력

      // 5. result가 'label'과 'value' 속성을 가진 객체의 배열이라고 가정
      const labels = result.map(item => item.label);
      const data = result.map(item => item.value);

      // 6. 불러온 데이터를 바탕으로 chartData 상태를 업데이트합니다.
      setChartData({
        labels,
        datasets: [
          {
            label: '# of Votes',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      // 7. 데이터를 불러오는 도중 에러가 발생하면 콘솔에 에러를 출력합니다.
      console.log('Error fetching data:', error);
    }
  };

  // 8. 컴포넌트가 마운트될 때 fetchChartData 함수가 실행되도록 useEffect 훅을 사용합니다.
  useEffect(() => {
    fetchChartData();
  }, []);

  // 9. 차트의 옵션을 정의합니다.
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 10. Bar 컴포넌트를 사용하여 데이터를 시각화합니다.
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
