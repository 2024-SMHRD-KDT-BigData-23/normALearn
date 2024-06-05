import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the required elements for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

// 플러그인 정의
const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: function(chart) {
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;
    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

    // 도넛 차트의 가운데 구멍 크기 계산
    const innerRadius = Math.min(width, height) / 4; // 대략적인 innerRadius 계산

    // 가운데 원 색칠
    ctx.save();
    ctx.fillStyle = 'white'; // 원하는 색상으로 변경
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // 가운데 텍스트
    ctx.save();
    ctx.font = '20px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    const text = '중앙 텍스트';
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  }
};

const DoughnutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '하이',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const fetchChartData = async () => {
    try {
      const response = await fetch('http://localhost:8080/NomAlearn/getListOutput');
      const result = await response.json();
      console.log('Fetched Data:', result); // Log the fetched data to the console

      const labels = result.map(item => item.outputIdx);
      const data = result.map(item => item.al);

      setChartData({
        labels,
        datasets: [
          {
            label: '하이',
            data: data,
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
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

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
};

export default DoughnutChart;
