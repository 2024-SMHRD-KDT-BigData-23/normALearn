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
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// 도넛 차트 가운데 텍스트를 표시하는 플러그인 정의
const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: function(chart) {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

    ctx.save();
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    const text = chart.config.data.datasets[0].alValue || 'N/A'; // 중앙에 표시할 텍스트
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  }
};

const DoughnutChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        alValue: '',
      },
    ],
  });

  // 데이터가 변경될 때마다 콘솔에 출력하고 차트 데이터를 업데이트
  useEffect(() => {
    console.log('DoughnutChart.jsx에서 받은 data:', data);

    if (data) {
      const keys = ['si', 'cu', 'sc', 'fe', 'mn', 'mg', 'zr', 'sm', 'zn', 'ti', 'sr', 'ni', 'ce']; // 변경 가능
      const alValue = data['al']; // 'al' 값 추출
      console.log('alValue:', alValue); // 'al' 값 확인

      const labels = [];
      const datasetData = [];

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (data[key] !== null && data[key] !== 0) {
          labels.push(key);
          datasetData.push(data[key]);
        }
      }

      setChartData({
        labels,
        datasets: [
          {
            label: labels,
            data: datasetData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // 각 데이터 항목의 배경색
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
              'rgba(255, 99, 132, 1)', // 각 데이터 항목의 테두리 색
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
            borderWidth: 1,
            alValue,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <Doughnut data={chartData} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default DoughnutChart;